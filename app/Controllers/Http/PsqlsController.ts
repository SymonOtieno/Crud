import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'

export default class PsqlsController {
  public async index({}: HttpContextContract) {
    axios.get('/user/12345')
    .catch(function(error){
      if(error.response){
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      }else if(error.request){
        console.log(error.request)
      }else{
        console.log('Error', error.message)
      }
      console.log(error.config)
    })
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
