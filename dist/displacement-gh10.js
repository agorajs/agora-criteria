"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var mathjs_1 = __importDefault(require("mathjs"));
/**
 * TODO: https://gitlab.com/graphviz/graphviz/blob/master/lib/sfdpgen/layout_similarity.c
 * TODO: https://github.com/prlz77/prlz77.cvtools/blob/master/procrustes_align.py
 * TODO: GH10
 *
 * https://stackoverflow.com/a/18927641
 * TODO : this is onhold because of procrutes and svd
 * @param initial
 * @param updated
 */
exports.displacementGh = function (initial, updated) {
    if (initial.nodes.length !== updated.nodes.length) {
        console.error("criteria", // family
        "displacement-GH10", // type
        "abording", // action
        "not the same number of nodes" // reason
        );
        throw "Criteria displacement-GH10 abording : not same number of nodes";
    }
    initial.nodes.sort(function (a, b) { return a.index - b.index; });
    updated.nodes.sort(function (a, b) { return a.index - b.index; });
    var meanX_0 = {
        x: lodash_1.default.meanBy(initial.nodes, "x"),
        y: lodash_1.default.meanBy(initial.nodes, "y")
    };
    var meanX = {
        x: lodash_1.default.meanBy(updated.nodes, "x"),
        y: lodash_1.default.meanBy(updated.nodes, "y")
    };
    var X_0T = lodash_1.default.map(initial.nodes, function (n) { return [n.x - meanX_0.x, n.y - meanX_0.y]; });
    var X_0 = mathjs_1.default.transpose(X_0T);
    var XT = lodash_1.default.map(updated.nodes, function (n) { return [n.x - meanX.x, n.y - meanX.y]; });
    var X = mathjs_1.default.transpose(XT);
    // console.log(normalement c'est ca :/)
    var answer = mathjs_1.default.trace(mathjs_1.default.multiply(X_0, X_0T)) -
        Math.pow(mathjs_1.default.trace(mathjs_1.default
            .chain(XT)
            .multiply(X_0)
            .multiply(X_0T)
            .multiply(X)
            .sqrt()
            .done()), 2) *
            mathjs_1.default.trace(mathjs_1.default.multiply(XT, X));
    return { value: answer };
};
