const request = require("supertest");

const config = require("./config.json");

const bodyParser = require('body-parser')

const express = require('express');
const app = express();

const urls = ['/members','/member/:name', '/member', '/members/caneat'];

app.use(bodyParser.json()) 

import { FoodChecker } from "./controllers/foodChecker";

import { MemberController } from "./controllers/memberController";
let members = new MemberController();
import { ProductController } from "./controllers/productController";
let products = new ProductController();


//member
app.get(urls, function (req, res) {
    members.get(req,res);
})
app.post(urls, function (req, res) {
    members.post(req,res);
})
app.delete(['/member/:name/allergens','/member/:name'], function (req, res) {
    members.delete(req,res);
})
app.put(['/member/:name/allergens'], function (req, res) {
    members.put(req,res);
})
//member end

app.get("/allergens", async (req, res)=> {
    products.getAllergens(req,res);
})

app.get("/caneat", function (req, res) {
    let fc = new FoodChecker;
    fc.checkWhatCanEats(res);
})

//product
app.get(['/products','/product/:barcode'], async function (req, res) {
    products.get(req,res);
})
app.post('/product', function (req, res) {
    products.post(req,res);
})
app.delete('/product/:barcode', function (req, res) {
    products.delete(req,res);
})
// app.put('/product', function (req, res) {
//     products.put(req,res);
// })
//product end


 let server = app.listen(config.server.port, () => {
    console.log(`Listening on port ${config.server.port} ...`);
 });

 module.exports = server;