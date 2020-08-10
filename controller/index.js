const profile = require('../models/profile')

module.exports  = {
    home: (req, res) => {
        res.send({
            mesage: 'Welcome to Profile Page'
        })
    },

getAllData: (req, res) => {
    try {
        if(profile.length > 0) {
            res.send ({
                message: "All Profiles",
                status: 200, 
                data: profile
            })
        } else {
            res.send ({
                message: "Data is empty",
                status: 200, 
                data: profile
            })
        }
    }
    catch(error) {
        res.send ({
            message: 'internal Server Error',
            status: 500
        })
    }
},

getOneData: (req, res) => {
    try {
        const profileData = profile.filter(user => user.id == req.params.id)
        if (profileData.length > 0) {
            res.send ({
                message: 'Get One Profile Data',
                status: 200,
                data: profileData
            })
        }
        else {
            res.send ({
                message: `User with ID: ${req.params.id} is not found.`,
                status: 404
            })
        }
    }
    catch(error) {
        res.send ({
            message: "Internal Server Error",
            status: 500
        })
    }
},

register: (req, res) => {
    try {
        let registeredUser = profile.filter(user => user.email == req.body.email)
        if (registeredUser.length == 0) {
            let newProfile = {
                id: profile.length + 1,
                name: req.body.username,
                email: req.body.email,
                country: req.body.country
            }
            profile.push(newProfile)
            res.send ({
                message: 'Registration successful!',
                status: 201,
                data: newProfile
            })
        } else {
            res.send ({
                message: `${req.body.email} already exists`,
                status: 400
            })
        }
    }
    catch(error) {
        res.send ({
            message: 'Internal Server Error, please try again later',
            status: 500
        })
    }
},

deleteProfile: (req, res) => {
    try {
        let deleteProfileById = profile.findIndex(user => user.id == req.params.id)
        // if(profile.id == req.params.id)
        // if(profile[deleteProfileById].id == req.params.id) {
        //         res.send ({
        //         message: `Profile with ID ${req.params.id} is deleted!`,
        //         status: 201
        // })
        //     }
        profile.splice(deleteProfileById, 1)
        res.send({
            message:`Profile with ID ${req.params.id} is deleted!`,
            status: 201
        })
    }
    catch(error) {
        res.send ({
            message: 'Internal Server Error',
            status: 500
        })
    }
},

edit: (req, res) => {
    try {
        let updateById = profile.findIndex(user => user.id == req.params.id)
        profile.map (data => {
            if(data.id == req.params.id) {
                profile[updateById].username = req.body.username;
                profile[updateById].email = req.body.email;
                profile[updateById].country = req.body.country;
            }
        })
        res.send ({
            message: `Profile with ID ${req.params.id} is updated!`,
            status: 201
        })
    }
    catch(error) {
        res.send ({
            message: 'Internal Server Error',
            status: 500
        })
    }
}
}