import { Edge, Point, norm } from 'agora-graph';
import { CriteriaFunction, Criteria } from '../interfaces';
import { criteriaWrap } from '../utils';

/**
 * TODO: SSS*12
 * Evaluates the updatedGraph using the Change criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, displacement: Edge[]}}
 */
export const euclidianDistanceSss: CriteriaFunction = function(
  initialGraph,
  updatedGraph
): { value: number; displacement: Edge<Point>[] } {
  const { nodes: initialNodes } = initialGraph;
  const { nodes: updatedNodes } = updatedGraph;

  const nodesLength = initialNodes.length;

  let change = 0;
  let displacement = [];

  for (let index = 0; index < nodesLength; index++) {
    const node = initialNodes[index];
    const upNode = updatedNodes[index];

    const diff = norm(node, upNode);
    change += diff;
    if (diff !== 0) {
      displacement.push({
        source: { x: node.x, y: node.y },
        target: { x: upNode.x, y: upNode.y }
      });
    }
  }

  return { value: change / nodesLength, displacement: displacement };
};

export const NodeMouvementDistanceMovedMeanEuclidianCriteria = criteriaWrap({
  criteria: euclidianDistanceSss,
  name: 'node-mouvement/distance-moved/mean-euclidian',
  short: 'mn_dm_me'
});
export default NodeMouvementDistanceMovedMeanEuclidianCriteria;
