import { CriteriaFunction, Criteria } from "../interfaces";

/**
 * TODO: HLGS07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const lambda1Hlsg: CriteriaFunction = function(
  initialGraph,
  updatedGraph
) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  const n = initialNodes.length;
  if (initialNodes.length !== updatedNodes.length) {
    console.error(
      "criteria", // family
      "lambda-1-HLGS07", // type
      "abording", // action
      "not the same number of nodes" // reason
    );
    throw "Criteria lambda-1-HLGS07 abording : not same number of nodes";
  }

  let nb = 0;
  for (let u_index = 0; u_index < initialNodes.length; u_index++) {
    const u = initialNodes[u_index];
    const u_prime = updatedNodes[u_index];

    if (u.x !== u_prime.x || u.y !== u_prime.y) nb++;
  }

  return { value: nb / n };
};

export const NodeMouvementMovedNodesCriteria: Criteria = {
  criteria: lambda1Hlsg,
  name: "node-mouvement/moved-nodes",
  short: "nm_mn"
};
export default NodeMouvementMovedNodesCriteria;
