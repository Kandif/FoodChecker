var _ = require('lodash');

import {Member} from '../classes/member' ;
import {Product} from '../classes/product' ;
import {MemberController} from '../controllers/memberController' ;
import {ProductController} from '../controllers/productController' ;

export class FoodChecker {

    async checkWhatCanEats(res){
        let memberc = new MemberController();
        let productc = new ProductController();

        let members:any = await memberc.getMembers();
        let products:any = await productc.getProducts();

        let result:any = [];

        for(let i=0;i<members.length;i++){
            let member:any = {"name": members[i].name, "can_eat":[]}
            for(let j=0;j<products.length;j++){
                if(_.isEmpty(_.intersection((members[i].allergens.split(",")), (products[j].allergens.split(","))))){
                    let product = {"name":products[j].name, "barcode":products[j].barcode};
                    member["can_eat"].push(product);
                }
            }
            result.push(member);
        }
        res.send(JSON.stringify(result));



    }


}
