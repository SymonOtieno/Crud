import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const hikNissanList = require('../../public/VehicleList.json')

export default class MotorbikesController {
  public async index(ctx: HttpContextContract) {
    console.log("hikNissanList ==>" + JSON.stringify(hikNissanList))

    for (let nissan of hikNissanList){
      console.log(nissan.value)
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
