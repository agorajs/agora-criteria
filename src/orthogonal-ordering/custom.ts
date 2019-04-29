import { CriteriaFunction, Criteria } from '../interfaces';

/**
 * TODO: CHANGE
 * CUSTOM ?
 * Evaluates the updatedGraph using the orthogonal ordering criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const orthogonalOrdering: CriteriaFunction = function(
  initialGraph,
  updatedGraph
) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  if (initialNodes.length !== updatedNodes.length) {
    console.error(
      'criteria', // family
      'orthogonal-ordering', // type
      'abording', // action
      'not the same number of nodes' // reason
    );
    throw 'Criteria orthogonal-ordering abording : not same number of nodes';
  }

  const nodesLength = initialNodes.length;

  let counter = 0;

  for (let origin = 0; origin < nodesLength; origin++) {
    for (let dest = origin + 1; dest < nodesLength; dest++) {
      const initNodeOrigin = initialNodes[origin];
      const initNodeDest = initialNodes[dest];

      const upNodeOrigin = updatedNodes[origin];
      const upNodeDest = updatedNodes[dest];

      if (
        Math.sign(initNodeDest.x - initNodeOrigin.x) ===
          Math.sign(upNodeDest.x - upNodeOrigin.x) &&
        Math.sign(initNodeDest.y - initNodeOrigin.y) ===
          Math.sign(upNodeDest.y - upNodeOrigin.y)
      ) {
        counter++;
      }
    }
  }

  return { value: counter / ((nodesLength * (nodesLength - 1)) / 2) };
};

export const OrthogonalOrderingCustomCriteria: Criteria = {
  criteria: orthogonalOrdering,
  name: 'orthogonal-ordering/custom',
  short: 'oo_c'
};
export default OrthogonalOrderingCustomCriteria;
