"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function criteriaWrap(_a) {
    var name = _a.name, criteria = _a.criteria, short = _a.short;
    return {
        name: name,
        short: short,
        criteria: function (initial, updated) {
            if (initial.nodes.length !== updated.nodes.length) {
                //* ignoring console because it's captured by the exception
                /*
               console.error(
                'criteria', // family
                criteria.short, // type
                'abording', // action
                'not the same number of nodes' // reason
              ); */
                throw Error("Criteria " + (short ? short : name) + " abording : not same number of nodes");
            }
            return criteria(initial, updated);
        }
    };
}
exports.criteriaWrap = criteriaWrap;
