"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var Member = /** @class */ (function () {
    function Member(name, allergens) {
        this.name = name;
        if (allergens != "" && allergens !== undefined)
            this.allergens = (Array.isArray(allergens)) ? allergens : allergens.split(",");
        else
            this.allergens = [];
    }
    Member.prototype.addAllergen = function (allergens) {
        var new_allergens = (Array.isArray(allergens)) ? allergens : allergens.split(",");
        for (var i = 0; i < new_allergens.length; i++) {
            if (!this.allergens.includes(new_allergens[i]))
                this.allergens.push(new_allergens[i]);
        }
    };
    Member.prototype.removeAllergen = function (allergen) {
        var new_allergens = (Array.isArray(allergen)) ? allergen : allergen.split(",");
        var _loop_1 = function (i) {
            _.remove(this_1.allergens, function (n) {
                return n == new_allergens[i];
            });
        };
        var this_1 = this;
        for (var i = 0; i < new_allergens.length; i++) {
            _loop_1(i);
        }
    };
    Member.prototype.getAllergens = function () {
        return this.allergens.toString();
    };
    Member.prototype.validateAllegens = function (truelist) {
        for (var i = 0; i < this.allergens.length; i++) {
            if (!truelist.includes(this.allergens[i])) {
                return this.allergens[i];
            }
        }
        return "ok";
    };
    return Member;
}());
exports.Member = Member;
