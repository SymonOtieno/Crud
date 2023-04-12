 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import Installment from 'App/Models/Installment'
 import Logger from '@ioc:Adonis/Core/Logger'
import Database from '@ioc:Adonis/Lucid/Database';

export default class PaymentInstallmentsController {
    public async paymentInstallments({request,response}: HttpContextContract){

        let reqData = request.all()
        let installments = await Installment.query().where('status','=', 'CURRENT').orderBy('installment_no','asc');
        let key = 0;
        for(let installment of installments){
            key=key+1;
            Logger.info("The Key ==> "+key);
            Logger.info("installment ==> " + JSON.stringify(installment))
            Logger.info("====================================\n")

            if(key==1){
                let amountPaid = parseInt(reqData.amountPaid);
            
            let balance = installment.balance;
            let amountAreadyPaid=installment.amountPaid;
            let totalAmountPaid = amountAreadyPaid + amountPaid;
            let remainingBalance = balance-amountPaid;
            let instalmentStatus= installment.status;
            if(remainingBalance<=0){
                instalmentStatus="PAID";
            }
            installment.balance=remainingBalance;
            installment.amountPaid=totalAmountPaid;
            installment.status=instalmentStatus;
            await installment.save();

            
            }

            
        }
        let totalBalance = await  Database.from('installments').sum('balance as TotalInstallments')
        

        response.send(await Installment.query())
        
        
        
    }
}
