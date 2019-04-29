import { Edge, Point, norm, Node, Graph } from 'agora-graph';
import { CriteriaFunction, Criteria, CriteraiResult } from '../interfaces';
import _ from 'lodash';
import { criteriaWrap } from '../utils';

/**
 * TODO: NNB*16
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, displacement: Edge[]}}
 */
export const kNearestNeighborsNNB = function(
  initialGraph: Graph,
  updatedGraph: Graph,
  options: { k: number }
): CriteraiResult {
  const { k } = options;
  const { nodes: initialNodes } = initialGraph;
  const { nodes: updatedNodes } = updatedGraph;

  const nodesLength = initialNodes.length;

  const n_k = n(k);

  let value = 0;
  for (let i = 0; i < nodesLength; i++) {
    const initialNode = initialNodes[i];
    const updatedNode = updatedNodes[i];

    value +=
      (k -
        _.intersection(
          n_k(initialNodes, initialNode),
          n_k(updatedNodes, updatedNode)
        ).length) **
      2;
  }

  return { value };
};

function n(k: number): (nodes: Node[], node: Node) => number[] {
  return function(nodes, node) {
    return _.sortBy(nodes, n => norm(node, n))
      .filter(n => n.index != node.index)
      .slice(0, k)
      .map(n => n.index);
  };
}

export function createKNearestNeighborsCriteria(k: number = 8): Criteria {
  return criteriaWrap({
    criteria: (initial, updated) =>
      kNearestNeighborsNNB(initial, updated, { k }),
    name: 'node-mouvement/distance-moved/' + k + '-nearest-neighbors',
    short: 'mn_dm_' + k + 'nn'
  });
}

export const NodeMouvement8NearestNeighborsCriteria: Criteria = createKNearestNeighborsCriteria();
export default NodeMouvement8NearestNeighborsCriteria;
