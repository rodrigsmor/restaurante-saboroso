var express = require('express');
var menus = require('../inc/menus')
var router = express.Router();
var reservations = require('../inc/reservations')

/* GET home page. */
router.get('/', function(req, res, next) {
  menus.getMenus().then(results => {
    res.render('index', { 
      title: 'Restaurante Saboroso!',
      menus: results,
      isHome: true,
    });
  })
});

router.get('/contacts', function(req, res, next) {
  res.render('contacts', {
    title: 'Contatos - Restaurante Saboroso',
    background: 'images/img_bg_3.jpg',
    heading: 'Diga um oi!'
  });
});

router.get('/menus', function(req, res, next) {
  menus.getMenus().then(results => {
    res.render('menus',  {
      title: 'Menus - Restaurante Saboroso',
      background: 'images/img_bg_1.jpg',
      heading: 'Saboreie nosso menu!',
      menus: results
    });
  })
});

router.get('/reservations', function(req, res, next) {
  reservations.render(req, res);
});

router.post('/reservations', function(req, res, next) {
  if(!req.body.name) {
    reservations.render(req, res, 'Digite o nome!');
  } else if(!req.body.email) {
    reservations.render(req, res, 'Digite um e-mail para contato!');
  } else if(!req.body.people) {
    reservations.render(req, res, 'Selecione a quantidade de pessoas!');
  } else if(!req.body.date) {
    reservations.render(req, res, 'Selecione a data da reserva!');
  } else if(!req.body.time) {
    reservations.render(req, res, 'Selecione a hora da reserva!')
  } else {
    reservations.save(req.body).then(results => {
      req.body = {}
      reservations.render(req, res, null, 'Reserva realizada com sucesso!')
    }).catch(err => {
      reservations.render(req, res, err.message);
    });
  }
});

router.get('/services', function(req, res, next) {

  res.render('services', {
    title: 'Serviços - Restaurante Saboroso',
    background: 'images/img_bg_1.jpg',
    heading: 'É um prazer poder servir!'
  });
});




module.exports = router;
