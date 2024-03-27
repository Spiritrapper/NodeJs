const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // 암호화  다운
const saltRounds = 10; // salt생성해서 이걸이용해서 암호화 10자리 salt만들어 암호화
const jwt = require('jsonwebtoken'); //토큰을 사용하기위해 다운로드


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0 
    },
    image: String,
    token: {
        type: String //유효성관리
    },
    tokenExp: {
        type: Number // 유효기간
    }
})



// userSchema.pre('save', function (next) { // pre는 save 하기전에 동작하라는것 // save전에 비밀번호 암호화
//     var user = this; // userSchema 전체 데이터를 가르킴
//     //if (user.isModified('password')) { //조건 : 비밀번호가 바꿀때만 암호화됨. 로그인때마다 암호화진행되면 안되기에
//     if (user.isModified('password')) { // this로 가능
//         //비밀번호를 암호화 시킨다.
//         bcrypt.genSalt(saltRounds, function (err, salt) { // salt생성
//             if (err) return next(err) // 에러가나면 바로 save로 보냄

//             bcrypt.hash(user.password, salt, function (err, hash) { // hash : 암호화된 비밀번호
//                 if (err) return next(err)
//                 user.password = hash // 성공했으면 hash로 암호를 바꿈
//                 next() // 돌아감
//             })
//         })
//     } else { // 다른거 일때는  머물지말고 그냥 나가라
//         next()
//     }
// })

userSchema.pre('save', async function (next) { // pre middleware //특정작업 정의
    var user = this;
    if (user.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hash = await bcrypt.hash(user.password, salt);
            user.password = hash;
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

userSchema.methods.comparePassword = async function (plainPassword) { // 특정메소드에 함수를 할당
    try {
        const isMatch = await bcrypt.compare(plainPassword, this.password);
        return isMatch; // true
    } catch (err) {
        throw err;
    }
};

userSchema.methods.generateToken = async function () {

    // jsonwebtoken을 이용해서 token 생성하기
    try {
        const user = this;
        const token = jwt.sign(user._id.toHexString(), 'secretToken'); // user._id + "secretToken" = token
        user.token = token; // 스키마내 토큰장소에 token 대입
        await user.save();
        return user;
    } catch (err) {
        //if(err) return res.status(400).send(err);
        throw err;
    }
};

userSchema.statics.findByToken = async function(token) { //User 모델 전체에서 호출가능 static
    try {
        // 토큰을 decode
        const decoded = jwt.verify(token, 'secretToken');
        
        // 유저 아이디를 이용해서 유저를 찾고, DB에 보관된 토큰과 일치하는지 확인
        const foundUser = await this.findOne({ "_id": decoded, "token": token });
        
        return foundUser;
    } catch (err) {
        throw err; // 에러 발생 시 던짐
    }
}


const User = mongoose.model('User', userSchema) // 모델로 감싸주기

module.exports = { User } // 다른파일에서 이용가능토록