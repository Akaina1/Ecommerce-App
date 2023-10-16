const express = require('express');
const router = express.Router();
const Build = require('../../models/Build');
const passport = require('../../middleware/auth');

// @route   POST api/builds/
// @desc    Create a new build
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const newBuild = new Build({
      user: req.user.id, // Passport will populate req.user
      parts: req.body.parts,
      totalPrice: req.body.totalPrice
    });
  
    newBuild.save()
      .then(build => res.json(build))
      .catch(err => res.status(500).json({ msg: 'Server Error', err }));
  });
  
  // @route   GET api/builds/:id
  // @desc    Retrieve a saved build
  // @access  Private
  router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Build.findById(req.params.id)
      .then(build => {
        if (build.user.toString() === req.user.id) {
          res.json(build);
        } else {
          res.status(401).json({ msg: 'Unauthorized' });
        }
      })
      .catch(err => res.status(500).json({ msg: 'Server Error', err }));
  });
  
  // @route   DELETE api/builds/:id
  // @desc    Delete a saved build
  // @access  Private
  router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Build.findById(req.params.id)
      .then(build => {
        if (build.user.toString() === req.user.id) {
          build.remove().then(() => res.json({ msg: 'Build deleted' }));
        } else {
          res.status(401).json({ msg: 'Unauthorized' });
        }
      })
      .catch(err => res.status(500).json({ msg: 'Server Error', err }));
  });
  
  module.exports = router;