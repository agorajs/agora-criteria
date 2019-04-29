import { CriteriaFunction } from '../interfaces';
import _ from 'lodash';
import { lambda1Hlsg } from './lambda-1-hlsg07';
import { orthogonalOrderingHlgs } from '../orthogonal-ordering/lambda-2-hlsg07';
import { AreaNormalized } from '../spread/area-hlsg07';
import { changeHl } from './change-hl03';

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
      0.25 * lambda1Hlsg(initialGraph, updatedGraph).value +
      0.25 * orthogonalOrderingHlgs(initialGraph, updatedGraph).value +
      0.25 * AreaNormalized(initialGraph, updatedGraph).value +
      0.25 * changeHl(initialGraph, updatedGraph).value
  };
};
