import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Axio from 'App/Models/Axio';
import axios from 'axios'


export default class AxiosController {
  public async index({}: HttpContextContract) {

    
    await axios.get('https://data.binance.com/api/v3/ticker/24hr', {
      
    })
    .then(async function (response) {
      let noOfElements = 0;
      for(let record  of response.data){
        console.log("record Data => " + record.symbol)
        noOfElements = noOfElements+1;
        console.log(noOfElements);
        if(noOfElements <=50){
          await Axio.create({symbol:record.symbol,price_change: record.priceChange,open_time: record.openTime,price_change_percent:record.priceChangePercent,weighted_avg_price:record.weightedAvgPrice});
        }
        
      }
      
      //console.log(response.data.symbol);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });  
    
    return;
  }


  public async store({request}: HttpContextContract) {
    let reqData = request.all();

    axios.post('https://reqres.in/api/articles', reqData)
            .then(
                    response => console.log(response.data)
                ).catch(
                    error => console.log(error)
                )
    return request
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
