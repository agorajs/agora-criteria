import { CriteriaFunction } from '../interfaces';
import { Node, top, left } from 'agora-graph';
import { criteriaWrap } from '../utils';

/**
 * TODO: HLGS 07
 * Evaluates the updatedGraph using the orthogonal ordering criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const lambda2: CriteriaFunction = function(initialGraph, updatedGraph) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  const n = initialNodes.length;

  let sum = 0;
  for (let u_index = 0; u_index < initialNodes.length; u_index++) {
    const u = initialNodes[u_index];
    const u_prime = updatedNodes[u_index];
    for (let v_index = 0; v_index < initialNodes.length; v_index++) {
      const v = initialNodes[v_index];
      const v_prime = updatedNodes[v_index];
      if (iv(u, v, u_prime, v_prime)) sum++;
    }
  }
  return { value: sum / (n * (n - 1)) };
};

function iv(u: Node, v: Node, u_prime: Node, v_prime: Node): boolean {
  return (
    (left(u) > left(v) && left(u_prime) < left(v_prime)) ||
    (left(u) < left(v) && left(u_prime) > left(v_prime)) ||
    (top(u) > top(v) && top(u_prime) < top(v_prime)) ||
    (top(u) < top(v) && top(u_prime) > top(v_prime))
  );
}

export const OrthogonalOrderingKendallTauDistanceCriteria = criteriaWrap({
  criteria: lambda2,
  name: 'orthogonal-ordering/kendall-tau-distance',
  short: 'oo_ktd'
});
export default OrthogonalOrderingKendallTauDistanceCriteria;
