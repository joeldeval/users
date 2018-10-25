const express = require('express')
const router = express.Router()

const AuthCtrl = require('../../controllers/api/auth')

/** POST auth */
router.post('/authenticate', AuthCtrl.authenticate);

module.exports = router