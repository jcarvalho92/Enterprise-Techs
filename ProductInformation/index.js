
//Joi class to define a schema (minimum/maximum of characteres etc)
const Joi = require('joi'); //Pascal name convention for classes

const express = require('express');
const app = express();

//adding a piece of midleware 
app.use(express.json());

//testing using an array
const products = [
    {id: 1, productName: 'a', price:  100, category: "test"},
    {id: 2, productName: 'b', price:  200, category: "test"},
    {id: 3, productName: 'c', price:  300, category: "test"},
]

//defining the route
//GET REQUESTS 
app.get('/api/products', (req, res) => {
    res.send(products);
});

app.get('/api/products/:id', (req, res) =>{
    const product = products.find(c => c.id === parseInt(req.params.id));

    if(!product) 
        res.status(404).send('The product with the given ID was not found');
    res.send(product);
});

//POST REQUESTS
app.post('/api/products', (req,res) =>{
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
    products.push(product);
    //return in the body
    res.send(product);
})

//DELETE REQUESTS
app.delete('/api/products/:id',(req,res) => {
    const product = products.find(c => c.id === parseInt(req.params.id));

    if(!product) 
        res.status(404).send('The product with the given ID was not found');
    

    const index = products.indexOf(product);
    products.splice(index,1);
    res.send(product);
});

const port = 3000
app.listen(port,() => console.log(`Listening on port ${port}...`)); //Log the information on start-up

