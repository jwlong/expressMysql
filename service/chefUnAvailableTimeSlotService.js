import BaseService from './baseService.js'
import {AutoWritedChefUnAVLTimeSlot} from '../common/AutoWrite.js'
import chefAvailableTimeSlotService from './chefAvailableTimeSlotService'
import utils from "../common/utils";
import db from "../config/db";
@AutoWritedChefUnAVLTimeSlot
class ChefUnAvailableTimeSlotService extends BaseService{
    constructor(){
        super(ChefUnAvailableTimeSlotService.model)
    }

    retrieveAvailTimeslots(chefId) {
       return this.baseFindByFilter(['start_date','end_date','instant_ind','available_meal'],{chef_id:chefId})
    }

    /**
     * 更新t_chef_unavilable_timeslot 表数据，
     * 当chef_id下存在状态为A的记录时，更新为R,并插入新的A状态记录
     * @param attr
     * @returns {*}
     */
    updateChefUnAvailableTimeSlot(attr) {
        let promiseArr = [];
        return db.transaction(t => {
            let updatedPromise = this.baseUpdate({active_ind:'R'},{where:{chef_id:attr.chef_id,active_ind:'A'},transaction:t});
            promiseArr.push(updatedPromise);
            attr.available_timeslot_list.forEach((timeslot,index) => {
                timeslot.chef_id = attr.chef_id;
                let p = this.nextId('timeslot_id', {transaction: t}).then(nextId => {
                    timeslot.timeslot_id = nextId+index;
                    return this.baseCreate(timeslot, {transaction: t});
                })
                promiseArr.push(p);
            })
            return Promise.all(promiseArr);
        })
    }
}
module.exports = new ChefUnAvailableTimeSlotService()