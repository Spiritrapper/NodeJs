const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth'); 
const { User } = require("./models/User");

//application/x-www-form-urlencoded //이렇게 생긴 데이터 분석
app.use(bodyParser.urlencoded({extended: true})); //클라이언트에오는 정보를 가져오는
//
//application/json  // 분석해서 가져오기 req.body에 데이터를 넣기 가능토록 해준다
app.use(bodyParser.json());
app.use(cookieParser())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI
, {
    //useNewUrlParser: true 최신엔 사용필요없음 자동으로 잡아준다.
    //useUnifiedToplogy: true, 
    //useCreateIndex: true, 
    //useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...'))
    .catch(err =>console.log(err))
app.get('/', (req, res) => {
  res.send('Hello World!111')
})

app.get('/api/hello', async (req, res )=> {
    res.send("안녕하세요~")
})

app.post('/api/users/register', async (req, res) => {

    // 회원 가입 할때 필요한 정보들을 client에서 가져오면
    // 그것들을 데이터 베이스에 넣어준다.
   // const user = new User(req.body)// req 안에 정보를 가지고오는데 bodyParser이용해 클라이언트가 보낸정보를 받아준다.

    // user.save((err, userInfo) => {
    //     if (err) return res.json({ success: false, err })
    //     return res.status(200).json({
    //       success: true
    //     })
    //   })
    
    // user.save()
    // .then(result => {
    //     console.log(result);
    // })
    // .catch(err => {
    //     console.error(err);
    // });

    // try {
    //     const result = await user.save();
    //     console.log(result);
    // } catch (err) {
    //     console.error(err);
    // }


    try {
        // 회원 가입 할때 필요한 정보들을 client에서 가져오면
        // 그것들을 데이터 베이스에 넣어준다.
        const user = new User(req.body); // req 안에 정보를 가지고오는데 bodyParser 이용해 클라이언트가 보낸정보를 받아준다.
        const result = await user.save();
        console.log(result);
        return res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return res.json({ success: false, err });
    }
})

app.post('/api/users/login', async (req, res) => {
    try {
        // 1. 요청된 이메일을 데이터베이스에서 있는지 찾는다.
        const user = await User.findOne({ email: req.body.email }); // 찾고자하는 메일 req.body.email
        console.log(user);

        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            });
        }

        // 2. 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는지 확인
        const isMatch = await user.comparePassword(req.body.password); //User모델에서 확인된것

        if (!isMatch) {
            return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });
        }

        // 3. 비밀번호까지 맞다면 토큰을 생성하자
        await user.generateToken();
        console.log(user);
        // 토큰을 저장한다. 어디에 ? 쿠키 , 로컬스토리지
        res.cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
    } catch (err) {
        console.error(err);
        return res.status(400).send(err);
    }
});

//role 1 어드민    role 2 특정 부서 어드민 
//role 0 -> 일반유저   role 0이 아니면  관리자 
app.get('/api/users/auth', auth, async (req, res) => {
    try {
        // 여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 True라는 말.
        res.status(200).json({
            _id: req.user._id,
            isAdmin: req.user.role === 0 ? false : true,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname,
            role: req.user.role,
            image: req.user.image
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류입니다.' });
    }
});


app.get('/api/users/logout', auth, async (req, res) => {
    try {
        // 유저를 찾아서 토큰을 초기화한다.
        await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });
        res.status(200).send({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: '서버 오류입니다.' });
    }
});
// app.get('/api/users/logout', auth, (req, res) => {
//     // console.log('req.user', req.user)
//     User.findOneAndUpdate({ _id: req.user._id },
//       { token: "" }
//       , (err, user) => {
//         if (err) return res.json({ success: false, err });
//         return res.status(200).send({
//           success: true
//         })
//       })
//   })
  

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})