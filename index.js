const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
//CONNECTION
require('./db/connection');

//ROUTER
const userRouter = require('./routes/bookRouter');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Library API",
//             version: "1.0.0",
//             description: "A simple Express Library API",
//         },
//         servers: [{
//             url: "http://localhost:4000",
//         }, ],
//     },
//     apis: ["./routes/*.js", "./models/*.js"],
// };

swaggerDocument = require('./swagger.json');
//const specs = swaggerJsDoc(options);

app.use('/book', userRouter);

app.use('/swagger-doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));


//PORT
const PORT = process.env.PORT || 4000;






app.get('/', (req, res) => {
    res.json({ "message": "WELCOME" });
});



app.listen(PORT, () => {
    console.log(`The Server is Running on port ${PORT}`);
})