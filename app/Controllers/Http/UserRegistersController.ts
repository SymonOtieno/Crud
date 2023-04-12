import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Event from '@ioc:Adonis/Core/Event'

export default class UserRegistersController {
    public async userRegister({request}:HttpContextContract){
        let requestData = request.all()
        let username = requestData.username
        let email = requestData.email
        let password = requestData.password

        Event.emit('new:userRegister',{username: username, email: email, password: password})

        return 'Successfully Registered!!'

    }
}
