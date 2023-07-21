/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import PaymentsController from 'App/Controllers/Http/PaymentsController'
import ToyotasController from 'App/Controllers/Http/ToyotasController'


Route.get('/', async () => {
  return { hello: 'world' }
})

Route.resource('/cars','CarsController').apiOnly()

Route.get('/motor','MotorbikesController.index')

Route.resource('/toyota','ToyotasController').apiOnly()

Route.resource('/axios','AxiosController').apiOnly()

Route.resource('/testApi','AxiosController').apiOnly()

Route.resource('/testProject','TestProject1sController').apiOnly()

Route.resource('/psql','PsqlsController').apiOnly()

Route.resource('/ipf','IpfservicesController').apiOnly()

Route.post('/filter','IpfservicesController.filterRecordByDate')

Route.post('/payment','PaymentsController.store')

Route.post('/sendOtp','OtpController.sendOtp')

Route.post('/register','UserRegistersController.userRegister')

Route.post('/installment','PaymentInstallmentsController.paymentInstallments')

Route.get('/loanstatus','LoanstatusesController.loanStatus')

Route.get('/account','LoanAccountsController.account')

Route.get('/loans/Downloads','LoanAccountsController.download')

Route.get('/downloadFile', 'LoanAccountsController.downloadFile')

Route.post('/file/upload','LoanAccountsController.upload')

Route.get('/download','LoanAccountsController.jpgdownload')

Route.get('/download/file','LoanAccountsController.fetchfile')

Route.get('/event','EventsController.event')

Route.get('/check','InstallmentchecksController.installmentCheck')

Route.get('/test','ExercisesController.test')

Route.get('/user','ExercisesController.user')

Route.get('/axiostest','AxiostestsController.test')