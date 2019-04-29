"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var agora_graph_1 = require("agora-graph");
var utils_1 = require("../utils");
/**
 * TODO: GH10
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
exports.edgeLength = function (initialGraph, updatedGraph, withDelaunay) {
    if (withDelaunay === void 0) { withDelaunay = true; }
    var initialNodes = initialGraph.nodes;
    var updatedNodes = updatedGraph.nodes;
    var initialSorted = lodash_1.default.sortBy(initialNodes, 'index');
    var updatedSorted = lodash_1.default.sortBy(updatedNodes, 'index');
    var r = function (e) {
        var initLength = agora_graph_1.norm(initialSorted[e.source], initialSorted[e.target]);
        var uLenght = agora_graph_1.norm(updatedSorted[e.source], updatedSorted[e.target]);
        return uLenght / initLength;
    };
    var r_prime = function (e) {
        var initLength = agora_graph_1.norm(initialSorted[e.source], initialSorted[e.target]);
        var uLength = agora_graph_1.norm(updatedSorted[e.source], updatedSorted[e.target]);
        return initLength / uLength;
    };
    if (withDelaunay) {
        var delaunayEdges = agora_graph_1.delaunay(initialNodes);
        var delaunayEdgesPrime = agora_graph_1.delaunay(updatedNodes);
        return {
            value: (delta(delaunayEdges, r) + delta(delaunayEdgesPrime, r_prime)) / 2
        };
    }
    return {
        value: (delta(initialGraph.edges, r) + delta(updatedGraph.edges, r_prime)) / 2
    };
};
function delta(edges, r) {
    var meanR = lodash_1.default.meanBy(edges, r);
    return (Math.sqrt(lodash_1.default.sumBy(edges, function (e) { return Math.pow(r(e) - meanR, 2); }) / edges.length) /
        meanR);
}
exports.EdgeRelativeStandardDeviationDelaunayCriteria = utils_1.criteriaWrap({
    criteria: function (initial, updated) { return exports.edgeLength(initial, updated, true); },
    name: 'edge/relative-standard-deviation/delaunay',
    short: 'e_rsd_d'
});
exports.EdgeRelativeStandardDeviationCriteria = utils_1.criteriaWrap({
    criteria: function (initial, updated) { return exports.edgeLength(initial, updated, false); },
    name: 'edge/relative-standard-deviation',
    short: 'e_rsd'
});
exports.default = exports.EdgeRelativeStandardDeviationDelaunayCriteria;
