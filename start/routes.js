'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')

// Rotas somente quando user logado
Route.group(() => {
  // apiOnly exclui os metodos create and edit
  // uma linha para todas as rotas
  Route.resource('cars', 'CarController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['cars.store'], // quais metodos queremos validar, qual validator
          ['Car']
        ],
        [
          ['cars.update'], // quais metodos queremos validar, qual validator
          ['Car']
        ]
        /**
         * [ ['projects.outro], ['outroValidator'] ]
         */
      ]
    ))

  Route.resource('supplies', 'SupplyController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['supplies.store'], // quais metodos queremos validar, qual validator
          ['Supply']
        ],
        [
          ['supplies.update'], // quais metodos queremos validar, qual validator
          ['Supply']
        ]
        /**
         * [ ['projects.outro], ['outroValidator'] ]
         */
      ]
    ))
}).middleware(['auth'])
