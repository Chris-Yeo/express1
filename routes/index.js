const route = require('express').Router()

const {
    home,
    getAllData,
    getOneData,
    register,
    edit,
    deleteProfile
} =require('../controller/index')

route.get('/', home)
route.get('/profile', getAllData)
route.get('/profile/:id', getOneData)
route.post('/profile/register', register)
route.put('/profile/:id', edit)
route.delete('/profile/:id', deleteProfile)

module.exports = route;
