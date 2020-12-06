'use strict';
var express = require('express');

var app = express();
var port = process.env.PORT || 8005;

var mysqlHost = process.env.MYSQL_HOST || '127.0.0.1';
var mysqlPort = process.env.MYSQL_PORT || '3306';
var mysqlUser = process.env.MYSQL_USER || 'moeuser';
var mysqlPass = process.env.MYSQL_PASS || 'moepass';
var mysqlDB   = process.env.MYSQL_DB   || 'moe_db';

const options = {
   client: 'mysql2',
   connection: {
      host: mysqlHost,
      post: mysqlPort,
      user: mysqlUser,
      password: mysqlPass,
      database: mysqlDB,
   }
}

const knex = require('knex')(options);

app.get('/create', function(req,res) {
   console.log('get /create');

   knex.schema.createTable('cars', (table) => {
      table.increments('id')
      table.string('name')
      table.integer('price')
   }).then(() => console.log("table created"))
      .catch((err) => {
         console.log(err);
         res.status(500).send('cars을 생성하는데 실패했습니다.');
      })
});

app.get('/add', function(req,res) {
   console.log('get /add');

   const cars = [
      { name: 'Audi', price: 52642 },
      { name: 'Mercedes', price: 57127 },
      { name: 'Skoda', price: 9000 },
      { name: 'Volvo', price: 29000 },
      { name: 'Bentley', price: 350000 },
      { name: 'Citroen', price: 21000 },
      { name: 'Hummer', price: 41400 },
      { name: 'Volkswagen', price: 21600 },
   ]

   knex('cars').insert(cars).then(() => console.log("data inserted"))
      .catch((err) => {
         console.log(err);
         res.status(500).send('cars을 추가하는데 실패했습니다.');
      })

});

app.get('/', function(req,res) {
   console.log('get /');

   // knex.from('cars').select("*")
   //    .then((rows) => {
   //       console.log(rows);
   //       res.status(200).json(rows);
   //    }).catch((err) => {
   //       console.log(err);
   //       res.status(500).send('cars을 가져오는데 실패했습니다.');
   //    })

   knex.from('MOE_ITEM_T').select("*")
      .then((rows) => {
         console.log(rows);
         res.status(200).json(rows);
      }).catch((err) => {
         console.log(err);
         res.status(500).send('MOE_ITEM_T을 가져오는데 실패했습니다.');
      })

   // knex.from('msg').select("*")
   //    .then((rows) => {
   //       console.log(rows);
   //       res.status(200).json(rows);
   //    }).catch((err) => {
   //       console.log(err);
   //       res.status(500).send('msg을 가져오는데 실패했습니다.');
   //    })
});


app.listen(port, function() {
   console.log('Sample mySQL app listening on port ' + port);
});