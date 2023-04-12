import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoanAccount from 'App/Models/LoanAccount'
import Application from '@ioc:Adonis/Core/Application'
import { schema } from '@ioc:Adonis/Core/Validator'
import FileUpload from 'App/Models/FileUpload'


const reader = require('xlsx')
const file = reader.readFile('app/public/loan_core_ipf_active_loans.xlsx')
const excel = require("exceljs");
let workbook = new excel.Workbook();

export default class LoanAccountsController {

    public async account({}: HttpContextContract){
        let values = await this.loanAccount()
        for(let val of values){
            await LoanAccount.create({loanNumber: val['Loan Number'], referenceNo: val['reference_no'], runningBalance: val['running_balance'], commencementDate: val['commencement_date'], dueDate: val['due_date'], status: val['status'], instalementsPaid: val['Instalements PAID'], loanAccountId: val['Loan Account ID'], nextInstallmentDue: val['Next Installment Due']}) 
            
        }
    }

    public async loanAccount(){
        let data = []
        const sheets = file.SheetNames
        console.log("Sheets ==> " + sheets)
        for(let i = 0; i < sheets.length; i++){
            
            const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
            temp.forEach((res) => {
                data.push(res)
                    })
            }
                return data
        }

    public async download({res}: HttpContextContract){
        await this.csv(res)
    }

    public async csv(res){
        let loans = await this.loanAccount()
        console.log("Loans ==> " + JSON.stringify(loans))

        //const csvFields = ['installment_no', 'installment_days', 'commence_date', 'due_date', 'amount', 'status', 'amount_paid', 'balance'];
        // res is a Stream object
        res.setHeader("Content-Disposition","attachment; filename=" + "loan_core_ipf_active_loans.xlsx");
        
        return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
    });
}

public async downloadFile({response}){
    return response.download('/var/www/crud/app/public/loan_core_ipf_active_loans.xlsx')
}

public async upload({request, response}: HttpContextContract){
    // const coverImage = request.file('banner',{
    //     size: '2mb',
    //     extnames: ['jpg','gif','png']
    // })

    //if(!coverImage || !coverImage.isValid) return response.send({message: 'Problem with file'})
    
    const postDataSchema = schema.create({
        banner: schema.file({
            size: '2mb',
            extnames: ['gif','jpg','png']
        })
    })
    const postData = await request.validate({schema: postDataSchema})
    
    const uniqueRef = Math.floor(Math.random()* (300 - 100 + 1)) + 100
    const fileName = uniqueRef + "-" + postData.banner.clientName

    postData.banner.clientName = fileName

    await postData.banner.move(Application.tmpPath('uploads'))

    await FileUpload.create({fileName: fileName})

    return response.created({
        message: 'File uploaded'
    })
    
}

public async jpgdownload({response}){
    let filePath = Application.tmpPath('uploads');
    let fileToDownload = filePath + '/saint-marks.jpg'
    console.log("fileToDownload "+ fileToDownload)

    return response.download(fileToDownload)
}

public async fetchfile({response}){
    let filePath = Application.tmpPath('uploads')
    let fileName = await FileUpload.query().select('file_name').where('id',1).first()
    let name = fileName?.fileName
    let file = filePath + '/' + name
    console.log(file)

    return response.download(file)
}

}
