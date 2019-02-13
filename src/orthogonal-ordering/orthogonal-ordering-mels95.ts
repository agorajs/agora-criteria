import { CriteriaFunction, Criteria } from "../interfaces";

export const orthogonalOrderingMels: CriteriaFunction = function(
  initialGraph,
  updatedGraph
) {
  if (initialGraph.nodes.length !== updatedGraph.nodes.length) {
    console.error(
      "criteria", // family
      "orthogonal-ordering-MELS95", // type
      "abording", // action
      "not the same number of nodes" // reason
    );
    throw "Criteria orthogonal-ordering abording : not same number of nodes";
  }

  for (let u_index = 0; u_index < initialGraph.nodes.length; u_index++) {
    const u = initialGraph.nodes[u_index];
    const u_prime = updatedGraph.nodes[u_index];

    for (let v_index = 0; v_index < initialGraph.nodes.length; v_index++) {
      const v = initialGraph.nodes[v_index];
      const v_prime = updatedGraph.nodes[v_index];

      if (
        u.x < v.x !== u_prime.x < v_prime.x ||
        u.y < v.y !== u_prime.y < v_prime.y ||
        (u.x === v.x) !== (u_prime.x === v_prime.x) ||
        (u.y === v.y) !== (u_prime.y === v_prime.y)
      )
        return { value: 0 };
    }
  }
  return { value: 1 };
};

export const OrthogonalOrderingCriteria: Criteria = {
  criteria: orthogonalOrderingMels,
  name: "orthogonal-ordering",
  short: "oo"
};

export default OrthogonalOrderingCriteria;
