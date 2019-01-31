import { CriteriaFunction, Criteria } from "../interfaces";
import { normX, normY } from "agora-graph";

/**
 * TODO: HL03, HLSG07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */
export const changeHl: CriteriaFunction = function(initialGraph, updatedGraph) {
  const initialNodes = initialGraph.nodes;
  const updatedNodes = updatedGraph.nodes;

  const n = initialNodes.length;
  if (initialNodes.length !== updatedNodes.length) {
    console.error(
      "criteria", // family
      "change-HL03", // type
      "abording", // action
      "not the same number of nodes" // reason
    );
    throw "Criteria change-HL03 abording : not same number of nodes";
  }

  let sum = 0;
  for (let u_index = 0; u_index < initialNodes.length; u_index++) {
    const u = initialNodes[u_index];
    const u_prime = updatedNodes[u_index];

    sum += normX(u_prime, u) + normY(u_prime, u);
  }

  return { value: sum };
};

export const NodeMouvementDistanceMovedHamiltonianCriteria: Criteria = {
  criteria: changeHl,
  name: "node-mouvement/distance-moved-hamiltonian",
  short: "nm_dm_h"
};
export default NodeMouvementDistanceMovedHamiltonianCriteria;
