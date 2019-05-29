import { CriteriaFunction } from './interfaces';
import _ from 'lodash';
import { lambda1 } from './node-movement/moved-nodes';
import { lambda2 } from './orthogonal-ordering/kendall-tau-distance';
import { lambda3 } from './spread/bounding-box/normalized-area';
import { costFunction } from './node-movement/distance-moved/hamiltonian';

/**
 *
 * TODO: HLSG07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @deprecated
 */
export const nHlsg: CriteriaFunction = function(initialGraph, updatedGraph) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  if (initialNodes.length !== updatedNodes.length) {
    console.error(
      'criteria', // family
      'degree-layout-adjustment-HLSG07', // type
      'abording', // action
      'not the same number of nodes' // reason
    );
    throw 'Criteria degree-layout-adjustment-HLSG07 abording : not same number of nodes';
  }

  return {
    value:
      0.25 * lambda1(initialGraph, updatedGraph).value +
      0.25 * lambda2(initialGraph, updatedGraph).value +
      0.25 * lambda3(initialGraph, updatedGraph).value +
      0.25 * costFunction(initialGraph, updatedGraph).value
  };
};
