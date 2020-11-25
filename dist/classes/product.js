"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var Product = /** @class */ (function () {
    function Product(name, barcode, allergens) {
        this.name = name;
        this.barcode = barcode;
        this.allergens = allergens.split(",");
        for (var i = 0; i < this.allergens.length; i++) {
            this.allergens[i] = this.allergens[i].substring(3);
        }
    }
    Product.prototype.addAllergen = function (allergen) {
        this.allergens.push(allergen);
    };
    Product.prototype.removeAllergen = function (allergen) {
        _.remove(this.allergens, function (n) {
            return n == allergen;
        });
    };
    Product.prototype.getAllergens = function () {
        return this.allergens.toString();
    };
    return Product;
}());
exports.Product = Product;
