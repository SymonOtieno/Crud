import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Installment from 'App/Models/Installment'

export default class LoanstatusesController {
    public async loanStatus({response}: HttpContextContract ){

        let paid = await Installment.query().where('status','=','PAID')
        let totalBalance = await  Database.from('installments').sum('balance as TotalInstallments')
        let unpaid = await Installment.query().where('status','=','CURRENT')

        const installmentObj = new Object()
        installmentObj.totalBalance = totalBalance[0].TotalInstallments

        if(unpaid && paid){
            installmentObj.loanStatus = 'CURRENT'
        }

        if(paid){
            installmentObj.paidInstallments = paid
        }

        if(unpaid){
            installmentObj.unpaidInstallments = unpaid
        }

        if(installmentObj.unpaidInstallments==0){
            installmentObj.loanStatus = 'PAID'
        }

        response.send(installmentObj)

        }

        
    
}
