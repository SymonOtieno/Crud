import type { EventsList } from '@ioc:Adonis/Core/Event'
import UserRegister from 'App/Models/UserRegister'
import Mail from '@ioc:Adonis/Addons/Mail'
import Hash from '@ioc:Adonis/Core/Hash'
import Installment from 'App/Models/Installment'
import moment from 'moment'

export default class Test {
    public async sendOtp(data: any){
        console.log("The otp to send ==> "+JSON.stringify(data))
    }
    public async userRegister(data: any){
        console.log("New User Registered ==> " + JSON.stringify(data))
        const hashedPwd = await Hash.make(data.password)
        
        UserRegister.create({username: data.username, email: data.email, password: hashedPwd})

        let msg = 'Your account successfully registered'

        await Mail.send((message) => {
            message
              .from('symon7672@gmail.com')
              .to('symon7672@gmail.com')
              .subject('Welcome Onboard!')
              .text(msg)
          })
    }
    


}
