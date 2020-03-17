'use strict';

import AdminModel from '../../models/admin/admin'
import crypto from 'crypto'
import formidable from 'formidable'

class Admin {
    constructor() {
        super()
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
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
            const {user_name, password, status = 1 } = fields;
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
                    const adminTip = status==1?'管理员':'超级管理员'
                    const newAdmin ={
                        user_name,
                        password:newpassword,
                        
                    }
                }
            }catch(err){

            }
        })

    }
    //注册
    async register(req, res, next) {

    }
    //生成新密码
    encryption(password){
        const newpassword = this.Md5(this.Md5(password).substr(2,7))+this.Md5(password);
        return newpassword
    }
    //密码MD5加密
    Md5(password){
        const md5 = crypto.createHash('md5');
        return md5.update(password).digest('base64');
    }
}