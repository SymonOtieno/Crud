/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event'


Event.on('new:sendOtp', 'Test.sendOtp')

Event.on('new:userRegister','Test.userRegister')

Event.on('new:installmentCheck','Test.installmentCheck')
