import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CarMake from 'App/Models/CarMake'
import NissanModel from 'App/Models/NissanModel'
import Toyota from 'App/Models/Toyota'

const hikToyotas = require('../../public/VehicleList.json')

export default class ToyotasController {
  public async index({response}: HttpContextContract)  {
    let numberOfRecordsSaved = 0;
    for (let toyota of hikToyotas){
      console.log("Toyota ==> " + JSON.stringify(toyota))
      let trimToyota = toyota.value.trim()
      let valToyota = trimToyota.split(':')
      let vToyota = valToyota[0]

      if(vToyota='Toyota '){
        let existingToyotaMake = await CarMake.query().where('name','=',vToyota).first()

        if(existingToyotaMake){
          let vModel = valToyota[1]
          vModel = vModel.trim()
          let existingToyotaModel = await NissanModel.query().where('name','=',vModel.trim()).first()
          
          if(existingToyotaModel){
            let smallCar = 'Not a Small Car'
            if(vModel=='Passo' || vModel=='Vitz'){
              smallCar = 'Small Car'
            }

              let savedModel=await Toyota.create({name: vModel,make_id:existingToyotaMake.id,comment:smallCar})
              if(savedModel){
                numberOfRecordsSaved ++
              }

        }

        
      }
    }
  }
  if(numberOfRecordsSaved==0){
    response.send('No records Saved')
  }
  if(numberOfRecordsSaved>0){
    response.send('Number of records saved: ' + numberOfRecordsSaved)
  }
}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
