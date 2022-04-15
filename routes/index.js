const express = require('express');
const router = express.Router();

/*
** Router for home page
*/

router.get('/', (req, res) => {
    res.send('CoralNodes API is working');
});

module.exports = router;