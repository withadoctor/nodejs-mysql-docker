const express = require('express');
const app = express();
const port = process.env.PORT || 8005;
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/admin', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, function () {
   console.log('Sample mySQL app listening on port ' + port);
});

const knex = require('knex')({
   client: 'mysql2',
   connection: {
      host: process.env.MYSQL_HOST || '127.0.0.1',
      post: process.env.MYSQL_PORT || '3306',
      user: process.env.MYSQL_USER || 'moeuser',
      password: process.env.MYSQL_PASS || 'moepass',
      database: process.env.MYSQL_DB || 'moe_db',
   }
});

function subRoute(params) {
   let log = params.method + ' ' + params.path;
   switch (params.method) {
      case 'POST': app.post(params.path, (req, res) => { console.log(log); params.handler(req, res); }); break;
      case 'PUT': app.put(params.path, (req, res) => { console.log(log); params.handler(req, res); }); break;
      case 'DELETE': app.delete(params.path, (req, res) => { console.log(log); params.handler(req, res); }); break;
      default: app.get(params.path, (req, res) => { console.log(log); params.handler(req, res); }); break;
   }
}

let route = (list) => list.forEach(params => subRoute(params));

route([
   {
      method: "GET",
      path: "/",
      handler: (req, res) => {
         res.sendFile(__dirname + "/public/index.html");
      },
   },
   {
      method: "POST",
      path: "/api/createtable",
      handler: (req, res) => {
         knex.schema.createTable('cars', (table) => {
            table.charset('utf8');
            table.increments('id');
            table.string('name');
            table.integer('price');
         }).then(() => {
            console.log("table created");
            res.status(200).json({response: '생성 성공'});
         }).catch((err) => {
            console.log(err);
            res.status(500).json({response: 'cars table 생성을 실패했습니다.', err});
         })
      },
   },
   {
      method: "POST",
      path: "/api/cars/adds",
      handler: (req, res) => {
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

         knex('cars').insert(cars)
            .then(() => {
               console.log("data inserted");
               res.status(200).json({response: '생성 성공', data: cars});
            })
            .catch((err) => {
               console.log(err);
               res.status(500).json({response: 'cars 추가를 실패했습니다.', err});
            })
      },
   },
   {
      method: "POST",
      path: "/api/cars/add",
      handler: (req, res) => {
         const { body } = req;

         if(!body) {
            res.status(404).json({err: 'not find data'});
            return;
         }

         knex('cars').insert(body)
            .then((r) => {
               console.log("data inserted");
               res.status(200).json({response: '생성 성공', data: body});
            })
            .catch((err) => {
               console.log(err);
               res.status(500).json({response: 'cars 추가를 실패했습니다.', err});
            })
      },
   },
   {
      method: "GET",
      path: "/api/moe/list",
      handler: (req, res) => {
         knex.from('MOE_ITEM_T').select("*")
            .then((rows) => {
               console.log(rows);
               res.status(200).json(rows);
            }).catch((err) => {
               console.log(err);
               res.status(500).send('MOE_ITEM_T을 가져오는데 실패했습니다.');
            })
      },
   },
   {
      method: "GET",
      path: "/api/cars/list",
      handler: (req, res) => {
         knex.from('cars').select("*")
            .then((rows) => {
               console.log(rows);
               res.status(200).json(rows);
            }).catch((err) => {
               console.log(err);
               res.status(500).send('cars을 가져오는데 실패했습니다.');
            })
      },
   },
   // {
   //    method: "GET",
   //    path: "/",
   //    handler: (req, res) => {
   //    },
   // },
])