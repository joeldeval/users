const express = require('express')
const router = express.Router()

/** recursos de Usuario API */

const AllCtrl = require('../../controllers/api/user/all');
const CreateCtrl = require('../../controllers/api/user/create');
const UpdateCtrl = require('../../controllers/api/user/update');
const DeleteCtrl = require('../../controllers/api/user/delete');

/** GET user */
router.get('/user', AllCtrl.all);

/** POST user */
router.post('/user', CreateCtrl.validator, CreateCtrl.create);

/** PUT user */
router.put('/user', UpdateCtrl.validator, UpdateCtrl.update);

/** DELETE user */
router.delete('/user/:id', DeleteCtrl.delete);

module.exports = router