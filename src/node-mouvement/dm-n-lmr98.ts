import { CriteriaFunction, Criteria } from '../interfaces';
import { right, left, bottom, top, norm } from 'agora-graph';
import { criteriaWrap } from '../utils';

/**
 * TODO: LMR98
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const aspectRatioLmr: CriteriaFunction = function(
  initialGraph,
  updatedGraph
) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  const n = initialNodes.length;

  let sum = 0;
  for (let u_index = 0; u_index < initialNodes.length; u_index++) {
    const u = initialNodes[u_index];
    const u_prime = updatedNodes[u_index];

    sum += norm(u_prime, u);
  }

  const w = right(right(initialNodes)) - left(left(initialNodes));
  const h = bottom(bottom(initialNodes)) - top(top(initialNodes));
  const wp = right(right(updatedNodes)) - left(left(updatedNodes));
  const hp = bottom(bottom(updatedNodes)) - top(top(updatedNodes));

  const k = Math.max(w, h, wp, hp);

  return { value: sum / (k * Math.SQRT2 * n) };
};

export const NodeMouvementDistanceMovedNormalizedCriteria = criteriaWrap({
  criteria: aspectRatioLmr,
  name: 'node-mouvement/distance-moved-normalized',
  short: 'nm_dm_n'
});
export default NodeMouvementDistanceMovedNormalizedCriteria;
