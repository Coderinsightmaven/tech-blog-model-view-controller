
const router = require('express').Router();

// Import other route files
const homeRoutes = require('./homeRoutes');
const authRoutes = require('./authRoutes');

// Use routes
router.use('/', homeRoutes);
router.use('/auth', authRoutes);

// Export the consolidated routes
module.exports = router;
