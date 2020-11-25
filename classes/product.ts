var _ = require('lodash');

export class Product {

  name: string;
  barcode: string;
  allergens: string[];

  constructor(name:string,barcode:string,allergens:string) {
    this.name=name;
    this.barcode=barcode;
    this.allergens=allergens.split(",");
    for (var i = 0; i < this.allergens.length; i++){
      this.allergens[i]= this.allergens[i].substring(3);
    }
  }

  addAllergen(allergen:string){
    this.allergens.push(allergen);
  }

  removeAllergen(allergen:string){
    _.remove(this.allergens, function(n) {
      return n == allergen;
    });
  }

  getAllergens(){
    return this.allergens.toString();
  }


}
