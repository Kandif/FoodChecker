var _ = require('lodash');
let req = require('request');
import {Member} from '../classes/member' ;
let waterfall = require('async-waterfall');
const config = require("../config.json");
let mysql = require('mysql');


export class MemberController {

    async get(req, res){
        //let requestobj = req.;
        if(req.path.includes("members")){
            let members = await this.getMembers();
            res.send(members);
        }else{
            let members = await this.getMembers(req.params.name);
            res.send(members);
        }
    }

    async post(req, res){    
        let requestobj = req.body;
        let member = new Member(requestobj.name, requestobj.allergens)
        let allergens:any = await this.getListofAllergensFromGlobalFoodApi();
        let validate = member.validateAllegens(allergens);
        if(validate=="ok"){
            let response = await this.saveMember(member);
            if(response){
                res.send(`{"info":"member added"}`);
            }else{
                res.send(`{"error":"member not added"}`);
            }
        }else{
            res.send(`{"error":"invalid allergen - ${validate}"}`);
        }
    }

    async delete(req, res){
        let requestobj = req.params;
        if (requestobj.hasOwnProperty('name')) {
            if(req.path.includes('allergens')){
                let members:any = await this.getMembers(requestobj.name);  
                let member = new Member(members[0].name,members[0].allergens);
                member.removeAllergen(req.body.allergens);
                let response = await this.saveMember(member);
                if(response){
                    res.send(`{"info":"memeber updated"}`);
                }else{
                    res.send(`{"error":"memeber not updated"}`);
                }
            }else{
                await this.removeMember(requestobj.name);
                res.send('{"memeber":"deleted"}');
            }
        }else{
            res.send('{"error":"no memebrs with the given name"}');
        }
    }

    async put(req, res){
        let requestobj = req.body;
        let members:any = await this.getMembers(req.params.name);  
        let member = new Member(members[0].name,members[0].allergens);
        member.addAllergen(requestobj.allergens);   
        console.log(member.getAllergens());   
        let allergens:any = await this.getListofAllergensFromGlobalFoodApi();
        let validate = member.validateAllegens(allergens);
        if(validate=="ok"){
            let response = await this.saveMember(member);
            if(response){
                res.send(`{"info":"memeber updated"}`);
            }else{
                res.send(`{"error":"memeber not updated"}`);
            }
        }else{
            res.send(`{"error":"invalid allergen - ${validate}"}`);
        }
    }

    saveMember(member){
        return new Promise(resolve=>{
            let allergens = member.getAllergens();
            let con = mysql.createConnection({
                host: config.db.host,
                user: config.db.user,
                password: config.db.user,
                database: config.db.dbname
            });

            con.connect(function(err) {
                if (err) throw err;
                con.query(`REPLACE INTO member ( name, allergens) VALUES("${member.name}", "${allergens}");`, function (err, result) {
                    if (err) throw err;
                    resolve(result);    
                });
            });  
        })
    }

    getMembers(param:string =""){
        if(!(param == "")){
            param = `WHERE name = "${param}"`;
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
                con.query(`SELECT name,allergens FROM member ${param}`, function (err, result) {
                    if (err) throw err;
                    resolve(result);    
                });
            });  
        })
    }

    removeMember(name){
        return new Promise(resolve=>{
            let con = mysql.createConnection({
                host: config.db.host,
                user: config.db.user,
                password: config.db.user,
                database: config.db.dbname
              });

              con.connect(function(err) {
                if (err) throw err;
                con.query(`DELETE FROM member WHERE name = "${name}"`, function (err, result) {
                    if (err) throw err;
                    resolve();    
                });
              });  
        })
    }

    getListofAllergensFromGlobalFoodApi(){
        return new Promise((resolve, reject) => {
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

}