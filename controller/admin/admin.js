'use strict';

import AdminModel from '../../models/admin/admin'
import crypto from 'crypto'
import formidable from 'formidable'
import dtime from 'time-formater'

class Admin {
    constructor() {
        super()
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.encryption = this.encryption.bind(this)
    }
    //登录
    async login(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.send({
                    status: 0,
                    type: 'FORM_DATA_ERROR',
                    message: '表单信息错误'
                })
                return
            }
            const {user_name, password} = fields;
            try {
                if (!user_name) {
                    throw new Error('用户名参数错误')
                } else if (!password) {
                    throw new Error('密码参数错误')
                }
            } catch (err) {
                console.log(err.message, err);
                res.send({
                    status: 0,
                    type: 'GET_ERROR_PARAM',
                    message: err.message,
                })
                return
            }
            const newpassword = this.encryption(password);//密码基于Md5加密
            try{
                const admin = await AdminModel.findOne({user_name})
                if(!admin){
                    res.send({
                        status: 0,
                        type: 'ERROR_USER_NONENTITY',
                        message: '用户不存在'
                    })
                    return
                }else if(newpassword.toString()!==admin.password.toString()){
                    console.log('管理员密码错误');
                    res.send({
                        status:0,
                        type: 'ERROR_PASSWORD'
                    })
                    return
                }else{
                    res.send({
                        status: 1,
                        success: '登录成功'
                    })
                }
            }catch(err){
                console.log('登录管理员失败',err);
                res.send({
                    status: 0,
                    type: 'LOGIN_ADMIN_FAILED',
                    message: '登录管理员失败',
                })
            }
        })

    }
    //注册
    async register(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req,async (err,fields,files) => {
            if (err) {
                res.send({
                    status: 0,
                    type: 'FORM_DATA_ERROR',
                    message: '表单信息错误'
                })
                return
            }
            const {user_name,password,call_phone,gender,status =1} =fields
            try{
                if(!user_name){
                    throw new Error('用户名错误')
                }else if(!password){
                    throw new Error('密码错误')
                }
            }catch(err){
                console.log(err.message, err);
                res.send({
                    status: 0,
                    type: 'GET_ERROR_PARAM',
                    message: err.message,
                })
                return
            }

            try {
                const admin = await AdminModel.findOne({user_name})
                if (admin) {
                    console.log('该用户已存在');
                    res.send({
                        status: 0,
                        type: 'USER_HAS_EXIST',
                        message: '该用户已存在'
                    })
                } else {
                    const adminTip = status == 1 ? '管理员' : '超级管理员';
                    const newpassword = this.encryption(password);
                    const newAdmin = {
                        user_name: user_name,
                        password: newpassword,
                        create_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
                        admin: adminTip,
                        status: status,
                        call_phone: call_phone,
                        gender: gender
                    }
                    await AdminModel.create(newAdmin)
                    res.send({
                        status: 1,
                        message: '注册管理员成功'
                    })
                }
            } catch (error) {
                console.log('注册管理员失败', err);
                res.send({
                    status: 0,
                    type: 'REGISTER_ADMIN_FAILED',
                    message: '注册管理员失败',
                })
            }
        })
    }
    //生成新密码
    encryption(password){
        const newpassword = this.Md5(this.Md5(password).substr(2,7))+this.Md5(password)
        return newpassword
    }
    //密码MD5加密
    Md5(password){
        const md5 = crypto.createHash('md5')
        return md5.update(password).digest('base64')
    }
}

export default new Admin()