import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ipfService from '../../services/ipfservice'
import { schema } from '@ioc:Adonis/Core/Validator'
import Logger from '@ioc:Adonis/Core/Logger'
import Installment from 'App/Models/Installment'
import moment from "moment";
import Database from '@ioc:Adonis/Lucid/Database'

export default class IpfservicesController {
  public async index({response, request}: HttpContextContract) {
    let installment = await Installment.query()
    console.log("Stringfied ==> " + JSON.stringify(installment))

    const page = request.input('page', 1)
    const limit = 6

    const posts = await Installment.query().from('installments').where('installment_no','=','5').orderBy('id','desc').paginate(page, limit)

    response.send(posts)

  }

  public async filterRecordByDate({request,response}){
    let reqData = request.all()
      
    //console.log("CommenceDate ==> " + startDate)
    

    let currentDate =  moment(reqData.fromDate).format("YYYY-MM-DD hh:mm:ss");
    let futureDate =  moment(reqData.toDate).format("YYYY-MM-DD hh:mm:ss");


    //const filteredCommence = await Installment.query().from('installments').where('','=','2023-04-26')
    let filterData =  await Database
                .from('installments')
                .whereBetween('commence_date', [currentDate, futureDate])

    Logger.info(currentDate)
    Logger.info(futureDate)
    
    response.send(filterData)

  }


  public async store({request,response}: HttpContextContract) {
    let reqData = request.all();

    Logger.info("Request Data =>" + JSON.stringify(reqData))

    const newIpfSchema = schema.create({
      policyNo: schema.string(),
      requestRef: schema.string()
    })

    await request.validate({schema: newIpfSchema})

    Logger.info("Succesfull Validation")

    let ipfResponse = await ipfService.ipfSummary(reqData);

    
    Logger.info("The response Code => "+ipfResponse.code);
    Logger.info("The response message => "+ipfResponse.message);
    Logger.info("Running Balance => " + ipfResponse.data.runningBalance);
    Logger.info("Loan Status => " + ipfResponse.data.loanStatus);
    Logger.info("Request Reference => " + ipfResponse.data.requestRef);

    const installments = ipfResponse.data.instalments;

    console.log(installments)
    
    console.log("installments ==> "+JSON.stringify(installments));

    for(let installment of installments){

       let filteredNo = installment.installmentNo

       let existingInstallment = await Installment.query().where('installment_no','=',filteredNo).first()
       
       if(!existingInstallment){
        await Installment.create({installment_No: installment.installmentNo, installmentDays: installment.installmentDays, commenceDate: installment.commenceDate, dueDate: installment.dueDate, amount: installment.amount, status: installment.status, amountPaid: reqData.amountPaid, balance: installment.amount - reqData.amountPaid})
        if(installment.amount==reqData.amountPaid){
          await Installment.create({installment_No: installment.installmentNo, installmentDays: installment.installmentDays, commenceDate: installment.commenceDate, dueDate: installment.dueDate, amount: installment.amount, status: "PAID", amountPaid: reqData.amountPaid, balance: installment.amount - reqData.amountPaid})
        }
        else{
          await Installment.create({installment_No: installment.installmentNo, installmentDays: installment.installmentDays, commenceDate: installment.commenceDate, dueDate: installment.dueDate, amount: installment.amount, status: installment.status, amountPaid: reqData.amountPaid, balance: installment.amount - reqData.amountPaid})
        }
        
       break;
      }
       

      
  }
  response.send(await Installment.query())
  
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
