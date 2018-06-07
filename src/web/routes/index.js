const express = require('express');
const { getAllProviders } = require('../../utils');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const providers = await getAllProviders();
    res.render('index', { 
      title: 'Lunch',
      providers 
    });
  } catch(err) {
    next()
  }
});

router.get('/:restaurant', async (req, res) => {
  try {
    const { restaurant } = req.params;
    const provider = require(`../../providers/${restaurant}`);
    const { result } = await provider();

    res.render('menu', {
      table: Array.isArray(result),
      title: provider.display,
      menu: result
    });
  } catch(err) {
    res.redirect('/');   
  }
});

module.exports = router;
