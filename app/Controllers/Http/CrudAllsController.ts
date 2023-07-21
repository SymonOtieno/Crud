import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

const hikVehicles = require('../../public/VehicleList.json')

export default class CrudAllsController {
    public async crudall({response}: HttpContextContract){
        let no_of_items = 0
        for(var vehicle in hikVehicles){
            no_of_items++
            response.send(hikVehicles[vehicle])
        }
        console.log(no_of_items)
    }
}
