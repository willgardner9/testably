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

Route.group(() => {
  //  **  USERS  **  //
  Route.group(() => {
    Route.get('/', 'UsersController.index').middleware('auth')
    Route.get('/:id', 'UsersController.show').middleware('auth')
    Route.post('/', 'UsersController.store')
    Route.put('/:id', 'UsersController.update').middleware('auth')
    Route.delete('/:id', 'UsersController.destroy').middleware('auth')
  }).prefix('/users')

  //  **  TESTS  **  //
  Route.group(() => {
    Route.get('/', 'TestsController.index')
    Route.get('/:id', 'TestsController.show')
    Route.post('/', 'TestsController.store')
    Route.put('/:id', 'TestsController.update')
    Route.delete('/:id', 'TestsController.destroy')
  })
    .prefix('/tests')
    .middleware('auth')

  //  **  VARIATIONS  **  //
  Route.group(() => {
    Route.get('/', 'VariationsController.index')
    Route.get('/:id', 'VariationsController.show')
    Route.post('/', 'VariationsController.store')
    Route.put('/:id', 'VariationsController.update')
    Route.delete('/:id', 'VariationsController.destroy')
  })
    .prefix('/variations')
    .middleware('auth')

  //  **  SESSIONS  **  //
  Route.group(() => {
    Route.get('/', 'SessionsController.index').middleware('auth')
    Route.get('/:id', 'SessionsController.show').middleware('auth')
    Route.post('/', 'SessionsController.store')
  }).prefix('/sessions')

  //  **  AUTH  **  //
  Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.get('/logout', 'AuthController.logout').middleware('auth')
  }).prefix('/auth')
}).prefix('/api/v1/')
