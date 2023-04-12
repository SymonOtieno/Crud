import Mail from '@ioc:Adonis/Addons/Mail'
import Installment from 'App/Models/Installment'
import { BaseTask } from 'adonis5-scheduler/build'
import moment from 'moment'

export default class TestTask extends BaseTask {
	public static get schedule() {
		return '*/60 * * * * *'
	}
	/**
	 * Set enable use .lock file for block run retry task
	 * Lock file save to `build/tmpTaskLock`
	 */
	public static get useLock() {
		return false
	}

	public async handle() {
		let installments = await Installment.query().where('status','=', 'CURRENT').orWhere('status','=', 'DUE')

        console.log("Installments ==> " +JSON.stringify(installments))
        
        for(let installment of installments){
            let todayDateTime:any = moment().format("YYYY-MM-DD HH:mm:ss")
            console.log("todayDateTime todayDateTime ==> "+todayDateTime)
            todayDateTime = new Date(todayDateTime).getTime();
            let due_date:any = installment.dueDate
            console.log("dueDate ==> "+moment(due_date).format("YYYY-MM-DD HH:mm:ss"))
            due_date = new Date(due_date).getTime();

            if(todayDateTime==due_date){
                let msg = 'Your Loan installment is Due'
                // await Installment.query().update({status:'DUE'})
                installment.status='DUE';
                await installment.save()
                await Mail.send((message)=>{
                    message
                    .from('symon7672@gmail.com')
                    .to('symon7672@gmail.com')
                    .subject('Loan Installment Status!')
                    .text(msg)
                })
            }
            
            if(due_date < todayDateTime){
                let msg = 'Your Loan installment is in Default'
                installment.status='DEFAULT';
                await installment.save()
                await Mail.send((message)=>{
                    message
                    .from('symon7672@gmail.com')
                    .to('symon7672@gmail.com')
                    .subject('Loan Installment Status!')
                    .text(msg)
                })
            }
            }
    	this.logger.info('Handled')
  	}
}
