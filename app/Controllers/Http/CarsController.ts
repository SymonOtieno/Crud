import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CarMake from 'App/Models/CarMake'
import CarModel from 'App/Models/CarModel'

const hikVehicleList = require('../../public/VehicleList.json')

export default class CarsController {
  public async index() {
    console.log("hikVehicleList ==> "+JSON.stringify(hikVehicleList));

    for(let car of hikVehicleList){
      console.log(car.value)
        let trimmedValued = car.value.trim();
        let valArray = trimmedValued.split(':');
        let existingMake = await CarMake.query().where('name','=', valArray[0]).first();
        if(!existingMake){
          let carMake = await CarMake.create({name:valArray[0]});
          console.log('CarMake ==> '+carMake);
          if(carMake){
            //save model
            await CarModel.create({name:valArray[1], make_id:carMake.id}) 
          }
  
        }

    }

    return;
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
