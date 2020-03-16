import express from 'express';
const config = require('config-lite');
const chalk = require('chalk');
import db from './mongodb/db.js';

const app = express();

app.get('/', (res, req) => {
    req.send('基于node的后端API系统');
});

app.listen(config.post, ()=>{
    console.log(
        chalk.green(`成功监听端口：${config.post}`)
    )
})

