import { CriteriaFunction } from '../interfaces';
import { criteriaWrap } from '../utils';

/**
 * TODO: HLGS07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const lambda1: CriteriaFunction = function(initialGraph, updatedGraph) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  const n = initialNodes.length;

  let nb = 0;
  for (let u_index = 0; u_index < initialNodes.length; u_index++) {
    const u = initialNodes[u_index];
    const u_prime = updatedNodes[u_index];

    if (u.x !== u_prime.x || u.y !== u_prime.y) nb++;
  }

  return { value: nb / n };
};

export const NodeMovementMovedNodesCriteria = criteriaWrap({
  criteria: lambda1,
  name: 'node-movement/moved-nodes',
  short: 'nm_mn'
});
export default NodeMovementMovedNodesCriteria;
