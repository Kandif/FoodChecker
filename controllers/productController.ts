let _ = require('lodash');
let req = require('request');
import {Product} from '../classes/product' ;
let waterfall = require('async-waterfall');
const config = require("../config.json");
let mysql = require('mysql');

export class ProductController {

    async get(req, res){
        if(!req.path.includes("products")){
            let param = req.params.barcode;
            let products = await this.getProducts(param);
            if(products=="") res.send({
                "info":"product with given barcode doesnt exist in database"
            });
            else res.send(JSON.stringify(products));
        }else{
            let products = await this.getProducts();
            res.send(JSON.stringify(products));
        }
        
        
    }

    async getAllergens(req,res){
        // alergen = req.body.alergen;
        let allergens:any = await this.getListofAllergensFromGlobalFoodApi();
        res.send(allergens);
    }

    async post(req, res){
        let requestobj = req.body;
        if (requestobj.hasOwnProperty('barcode')) {
            if(!Array.isArray(requestobj.barcode)){
                let product = await this.getProductFromGlobalFoodApi(requestobj.barcode)
                let added_product = await this.saveProduct(product);
                if(added_product){
                    res.send('{"product":"added"}'); 
                }else{
                    res.send(`{"info":"product already exists"}`);
                }
                //res.send(product);
            }else{
                let added_products:any = [];
                for (const barcode of requestobj.barcode) {
                    let product = await this.getProductFromGlobalFoodApi(barcode);
                    let added = await this.saveProduct(product);  
                    if(added) added_products.push(product);          
                }
                res.send(JSON.stringify(added_products));
            }
        }else{
            res.send('{"error":"no barcode"}');
        }
    }

    async delete(req, res){
        let requestobj = req.params;
        if (requestobj.hasOwnProperty('barcode')) {
            await this.removeProduct(requestobj.barcode);
            res.send('{"product":"deleted"}');
        }else{
            res.send('{"error":"no product with the given barcode"}');
        }
    }

    put(req, res){
        //no need//
    }

    getProductFromGlobalFoodApi(barcode:string){
        return new Promise(resolve => {
        //7622210449283
        let url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
            req(url, function (error, response, body) {
            // console.error('error:', error); 
            // console.log('statusCode:', response && response.statusCode); 
            // console.log('body:', body); 
            //console.log(JSON.parse(body));
            let responseobject = JSON.parse(body);
            if(responseobject.status>0){
                let allergens = responseobject.product.allergens;
                console.log(responseobject.product.product_name);
                let prodcut = new Product(responseobject.product.product_name,barcode,allergens);
                resolve(prodcut);
            }else{
                resolve("no-product");
            }
        })
        });
    }

    getListofAllergensFromGlobalFoodApi(){
        return new Promise((resolve,reject) => {
            //7622210449283
            let url = `https://world.openfoodfacts.org/data/taxonomies/allergens.json`;
                req(url, function (error, response, body) {
                    if(error){
                        reject(`{"error": "${error}}"`);
                    }
                    let allergens:string[]=[];
                    let listallergens = JSON.parse(body);
                    for(var key in listallergens){
                        allergens.push(key.substr(3))
                    }
                    resolve(allergens);
                })
        });
    }

    getProducts(param:string = ""){
        if(!(param == "")){
            param = `WHERE barcode = ${param}`;
        }
        return new Promise(resolve=>{
            let con = mysql.createConnection({
                host: config.db.host,
                user: config.db.user,
                password: config.db.user,
                database: config.db.dbname
              });

              con.connect(function(err) {
                if (err) throw err;
                con.query(`SELECT name,barcode,allergens FROM product ${param}`, function (err, result) {
                    if (err) throw err;
                    resolve(result);    
                });
              });  
        })
    }


    saveProduct(product){
        return new Promise(resolve=>{
            let con = mysql.createConnection({
                host: config.db.host,
                user: config.db.user,
                password: config.db.user,
                database: config.db.dbname
              });

              con.connect(function(err) {
                if (err) throw err;
                con.query(`INSERT INTO product (name, barcode, allergens)
                SELECT * FROM (SELECT '${product.name}' AS name, '${product.barcode}' AS barcode,'${product.getAllergens()}' AS allergens) AS tmp
                WHERE NOT EXISTS (
                    SELECT barcode FROM product WHERE barcode = '${product.barcode}'
                ) LIMIT 1;`, function (err, result) {
                    if (err) throw err;
                    resolve(result.affectedRows);    
                });
              });  
        })
    }

    removeProduct(barcode){
        return new Promise(resolve=>{
            let con = mysql.createConnection({
                host: config.db.host,
                user: config.db.user,
                password: config.db.user,
                database: config.db.dbname
              });

              con.connect(function(err) {
                if (err) throw err;
                con.query(`DELETE FROM product WHERE barcode = ${barcode}`, function (err, result) {
                    if (err) throw err;
                    resolve();    
                });
              });  
        })
    }
}
