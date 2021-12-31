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
var db = require("../models/db");
// This controller will handle all database management
// It will take information from the client, handle in database, 
// and return the necessary data
module.exports = {
    // Insert new idea into db
    addIdea: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idea, error_1, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.query("INSERT INTO ideas(firstName, lastName, email, title, descr, user_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING ideas_id", [req.body.firstName, req.body.lastName, req.body.email, req.body.title, req.body.description, req.body.user_id])];
                    case 1:
                        idea = _a.sent();
                        res.json(idea);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        message = void 0;
                        if (error_1 instanceof Error)
                            message = error_1.message;
                        else
                            message = String(error_1);
                        console.log(message);
                        res.json(message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    // Update idea with stripe id
    updateIdeaStripeID: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idea, error_2, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.query("UPDATE ideas SET stripe_id = $1 WHERE ideas_id = $2", [req.body.stripe_id, req.body.ideas_id])];
                    case 1:
                        idea = _a.sent();
                        res.json(idea);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        message = void 0;
                        if (error_2 instanceof Error)
                            message = error_2.message;
                        else
                            message = String(error_2);
                        console.log(message);
                        res.json(message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    // Get all ideas associated with input search term
    readAll: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var parameter, idea_list, error_3, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        parameter = "%" + req.params.searchTerm + "%";
                        return [4 /*yield*/, db.query("SELECT * FROM ideas WHERE ((LOWER(firstName) LIKE LOWER($1)) OR (LOWER(lastName) LIKE LOWER($1)) OR (LOWER(descr) LIKE LOWER($1)) OR (LOWER(title) LIKE LOWER($1)))", [parameter])];
                    case 1:
                        idea_list = _a.sent();
                        res.json(idea_list);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        message = void 0;
                        if (error_3 instanceof Error)
                            message = error_3.message;
                        else
                            message = String(error_3);
                        console.log(message);
                        res.json(message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    // Get idea associated with idea id
    getStripeId: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idea, error_4, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.query("SELECT * FROM ideas WHERE ideas_id = $1", [req.params.id])];
                    case 1:
                        idea = _a.sent();
                        res.json(idea);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        message = void 0;
                        if (error_4 instanceof Error)
                            message = error_4.message;
                        else
                            message = String(error_4);
                        console.log(message);
                        res.json(message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    // Add new user
    addUser: function (userInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_5, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        console.log(process.env.DATABASE_URL);
                        return [4 /*yield*/, db.query("INSERT INTO users(user_id, firstName, lastName) VALUES($1, $2, $3) ON CONFLICT (user_id) DO NOTHING", [userInfo.user_id, userInfo.firstName, userInfo.lastName])];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 2:
                        error_5 = _a.sent();
                        message = void 0;
                        if (error_5 instanceof Error)
                            message = error_5.message;
                        else
                            message = String(error_5);
                        console.log("Error:" + message);
                        return [2 /*return*/, message];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    // Get all ideas associated with user
    readUserIdeas: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ideas, error_6, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.query("SELECT * FROM ideas WHERE user_id = $1", [req.params.user])];
                    case 1:
                        ideas = _a.sent();
                        res.json(ideas);
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        message = void 0;
                        if (error_6 instanceof Error)
                            message = error_6.message;
                        else
                            message = String(error_6);
                        console.log("Err: " + message);
                        return [2 /*return*/, message];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    // Update idea with a donation amount
    updateIdea: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idea, error_7, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.query("UPDATE ideas SET donations = donations+$1, lastDonated = $1 WHERE ideas_id = $2", [req.body.donation, req.params.id])];
                    case 1:
                        idea = _a.sent();
                        res.json(idea);
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        message = void 0;
                        if (error_7 instanceof Error)
                            message = error_7.message;
                        else
                            message = String(error_7);
                        console.log(message);
                        return [2 /*return*/, message];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    // Delete idea associated with idea id
    deleteIdea: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var ideas, error_8, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.query("DELETE FROM ideas WHERE ideas_id = $1 RETURNING *", [req.params.user])];
                    case 1:
                        ideas = _a.sent();
                        res.json(ideas);
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        message = void 0;
                        if (error_8 instanceof Error)
                            message = error_8.message;
                        else
                            message = String(error_8);
                        console.log(message);
                        return [2 /*return*/, message];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    // Delete last idea
    deleteInvalidIdea: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idea, error_9, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.query("DELETE FROM ideas WHERE ideas_id = (SELECT MAX(ideas_id) FROM ideas)")];
                    case 1:
                        idea = _a.sent();
                        res.json(idea);
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        message = void 0;
                        if (error_9 instanceof Error)
                            message = error_9.message;
                        else
                            message = String(error_9);
                        console.log(message);
                        return [2 /*return*/, message];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    // Delete last made donation
    deleteInvalidDonation: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var idea, error_10, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db.query("UPDATE ideas SET donations = donations-lastDonated WHERE ideas_id = (SELECT MAX(ideas_id) FROM ideas)")];
                    case 1:
                        idea = _a.sent();
                        res.json(idea);
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _a.sent();
                        message = void 0;
                        if (error_10 instanceof Error)
                            message = error_10.message;
                        else
                            message = String(error_10);
                        console.log(message);
                        return [2 /*return*/, message];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
};
