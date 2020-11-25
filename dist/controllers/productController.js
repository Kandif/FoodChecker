"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require('lodash');
var req = require('request');
var product_1 = require("../classes/product");
var waterfall = require('async-waterfall');
var config = require("../config.json");
var mysql = require('mysql');
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    ProductController.prototype.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var param, products, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!req.path.includes("products")) return [3 /*break*/, 2];
                        param = req.params.barcode;
                        return [4 /*yield*/, this.getProducts(param)];
                    case 1:
                        products = _a.sent();
                        if (products == "")
                            res.send({
                                "info": "product with given barcode doesnt exist in database"
                            });
                        else
                            res.send(JSON.stringify(products));
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getProducts()];
                    case 3:
                        products = _a.sent();
                        res.send(JSON.stringify(products));
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.getAllergens = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var allergens;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getListofAllergensFromGlobalFoodApi()];
                    case 1:
                        allergens = _a.sent();
                        res.send(allergens);
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.post = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var requestobj, product, added_product, added_products, _i, _a, barcode, product, added;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        requestobj = req.body;
                        if (!requestobj.hasOwnProperty('barcode')) return [3 /*break*/, 10];
                        if (!!Array.isArray(requestobj.barcode)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getProductFromGlobalFoodApi(requestobj.barcode)];
                    case 1:
                        product = _b.sent();
                        return [4 /*yield*/, this.saveProduct(product)];
                    case 2:
                        added_product = _b.sent();
                        if (added_product) {
                            res.send('{"product":"added"}');
                        }
                        else {
                            res.send("{\"info\":\"product already exists\"}");
                        }
                        return [3 /*break*/, 9];
                    case 3:
                        added_products = [];
                        _i = 0, _a = requestobj.barcode;
                        _b.label = 4;
                    case 4:
                        if (!(_i < _a.length)) return [3 /*break*/, 8];
                        barcode = _a[_i];
                        return [4 /*yield*/, this.getProductFromGlobalFoodApi(barcode)];
                    case 5:
                        product = _b.sent();
                        return [4 /*yield*/, this.saveProduct(product)];
                    case 6:
                        added = _b.sent();
                        if (added)
                            added_products.push(product);
                        _b.label = 7;
                    case 7:
                        _i++;
                        return [3 /*break*/, 4];
                    case 8:
                        res.send(JSON.stringify(added_products));
                        _b.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        res.send('{"error":"no barcode"}');
                        _b.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var requestobj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestobj = req.params;
                        if (!requestobj.hasOwnProperty('barcode')) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.removeProduct(requestobj.barcode)];
                    case 1:
                        _a.sent();
                        res.send('{"product":"deleted"}');
                        return [3 /*break*/, 3];
                    case 2:
                        res.send('{"error":"no product with the given barcode"}');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.put = function (req, res) {
        //no need//
    };
    ProductController.prototype.getProductFromGlobalFoodApi = function (barcode) {
        return new Promise(function (resolve) {
            //7622210449283
            var url = "https://world.openfoodfacts.org/api/v0/product/" + barcode + ".json";
            req(url, function (error, response, body) {
                // console.error('error:', error); 
                // console.log('statusCode:', response && response.statusCode); 
                // console.log('body:', body); 
                //console.log(JSON.parse(body));
                var responseobject = JSON.parse(body);
                if (responseobject.status > 0) {
                    var allergens = responseobject.product.allergens;
                    console.log(responseobject.product.product_name);
                    var prodcut = new product_1.Product(responseobject.product.product_name, barcode, allergens);
                    resolve(prodcut);
                }
                else {
                    resolve("no-product");
                }
            });
        });
    };
    ProductController.prototype.getListofAllergensFromGlobalFoodApi = function () {
        return new Promise(function (resolve, reject) {
            //7622210449283
            var url = "https://world.openfoodfacts.org/data/taxonomies/allergens.json";
            req(url, function (error, response, body) {
                if (error) {
                    reject("{\"error\": \"" + error + "}\"");
                }
                var allergens = [];
                var listallergens = JSON.parse(body);
                for (var key in listallergens) {
                    allergens.push(key.substr(3));
                }
                resolve(allergens);
            });
        });
    };
    ProductController.prototype.getProducts = function (param) {
        if (param === void 0) { param = ""; }
        if (!(param == "")) {
            param = "WHERE barcode = " + param;
        }
        return new Promise(function (resolve) {
            var con = mysql.createConnection({
                host: config.db.host,
                user: config.db.user,
                password: config.db.user,
                database: config.db.dbname
            });
            con.connect(function (err) {
                if (err)
                    throw err;
                con.query("SELECT name,barcode,allergens FROM product " + param, function (err, result) {
                    if (err)
                        throw err;
                    resolve(result);
                });
            });
        });
    };
    ProductController.prototype.saveProduct = function (product) {
        return new Promise(function (resolve) {
            var con = mysql.createConnection({
                host: config.db.host,
                user: config.db.user,
                password: config.db.user,
                database: config.db.dbname
            });
            con.connect(function (err) {
                if (err)
                    throw err;
                con.query("INSERT INTO product (name, barcode, allergens)\n                SELECT * FROM (SELECT '" + product.name + "' AS name, '" + product.barcode + "' AS barcode,'" + product.getAllergens() + "' AS allergens) AS tmp\n                WHERE NOT EXISTS (\n                    SELECT barcode FROM product WHERE barcode = '" + product.barcode + "'\n                ) LIMIT 1;", function (err, result) {
                    if (err)
                        throw err;
                    resolve(result.affectedRows);
                });
            });
        });
    };
    ProductController.prototype.removeProduct = function (barcode) {
        return new Promise(function (resolve) {
            var con = mysql.createConnection({
                host: config.db.host,
                user: config.db.user,
                password: config.db.user,
                database: config.db.dbname
            });
            con.connect(function (err) {
                if (err)
                    throw err;
                con.query("DELETE FROM product WHERE barcode = " + barcode, function (err, result) {
                    if (err)
                        throw err;
                    resolve();
                });
            });
        });
    };
    return ProductController;
}());
exports.ProductController = ProductController;
