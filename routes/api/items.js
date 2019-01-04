const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Item Model
const Item = require('../../models/item');

router.get('/welcom', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  });
});

router.post('/postsz', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {


      if (authData.user.username === "brad") {
        res.json({
          message: 'Post created...',
          authData
        });
      }
      else {
        res.json({
          message: 'doesnt have access for admin',
           authData

        });
      }
    }
    });

});

router.post('/posts', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

router.post('/login', (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: 'brad',
    email: 'brad@gmail.com'
  }

  jwt.sign({ user }, 'secretkey', { expiresIn: '1000s' }, (err, token) => {
    res.json({
      token
    });
  });
});


// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}






// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});



// @route   Search api/items/:name
// @access  Public
router.get('/search/:key', (req, res) => {
  // Item.find({name: `${req.params.key}` })
  Item.find({ 'name': { '$regex': req.params.key, '$options': 'i' } })
    .sort({ date: -1 })
    .then(items => res.json(items));

});



// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});

// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});




module.exports = router;