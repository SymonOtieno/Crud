import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'

export default class OtpController {
  public async sendOtp({request}:HttpContextContract){
    let reqData = request.all();
    let email = reqData.email;
    let otp = 2345

    Event.emit('new:sendOtp', { email:email, otp:otp})

    return "SUCCESS";

  }
}