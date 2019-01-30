"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var interfaces_1 = require("./interfaces");
__export(require("./aspect-ratio"));
__export(require("./bounding-box"));
__export(require("./change-ratio"));
__export(require("./change"));
__export(require("./l1-length-hlsg07"));
__export(require("./orthogonal-ordering"));
__export(require("./displacement-gh10"));
__export(require("./edge-ratio-len05"));
__export(require("./scale-change"));
exports.manager = {
    criterias: {},
    add: function (name, f, short) {
        var obj = { name: name, criteria: f };
        if (short) {
            obj.short = short;
        }
        if (!this.criterias[name])
            this.criterias[name] = obj;
        else
            console.error("criterias", "add", "lol");
    },
    delete: function (name) {
        if (this.criterias[name])
            delete this.criterias[name];
        else
            console.error("criterias", "delete", "lol");
    },
    batch: function (initial, updatedGraphs, list) {
        var _this = this;
        if (!list) {
            list = lodash_1.default.map(this.criterias, function (c) {
                return c.name;
            });
        }
        console.group("criterias");
        var results = [];
        lodash_1.default.forEach(list, function (name) {
            results.push(__assign({ name: name }, _this.execute(name, initial, updatedGraphs)));
        });
        console.groupEnd();
        return results;
    },
    execute: function (criteria, initial, updatedGraphs) {
        var _this = this;
        if (typeof criteria === "string") {
            if (this.criterias[criteria])
                criteria = this.criterias[criteria];
            throw "Criteria does not exist";
        }
        if (!interfaces_1.isCriteria(criteria))
            throw criteria + " is not a criterai";
        var results = {};
        console.group(criteria.name);
        var start = new Date();
        lodash_1.default.forEach(updatedGraphs, function (updated, name) {
            results[name] = _this.evaluate(criteria, initial, updated);
        });
        var diff = new Date().getTime() - start.getTime();
        console.groupEnd();
        return { results: results, time: diff };
    },
    evaluate: function (criteria, initial, updated) {
        if (typeof criteria === "string") {
            if (this.criterias[criteria])
                criteria = this.criterias[criteria];
            else
                throw "Criteria not added";
        }
        if (interfaces_1.isCriteria(criteria))
            return criteria.criteria(initial, updated);
        throw "Error while evaluating (should not happen though)";
    }
};
exports.default = exports.manager;
