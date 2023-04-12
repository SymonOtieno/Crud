import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ipfService from '../../services/ipfservice'
import Logger from '@ioc:Adonis/Core/Logger'
import Installment from 'App/Models/Installment'

export default class PaymentsController {
    public async store({request,response}: HttpContextContract) {
        let reqData = request.all();
    
        Logger.info("Request Data =>" + JSON.stringify(reqData))
    
        let ipfResponse = await ipfService.ipfSummary(reqData);
    
        const installments = ipfResponse.data.instalments;
    
        for(let installment of installments){
    
           let filteredNo = installment.installmentNo
    
           let existingInstallment = await Installment.query().where('installment_no','=',filteredNo).first()
           //await Installment.create({installment_No: installment.installmentNo, installmentDays: installment.installmentDays, commenceDate: installment.commenceDate, dueDate: installment.dueDate, amount: installment.amount, status: installment.status, amountPaid: 0, balance: installment.amount})
          
           if(existingInstallment){
            let count = 1
            let balanceInquiry = await Installment.query().where('balance','=',0).first()
            let statusInquiry =  await Installment.query().where('status','=','PAID').first()

            if(!statusInquiry){
                await Installment.query().where('installment_no','=',count).update({amount_paid: reqData.amountPaid, balance: installment.amount-reqData.amountPaid})
            }
            if(balanceInquiry){
                await Installment.query().where('installment_no','=',count).update({status: 'PAID'})
                
            }
            
            
          }
           
    
          
      }
      response.send(await Installment.query())
      
      }
}
