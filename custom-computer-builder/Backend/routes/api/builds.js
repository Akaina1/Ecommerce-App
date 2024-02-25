const express = require('express');
const router = express.Router();
const Build = require('../../models/Build');
const passport = require('../../middleware/auth');

// @route   POST api/builds/
// @desc    Create a new build
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    // Retrieve prices of the parts from MongoDB
    const partIds = Object.values(req.body.parts);
    const parts = await Product.find({ _id: { $in: partIds } });

    // Calculate the total price based on the retrieved prices
    const totalPrice = parts.reduce((acc, part) => acc + part.price, 0);

    // Update the newBuild object
    const newBuild = new Build({
      user: req.user.id,
      parts: req.body.parts,
      totalPrice: totalPrice // Updated to use calculated total price
    });

    // Save the newBuild object to the database
    const build = await newBuild.save();

    res.json(build);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error', err });
  }
});
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
// @route   GET api/builds/:id
// @desc    Retrieve a saved build
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Build.findById(req.params.id)
    .populate('parts.CPU parts.GPU parts.RAM parts.MOBO parts.SSD parts.HDD parts.PSU parts.CASE parts.COOLING parts.FRONTFANS parts.BACKFANS')
    .then(build => {
      if (!build) {
        return res.status(404).json({ msg: 'Build not found' });
      }

      // Check if the user making the request is the owner of the build
      if (build.user.toString() === req.user.id) {
        res.json(build);
      } else {
        res.status(401).json({ msg: 'Unauthorized' });
      }
    })
    .catch(err => res.status(500).json({ msg: 'Server Error', err }));
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// @route   GET api/builds/user/:userId
// @desc    Retrieve all builds for a specific user
// @access  Private (requires authentication)
router.get('/user/:userId', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Ensure that the user making the request is the owner of the builds
  if (req.user.id !== req.params.userId) {
    return res.status(401).json({ msg: 'Unauthorized' });
  }

  // Find all builds for the specified userId and populate the 'parts' field
  Build.find({ user: req.params.userId })
    .populate('parts.CPU parts.GPU parts.RAM parts.MOBO parts.SSD parts.HDD parts.PSU parts.CASE parts.COOLING parts.FRONTFANS parts.BACKFANS')
    .then((builds) => {
      res.json(builds);
    })
    .catch((err) => {
      console.error('Error fetching user builds:', err);
      res.status(500).json({ msg: 'Server Error' });
    });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// @route PUT api/builds/:id
// @desc Update a build
// @access Private
router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const build = await Build.findById(req.params.id);

    if (!build) {
      return res.status(404).json({ msg: 'Build not found' });
    }

    // Check if the user making the request is the owner of the build
    if (build.user.toString() === req.user.id) {

      // Retrieve prices of the updated parts from MongoDB
      const updatedPartIds = Object.values(req.body.parts);
      const updatedParts = await Product.find({ _id: { $in: updatedPartIds } });

      // Calculate the total price based on the updated part prices
      const updatedTotalPrice = updatedParts.reduce((acc, part) => acc + part.price, 0);

      // Update build fields
      build.parts = req.body.parts;
      build.totalPrice = updatedTotalPrice;

      // Save the updated build
      const updatedBuild = await build.save();

      res.json(updatedBuild);
    } else {
      res.status(401).json({ msg: 'Unauthorized' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error', err });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// @route   DELETE api/builds/:id
// @desc    Delete a saved build
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Build.findById(req.params.id)
    .then(build => {
      if (!build) {
        return res.status(404).json({ msg: 'Build not found' });
      }

      if (build.user.toString() === req.user.id) {
        Build.deleteOne({ _id: req.params.id })
          .then(() => res.json({ msg: 'Build deleted' }))
          .catch(err => res.status(500).json({ msg: 'Server Error', err }));
      } else {
        res.status(401).json({ msg: 'Unauthorized' });
      }
    })
    .catch(err => res.status(500).json({ msg: 'Server Error', err }));
});

module.exports = router;