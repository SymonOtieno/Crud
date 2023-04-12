import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExercisesController {
    public async test({response}: HttpContextContract){
        // Aliases
        type CarYear = number
        type CarType = string
        type CarModel = string

        type Car = {
            year: CarYear,
            type: CarType,
            model: CarModel
        }

        const carYear: CarYear = 2022
        const carType: CarType = "Mercedes"
        const carModel:CarModel="Benz"

        const car: Car = {
            year: carYear,
            type: carType,
            model: carModel
        }
        response.send(car)
    }
    public async user({response}: HttpContextContract){
        type User = {
            name: string
            age: number
        }
        function isAdult(user: User): boolean{
            return user.age > 18
        }
        const justine: User = {
            name: 'Justine',
            age: 23
        }

        const isJustineAnADult: boolean = isAdult(justine)

        response.send(isJustineAnADult)
    }
}
