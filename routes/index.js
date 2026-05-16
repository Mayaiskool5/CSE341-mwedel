const express = require('express');
const router = express.Router();

router.use('/contacts', require('./contacts'))
router.use('/', require('./swagger'));

// Simple test route to verify routing
router.get('/test', (req, res) => {
	res.status(200).json({ message: 'Test route working!' });
});

module.exports = router;