
const port = 3000
const host = '127.0.0.1';

//Joi class to define a schema (minimum/maximum of characteres etc)
const Joi = require('joi'); 

const logger = require('./logger')

const express = require('express');
const app = express();
app.use(express.json());
app.use(logger);



const products = [
    {id: 1, productName: 'Laptop Asus', price:  400, category: "PC"},
    {id: 2, productName: 'Iphone 11', price:  1200, category: "Cell Phone"},

]


//GET REQUESTS 

//all products
app.get('/api/products', (req, res) => {

    res.send(products);
});

//using id
app.get('/api/products/:id', (req, res) =>{
    const product = products.find(c => c.id === parseInt(req.params.id));

    if(!product) 
        res.status(404).send('The product with the given ID was not found');

    res.send(product);
    
});

//POST REQUESTS
app.post('/api/products', async (req,res)  =>{
    //validanting the input
    const schema = Joi.object({ productName: Joi.string() .min(3) .required(),
        price: Joi.number() .required(),
        category: Joi.string() .min(2) .required() });
        
    const result = schema.validate(req.body);

    if (result.error){
        //400 bad request
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const product = {
        id: products.length +1,
        productName: req.body.productName,
        price: req.body.price,
        category: req.body.category
    };
    //storing the data in-memory 
    products.push(product);

    res.send(product);
    
})

//DELETE REQUESTS

//deleting all
app.delete('/api/products',(req,res) => {
    products.splice(0,products.length);

    res.send(products);
    
});

//deleting using a specific id
app.delete('/api/products/:id',(req,res) => {
    const product = products.find(c => c.id === parseInt(req.params.id));

    if(!product) 
        res.status(404).send('The product with the given ID was not found');
    
    const index = products.indexOf(product);
    //index is the start and 1 is the end indicating the number of elements in the array to remove from start
    products.splice(index,1);

    res.send(product);
    
});


//Log the information on start-up
app.listen(port, host, function () {
    console.log("Server listening on: " + host + ":" + port);
    console.log("Endpoints: ")  
    console.log(host + ":" + port+"/api/products  method: GET, POST, DELETE" );
  
});