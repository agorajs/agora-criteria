import { CriteriaFunction } from '../../interfaces';
import { normX, normY } from 'agora-graph';
import { criteriaWrap } from '../../utils';

/**
 * TODO: MSTH03
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const phiChange: CriteriaFunction = function(
  initialGraph,
  updatedGraph
) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  let sum = 0;
  for (let u_index = 0; u_index < initialNodes.length; u_index++) {
    const u = initialNodes[u_index];
    const u_prime = updatedNodes[u_index];

    sum += normX(u_prime, u) ** 2 + normY(u_prime, u) ** 2;
  }

  return { value: sum };
};

export const NodeMovementDistanceMovedSquareCriteria = criteriaWrap({
  criteria: phiChange,
  name: 'node-movement/distance-moved/square',
  short: 'nm_dm_s'
});
export default NodeMovementDistanceMovedSquareCriteria;
