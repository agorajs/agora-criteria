"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var agora_graph_1 = require("agora-graph");
// Gasner 2008 (delta_distance)
exports.ratioEdges = function (initial, updated) {
    if (initial.nodes.length !== updated.nodes.length) {
        console.error('criteria', // family
        'ratio-edges', // type
        'abording', // action
        'not the same number of nodes' // reason
        );
        throw "Criteria ratio-edges abording : not same number of nodes";
    }
    var delaunayEdges = agora_graph_1.delaunay(initial.nodes);
    var initialSorted = lodash_1.default.sortBy(initial.nodes, 'index');
    var updatedSorted = lodash_1.default.sortBy(updated.nodes, 'index');
    var r = function (e) {
        var initLenght = agora_graph_1.length(agora_graph_1.vector(initialSorted[e.source], initialSorted[e.target]));
        var updatedLenght = agora_graph_1.length(agora_graph_1.vector(updatedSorted[e.source], updatedSorted[e.target]));
        return updatedLenght / initLenght;
    };
    var meanR = lodash_1.default.meanBy(delaunayEdges, r);
    return {
        value: Math.sqrt(lodash_1.default.sumBy(delaunayEdges, function (e) { return Math.pow(r(e) - meanR, 2); }) / delaunayEdges.length)
            / meanR
    };
};
