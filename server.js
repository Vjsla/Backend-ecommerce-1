const express = require('express');
const cors = require('cors');
const { urlencoded } = require('body-parser');

const app = express();

let corOptions = {
    origin: 'http://localhost:8081',
    optionsSuccessStatus: 200
};

//middlewares

app.use(cors(corOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({message : 'hello from api'});
});


// router
const router = require('./routes/productRouter.js');
app.use('/users', router);


// port
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is connected || running on port ${PORT}`);
});