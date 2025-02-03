// /backend/server.js
/*
加载express，中间件，路由
*/

const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { User } = require('./src/models/users');

// 加载环境变量
dotenv.config();

const app = express();
app.use(express.json());

app.get('/api/user', async (req, res) => {
    const users = await User.find();
    res.send(users);
})

app.post('/api/register', async (req, res) => {
    const user = await User.create({
        username: req.body.username,
        password: req.body.password
    })
    res.send('注册成功');
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
    })
    if(!user) {
        return res.status(401).send({
            message: '用户名或密码错误'
        })
    }

    const ispasswordValid = require('bcryptjs').compareSync(
        req.body.password, 
        user.password
    );
    if(!ispasswordValid) {
        return res.status(401).send({
            message: '用户名或密码错误'
        })
    }
    
    const token = jwt.sign({
        id: String(user._id),
    }, process.env.JWT_SECRET);

    res.send({
        user,
        token
    })
})

const auth = async (req, res, next) => {
    const raw = String(req.headers.authorization).split(' ').pop();
    const {id} = jwt.verify(raw, process.env.JWT_SECRET);
    const user = await User.findById(id);
    req.user = user;
    next();
}

app.get('/api/profile', auth, async (req, res) => {
    return res.send(req.user);
})

// 启动本地服务器 
const PORT = process.env.PORT; // http://localhost:3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
