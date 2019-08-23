import BaseService from './baseService.js'
import {AutoWritedDefaultScheule} from '../common/AutoWrite.js'
import db from '../config/db.js'
import baseResult from "../model/baseResult";
import chefAvailableTimeSlotService from './chefAvailableTimeSlotService'
@AutoWritedDefaultScheule
class ChefDefaultScheuleService extends BaseService{
    constructor(){
        super(ChefDefaultScheuleService.model)
    }
    updateChefDefaultTimeSlot(data) {
        if (!data.chef_id) {
            throw baseResult.TIMESLOT_CHEF_ID_NOT_FOUND;
        }
        if (!data.mon && !data.tue && !data.wed && !data.thu
            && !data.fri && !data.sat && data.sun && !data.holiday) {
            throw baseResult.TIMESLOT_PICK_ERROR;
        }
        return db.transaction(t => {
            // 查找是否有有效的timeslot
            return chefAvailableTimeSlotService.getModel().count({where:{chef_id:data.chef_id,active_ind:'A'},transaction:t}).then(chefAVLcnt => {
                if (!chefAVLcnt || chefAVLcnt === 0){
                    throw baseResult.TIMESLOT_LIST_EMPTY;
                }
                return this.getModel().count({where:{chef_id:data.chef_id,active_ind:'A'}}).then(cnt => {
                    if (!cnt && cnt === 0) {
                        return this.nextId('chef_default_scheule_id').then(nextId => {
                            data.chef_default_scheule_id = nextId;
                            return this.baseCreate(data);
                        })
                    }else {
                        return this.baseUpdate(data,{where:{chef_id:data.chef_id},transaction: t})
                    }
                })
                console.log("data=>",data)
            }).catch(e => {
                throw  e;
            })
        })
    }



    mapToDb(data) {
        let result = {};
        result.mon = data.monday;
        result.tue = data.tuesday;
        result.wed = data.wednesday;
        result.thu = data.thursday;
        result.fri = data.friday;
        result.sat = data.saturday;
        result.sun = data.sunday;
        return result;
    }

}
module.exports = new ChefDefaultScheuleService()