import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NissanModel from 'App/Models/NissanModel'
import CarMake from 'App/Models/CarMake'

const hikNissanList = require('../../public/VehicleList.json')

export default class NissanModelsController {
  public async index({}: HttpContextContract) {
    
    for(let nissan of hikNissanList){
      console.log("Nissan ==>" + JSON.stringify(nissan))
      let trimvalue = nissan.value.trim()
      let valArray = trimvalue.split(':')
      console.log("valArray[0] "+valArray[0])
      
      let vMake=valArray[0];

      if(vMake="Nissan "){
        let existingMake = await CarMake.query().where('name','=',vMake).first();
        console.log('Existing Make ==> '+ JSON.stringify(existingMake))
        if(existingMake){
          console.log("at vmake found");
          let val = valArray[1];
          val=val.trim();
          let existModel = await NissanModel.query().where('name','=',val.trim()).first()
          if(!existModel){
            let isAdvanModel = false;
            if(val=='AD Van'){
              console.log('it is advan');
              isAdvanModel=true;
            }
              await NissanModel.create({name:val, make_id:existingMake.id, not_liked:isAdvanModel})
          }
          

        }
      }
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
