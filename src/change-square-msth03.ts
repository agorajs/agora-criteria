import { CriteriaFunction } from "./interfaces";
import { normX, normY } from "agora-graph";

/**
 * TODO: MSTH03
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const changeSquareMsth: CriteriaFunction = function(
  initialGraph,
  updatedGraph
) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  if (initialNodes.length !== updatedNodes.length) {
    console.error(
      "criteria", // family
      "change-square-MSTH03", // type
      "abording", // action
      "not the same number of nodes" // reason
    );
    throw "Criteria change-square-MSTH03 abording : not same number of nodes";
  }

  let sum = 0;
  for (let u_index = 0; u_index < initialNodes.length; u_index++) {
    const u = initialNodes[u_index];
    const u_prime = updatedNodes[u_index];

    sum += normX(u_prime, u) ** 2 + normY(u_prime, u) ** 2;
  }

  return { value: sum };
};
