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

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.group(() => {
  //  **  USERS  **  //
  Route.group(() => {
    Route.get('/', 'UsersController.index')
    Route.get('/:id', 'UsersController.show')
    Route.post('/', 'UsersController.store')
    Route.put('/:id', 'UsersController.update')
    Route.delete('/:id', 'UsersController.destroy')
  }).prefix('/users')

  Route.group(() => {
    Route.get('/', 'TestsController.index')
    Route.get('/:id', 'TestsController.show')
    Route.post('/', 'TestsController.store')
    Route.put('/:id', 'TestsController.update')
    Route.delete('/:id', 'TestsController.destroy')
  }).prefix('/tests')

  //  **  OTHER ROUTES  **  //
}).prefix('/api/v1/')
