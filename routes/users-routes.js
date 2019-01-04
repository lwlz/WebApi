let express = require('express');
let router = express.Router();
let controller = require('../controllers/users-controller');

// router.get('/', controller.getAllUsers);
router.route('/')
.get(controller.getAllUsers)
.post(controller.createUser);

router.route('/:id')
      .get(controller.getUsersById)





module.exports = router;