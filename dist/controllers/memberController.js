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
var member_1 = require("../classes/member");
var waterfall = require('async-waterfall');
var config = require("../config.json");
var mysql = require('mysql');
var MemberController = /** @class */ (function () {
    function MemberController() {
    }
    MemberController.prototype.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var members, members;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.path.includes("members")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getMembers()];
                    case 1:
                        members = _a.sent();
                        res.send(members);
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.getMembers(req.params.name)];
                    case 3:
                        members = _a.sent();
                        res.send(members);
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MemberController.prototype.post = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var requestobj, member, allergens, validate, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestobj = req.body;
                        member = new member_1.Member(requestobj.name, requestobj.allergens);
                        return [4 /*yield*/, this.getListofAllergensFromGlobalFoodApi()];
                    case 1:
                        allergens = _a.sent();
                        validate = member.validateAllegens(allergens);
                        if (!(validate == "ok")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.saveMember(member)];
                    case 2:
                        response = _a.sent();
                        if (response) {
                            res.send("{\"info\":\"member added\"}");
                        }
                        else {
                            res.send("{\"error\":\"member not added\"}");
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        res.send("{\"error\":\"invalid allergen - " + validate + "\"}");
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MemberController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var requestobj, members, member, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestobj = req.params;
                        if (!requestobj.hasOwnProperty('name')) return [3 /*break*/, 6];
                        if (!req.path.includes('allergens')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getMembers(requestobj.name)];
                    case 1:
                        members = _a.sent();
                        member = new member_1.Member(members[0].name, members[0].allergens);
                        member.removeAllergen(req.body.allergens);
                        return [4 /*yield*/, this.saveMember(member)];
                    case 2:
                        response = _a.sent();
                        if (response) {
                            res.send("{\"info\":\"memeber updated\"}");
                        }
                        else {
                            res.send("{\"error\":\"memeber not updated\"}");
                        }
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.removeMember(requestobj.name)];
                    case 4:
                        _a.sent();
                        res.send('{"memeber":"deleted"}');
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        res.send('{"error":"no memebrs with the given name"}');
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    MemberController.prototype.put = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var requestobj, members, member, allergens, validate, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestobj = req.body;
                        return [4 /*yield*/, this.getMembers(req.params.name)];
                    case 1:
                        members = _a.sent();
                        member = new member_1.Member(members[0].name, members[0].allergens);
                        member.addAllergen(requestobj.allergens);
                        console.log(member.getAllergens());
                        return [4 /*yield*/, this.getListofAllergensFromGlobalFoodApi()];
                    case 2:
                        allergens = _a.sent();
                        validate = member.validateAllegens(allergens);
                        if (!(validate == "ok")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.saveMember(member)];
                    case 3:
                        response = _a.sent();
                        if (response) {
                            res.send("{\"info\":\"memeber updated\"}");
                        }
                        else {
                            res.send("{\"error\":\"memeber not updated\"}");
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        res.send("{\"error\":\"invalid allergen - " + validate + "\"}");
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MemberController.prototype.saveMember = function (member) {
        return new Promise(function (resolve) {
            var allergens = member.getAllergens();
            var con = mysql.createConnection({
                host: config.db.host,
                user: config.db.user,
                password: config.db.user,
                database: config.db.dbname
            });
            con.connect(function (err) {
                if (err)
                    throw err;
                con.query("REPLACE INTO member ( name, allergens) VALUES(\"" + member.name + "\", \"" + allergens + "\");", function (err, result) {
                    if (err)
                        throw err;
                    resolve(result);
                });
            });
        });
    };
    MemberController.prototype.getMembers = function (param) {
        if (param === void 0) { param = ""; }
        if (!(param == "")) {
            param = "WHERE name = \"" + param + "\"";
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
                con.query("SELECT name,allergens FROM member " + param, function (err, result) {
                    if (err)
                        throw err;
                    resolve(result);
                });
            });
        });
    };
    MemberController.prototype.removeMember = function (name) {
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
                con.query("DELETE FROM member WHERE name = \"" + name + "\"", function (err, result) {
                    if (err)
                        throw err;
                    resolve();
                });
            });
        });
    };
    MemberController.prototype.getListofAllergensFromGlobalFoodApi = function () {
        return new Promise(function (resolve, reject) {
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
    return MemberController;
}());
exports.MemberController = MemberController;
