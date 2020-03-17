'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    user_name: String,
    password: String,
    id: Number,
    create_time: String,
    admin: {
        type: String,
        default: '管理员'
    },
    status: Number, //1:普通管理、 2:超级管理员
    avatar: {
        type: String,
        default: 'default.jpg'
    },
    city: String,
    gender: Number, //1:男性、2：女性
    call_phone: Number,
});

adminSchema.index({
    id: 1
});

const Admin = mongoose.model('Admin', adminSchema);

// 插入初始化数据一条
//根据模型创建实体，是指的个体对象
// var personEntity = new Admin({
//     user_name: 'admin',
//     password: '123456',
//     id: 1,
//     create_time: '2020/3/17 12:12:00',
//     admin: '',
//     status: 2, //1:普通管理、 2:超级管理员
//     avatar: '',
//     city: '山东临沂',
//     gender: 1, //1:男性、2：女性
//     call_phone: 18769977818,
// });
// //用save 方法把自己保存到数据库中
// personEntity.save(function (error, doc) {
//     if (error) {
//         console.log("error :" + error);
//     } else {
//         console.log(doc);
//     }
// });


export default Admin