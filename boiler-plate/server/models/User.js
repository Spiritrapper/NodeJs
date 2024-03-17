const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');


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
        type: String
    },
    tokenExp: {
        type: Number
    }
})


userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})


userSchema.methods.comparePassword = async function (plainPassword) {
    try {
        const isMatch = await bcrypt.compare(plainPassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
};

userSchema.methods.generateToken = async function () {
    try {
        const user = this;
        const token = jwt.sign(user._id.toHexString(), 'secretToken');
        user.token = token;
        await user.save();
        return user;
    } catch (err) {
        throw err;
    }
};

userSchema.statics.findByToken = async function(token) {
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


const User = mongoose.model('User', userSchema)

module.exports = { User }