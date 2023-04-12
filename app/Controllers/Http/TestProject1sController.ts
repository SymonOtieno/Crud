import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'

const hikVehicle = require('../../public/VehicleList.json')
export default class TestProject1sController {
  public async index({}: HttpContextContract) {
   
    const july172014 = new Date("2014-07-17");

  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };
  const americanDateTime = new Intl.DateTimeFormat("en-US", options).format;

  // Local timezone vary depending on your settings
  // In CEST, logs: 07/17/14, 02:00 AM GMT+2
  // In PDT, logs: 07/16/14, 05:00 PM GMT-7
  console.log(americanDateTime(july172014));

  const gasPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 3,
  });
  
  console.log(gasPrice.format(5.259)); // $5.259
  
  const hanDecimalRMBInChina = new Intl.NumberFormat("zh-CN-u-nu-hanidec", {
    style: "currency",
    currency: "CNY",
  });
  
  console.log(hanDecimalRMBInChina.format(1314.25));
  }


  public async store({}: HttpContextContract) {
    axios({
      method: 'post',
      url: 'https://reqres.in/api/articles'
    })
      .then(
        response => console.log(response.data)
      )
      .catch(
        error => console.log(error)
      )
  }



  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
