import express from 'express'
import chefService from '../service/chefService';//引入了就会创建表 ,当model.sync()存在
import chefAvailableTimeSlotService from '../service/chefAvailableTimeSlotService'
import chefUnAvailableTimeSlotService from '../service/chefUnAvailableTimeSlotService'
import chefDefaultScheuleService from '../service/chefDefaultScheuleService'
import utils from "../common/utils";
import baseResult from "../model/baseResult";
const router = express.Router()
//访问前缀 /staff

class TimeSlotController {
    static initRouter(){
        /***************TimeSlot 业务***************/
        router.post('/updateChefAvailableTimeSlot', async (req, res, next) => {
            try {
                let data = utils.keyLowerCase(req.body);
                await  chefAvailableTimeSlotService.createChefAvailableTimeSlots(data);
                return res.json(baseResult.SUCCESS);
            }catch (e) {
                next(e);
            }

        })

        router.post('/updateChefUnAvailableTimeSlot', async (req, res, next) => {
            //try{res.json(await chefService.baseFindAll())}catch(err){next(err)}
            try{
                let data = utils.keyLowerCase(req.body);
                await chefUnAvailableTimeSlotService.createChefUnAvailableTimeSlot(data);
                return res.json(baseResult.SUCCESS);
            }catch(err){next(err)}
        })


        router.post('/updateChefDefaultTimeSlot', async (req, res, next) => {
            console.log("updateChefDefaultTimeSlot,request body:",req.body);
            try{
                let data = utils.keyLowerCase(req.body);
                await  chefDefaultScheuleService.checkDefaultScheule(data)
                return res.json(baseResult.SUCCESS);
            }catch(err){next(err)}
        })

        return router;
    }

}
module.exports = TimeSlotController.initRouter();
