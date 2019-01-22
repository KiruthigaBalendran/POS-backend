const express    = require('express');
const mysql      = require('mysql');
const bodyParser = require('body-parser');
const cors       = require('cors');

const user	 = require('./routes/userRoute');
const order  = require('./routes/orderRoute');
const menu   = require('./routes/menuRoute');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   res.setHeader('Access-Control-Allow-Credentials', true);
  // res.setHeader('Access-Control-Expose-Headers', 5);

    // Pass to next layer of middleware
    next();
});

app.use('/users',user);
app.use('/orderList',order);
app.use('/menus',menu);

const hostname = '127.0.0.1';
const port = 8080;

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`App listening on port ${port}!`))

