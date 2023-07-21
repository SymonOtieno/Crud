import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from "axios"
import Logger from '@ioc:Adonis/Core/Logger'

export default class AxiostestsController {
    public async test({}: HttpContextContract){
        // Make a request for a user with a given ID
        axios.get('https://data.binance.com/api/v3/ticker/24hr')
        .then(function (response) {
            let noofrecords = 0;
            for(let record of response.data){
                noofrecords++
                if(noofrecords<=10){
                    console.log("Symbol ==> " + record.symbol + "::" + "BidPrice==> " + record.bidPrice)
                }
                
            }
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .finally(function () {
        // always executed
        });
    }
}
