/**
 * Created by aa on 2019/8/11.
 */
import express from 'express'
import userService from '../service/userService';
import jwt from "jsonwebtoken"
import cfg from '../config/index'
import baseResult from "../model/baseResult";
import utils from "../common/utils";

const router = express.Router()
// 请求前缀为/user
class UserController {
    static initRouter(){
        /***************User 业务***************/
        router.post('/createUser',  async(req, res,next) => {
            var data  = req.body;
            try {
                await userService.checkBeforeCreate(req.body,res);
               try {
                   let user = req.body;
                   try {
                       if (!user.username || !user.password) {
                           throw baseResult.USER_INVALID_NAME_PASSWD;
                       }
                       user.user_id = await  userService.nextId('user_id');
                       user.update_by = req.user_id || cfg.robot_id;
                       user.ipv4_address = user.IPv4_address || user.ipv4_address;
                       user.sms_notify_ind = user.SMS_notify_ind || user.sms_notify_ind;
                       console.log("user:",user);
                       let result = await userService.baseCreate(user);
                       return res.json(baseResult.SUCCESS);
                   }catch(e) {
                       next(e);
                   }
               }catch (err2) {
                   next(err2);
               }

            }catch (err) {
                next(err);
            }
        })

        router.get('/userLogin',async(req, res,next) => {
            console.log("Login param:=>",req.query);
            if (req.query) {
                console.log(req.query);
                let userLoginParam = utils.keyLowerCase(req.query);
                userLoginParam.user_name = userLoginParam.username || userLoginParam.user_name;

                try {
                    if (!userLoginParam.ipv4_address) {
                        throw  baseResult.USER_IPV4_ERROR
                    }
                    if (!userLoginParam.username || !userLoginParam.password) {
                        throw baseResult.USER_INVALID_NAME_PASSWD;
                    }
                    let result = await  userService.loginHandler(userLoginParam)
                    if (result) {
                        const tokenInfo = {
                            access_status: '0',
                            access_token: jwt.sign({id: result.user_id}, cfg.jwtSecret, {expiresIn: cfg.expiresIn}),
                        };
                        return res.json(tokenInfo);
                    }

                } catch (e) {
                    next(e);
                }
            }
        })


        router.post("/updateUser", async (req, res, next) => {
            let userId = req.user_id;
            try {
                if (userId) {
                    let userForUpdated = req.body;
                    userForUpdated.ipv4_address = userForUpdated.IPv4_address;
                    userForUpdated.sms_notify_ind = userForUpdated.SMS_notify_ind;
                    if (!userForUpdated.user_name || !userForUpdated.password) {
                        throw  baseResult.USER_INVALID_NAME_PASSWD;
                    }
                    if (!userForUpdated.first_name || !userForUpdated.last_name || !userForUpdated.email_address || !userForUpdated.contact_no) {
                        throw baseResult.USER_MANDATORY_FIELD_EXCEPTION;
                    }
                    await userService.baseUpdate(userForUpdated, {where:{user_id: userId}});

                    return res.json(baseResult.SUCCESS);

                } else {
                    throw  baseResult.USER_VERITY_INVALID
                }
            } catch (e) {
                next(e);
            }
        })
        return router;
    }

}
module.exports = UserController.initRouter();