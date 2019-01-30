import { CriteriaFunction, Criteria } from "../interfaces";

/**
 * TODO: SSS*12
 * Evaluates the updatedGraph using the orthogonal ordering criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const orthogonalOrderingSss: CriteriaFunction = function(
  initialGraph,
  updatedGraph
) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  if (initialNodes.length !== updatedNodes.length) {
    console.error(
      "criteria", // family
      "orthogonal-ordering-SSS*12", // type
      "abording", // action
      "not the same number of nodes" // reason
    );
    throw "Criteria orthogonal-ordering abording : not same number of nodes";
  }
  let sum = 0;

  for (let u_index = 0; u_index < initialNodes.length; u_index++) {
    const u = initialNodes[u_index];
    const u_prime = updatedNodes[u_index];
    for (let v_index = 0; v_index < initialNodes.length; v_index++) {
      const v = initialNodes[v_index];
      const v_prime = updatedNodes[u_index];

      if (u.x > v.x && u_prime.x < v_prime.x) sum++;
      if (u.y > v.y && u_prime.y < v_prime.y) sum++;
    }
  }

  return { value: sum };
};

export const OrthogonalOrderingNumberInversionsCriteria: Criteria = {
  criteria: orthogonalOrderingSss,
  name: "orthogonal-ordering/number-of-inversions",
  short: "oo_ni"
};
export default OrthogonalOrderingNumberInversionsCriteria;
