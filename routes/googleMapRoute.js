const { getDistanceAndTime } = require('../controllers/googleMapController')

const router = require('express').Router()


router.get('/getDistanceAndTime',getDistanceAndTime)

module.exports = router