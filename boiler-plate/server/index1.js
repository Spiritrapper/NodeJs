const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const { User }= require("./models/User");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true})); //클라이언트에오는 정보를 가져오는
//
//application/json  
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


app.post('/register', async (req, res) => {

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

app.post('/login', async (req, res)=>{



    // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
    const userInfo = await User.findOne({email: req.body.email}, (err, userInfo) => {
        if(!userInfo) {
            return res.json({
                loginSuccess:false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
    })
    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
    const isMatch = await user.comparePassword(req.body.password, (err, isMatch) =>{

        if(!isMatch)
            return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})
    
        // 비밀번호 까지 맞다면 토큰을 생성하자
        user.generateToken((err, user)=> {
            if(err)return res.status(400).send(err);

            // 토큰을 저장한다. 어디에 ? 쿠키 , 로컬스토리지
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id})
        })
    

    })



    // 비밀번호까지 맞다면 토큰을 생성하기.
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})