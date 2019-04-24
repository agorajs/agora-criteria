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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var interfaces_1 = require("./interfaces");
var edge_length_1 = __importDefault(require("./edge-length"));
exports.EdgeLength = edge_length_1.default;
var global_shape_1 = __importDefault(require("./global-shape"));
exports.GlobalShape = global_shape_1.default;
var node_mouvement_1 = __importDefault(require("./node-mouvement"));
exports.NodeMouvement = node_mouvement_1.default;
var orthogonal_ordering_1 = __importDefault(require("./orthogonal-ordering"));
exports.OrthogonalOrdering = orthogonal_ordering_1.default;
var spread_1 = __importDefault(require("./spread"));
exports.Spread = spread_1.default;
exports.manager = {
    criterias: {},
    add: function () {
        var _this = this;
        var criterias = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            criterias[_i] = arguments[_i];
        }
        lodash_1.default.forEach(criterias, function (c) {
            var name = c.name;
            if (!_this.criterias[name])
                _this.criterias[name] = c;
            else
                console.error('criterias', 'add', name);
        });
    },
    delete: function (name) {
        if (this.criterias[name])
            delete this.criterias[name];
        else
            console.error('criterias', 'delete', name);
    },
    batch: function (initial, updatedGraphs, list) {
        var _this = this;
        if (list === void 0) { list = lodash_1.default.keys(this.criterias); }
        console.group('criterias');
        var results = [];
        lodash_1.default.forEach(list, function (name) {
            results.push(__assign({ name: name }, _this.execute(name, initial, updatedGraphs)));
        });
        console.groupEnd();
        return results;
    },
    execute: function (criteria, initial, updatedGraphs) {
        var _this = this;
        if (typeof criteria === 'string') {
            if (this.criterias[criteria])
                criteria = this.criterias[criteria];
            throw 'Criteria does not exist';
        }
        if (!interfaces_1.isCriteria(criteria))
            throw criteria + ' is not a criterai';
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
        if (typeof criteria === 'string') {
            if (this.criterias[criteria])
                criteria = this.criterias[criteria];
            else
                throw 'criteria ' + criteria + ' was not added';
        }
        if (interfaces_1.isCriteria(criteria))
            return criteria.criteria(initial, updated);
        throw 'reached unreachable code (should not happen though)';
    }
};
exports.default = exports.manager;
