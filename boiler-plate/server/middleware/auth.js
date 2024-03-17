const { User } = require('../models/User');


let auth = async (req, res, next) => {
    // 클라이언트 쿠기에서 토큰을 가져온다.
    let token = req.cookies.x_auth;

    try {
        // 토큰을 복호화한 후 유저를 찾는다.
        const user = await User.findByToken(token);
        
        if (!user) {
            return res.json({isAuth: false, error: true});
        }

        req.token = token; // req에 token 추가
        req.user = user; // req에 user 추가
        next(); // 다음 미들웨어로 이동
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '서버 오류입니다.' });
    }
}


module.exports={ auth };