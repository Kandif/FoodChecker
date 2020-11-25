var _ = require('lodash');

export class Member {

  name: string;
  allergens: string[];

  constructor(name:string,allergens:any) {
    this.name=name;
    if(allergens!="" && allergens !== undefined) this.allergens = (Array.isArray(allergens))? allergens : allergens.split(",");
    else this.allergens=[];
  }

  addAllergen(allergens){
    let new_allergens = (Array.isArray(allergens))? allergens : allergens.split(",");
    for(let i=0;i<new_allergens.length;i++){
      if(!this.allergens.includes(new_allergens[i])) 
        this.allergens.push(new_allergens[i]);
    }
  }

  removeAllergen(allergen:any){
    let new_allergens = (Array.isArray(allergen))? allergen : allergen.split(",");
    for(let i=0;i<new_allergens.length;i++){
      _.remove(this.allergens, function(n) {
        return n == new_allergens[i];
      });
    }
  }

  getAllergens(){
    return this.allergens.toString();
  }

  validateAllegens(truelist:string[]){
    for(let i=0;i<this.allergens.length;i++){
      if(!truelist.includes(this.allergens[i])){
        return this.allergens[i];
      }
    }
    return "ok";
  }

}
