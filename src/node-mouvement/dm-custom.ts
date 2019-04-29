import _ from 'lodash';
import { Graph, Edge, Point, delta } from 'agora-graph';
import { Criteria } from '../interfaces';
import { criteriaWrap } from '../utils';

export function scaleChange(initial: Graph, updated: Graph) {
  const nodesLength = initial.nodes.length;

  const sizes = {
    in: {
      min: { x: initial.nodes[0].x, y: initial.nodes[0].y },
      max: { x: initial.nodes[0].x, y: initial.nodes[0].y }
    },
    up: {
      min: { x: updated.nodes[0].x, y: updated.nodes[0].y },
      max: { x: updated.nodes[0].x, y: updated.nodes[0].y }
    }
  };

  // determining the scale ratio
  for (let index = 0; index < nodesLength; index++) {
    const node = initial.nodes[index];
    const upNode = updated.nodes[index];

    if (sizes.in.min.x > node.x) sizes.in.min.x = node.x;
    if (sizes.in.max.x < node.x) sizes.in.max.x = node.x;
    if (sizes.in.min.y > node.y) sizes.in.min.y = node.y;
    if (sizes.in.max.y < node.y) sizes.in.max.y = node.y;

    if (sizes.up.min.x > upNode.x) sizes.up.min.x = upNode.x;
    if (sizes.up.max.x < upNode.x) sizes.up.max.x = upNode.x;
    if (sizes.up.min.y > upNode.y) sizes.up.min.y = upNode.y;
    if (sizes.up.max.y < upNode.y) sizes.up.max.y = upNode.y;
  }

  // there you go
  const ratio = {
    width:
      (sizes.up.max.x - sizes.up.min.x) / (sizes.in.max.x - sizes.in.min.x),
    height:
      (sizes.up.max.y - sizes.up.min.y) / (sizes.in.max.y - sizes.in.min.y)
  };

  const proPoints: Point[] = [];

  let proj: { x: number | null; y: number | null } = {
    x: null,
    y: null
  };

  // calculating the shift
  for (let index = 0; index < nodesLength; index++) {
    const node = initial.nodes[index];

    const point: Point = {
      x: node.x * ratio.width,
      y: node.y * ratio.height
    };

    const left = point.x - node.width / 2;
    const top = point.y - node.height / 2;

    if (proj.x === null || left < proj.x) proj.x = left;
    if (proj.y === null || top < proj.y) proj.y = top;

    proPoints.push(point);
  }

  if (proj.x === null || proj.y === null)
    throw 'Criteria scale-change projection error';

  let change: number = 0;
  let displacement: Edge<Point>[] = [];

  // applying the shift and calculating the displacement
  for (let index = 0; index < nodesLength; index++) {
    const upNode = updated.nodes[index];
    const pPoint = {
      x: proPoints[index].x - proj.x,
      y: proPoints[index].y - proj.y
    };

    const distancePoints = delta(upNode, pPoint);

    const diff = +(
      distancePoints.x * distancePoints.x +
      distancePoints.y * distancePoints.y
    ).toFixed(9);
    change += diff;
    if (diff !== 0) {
      displacement.push({
        source: { x: upNode.x, y: upNode.y },
        target: pPoint
      });
    }
  }

  return { value: change / nodesLength, displacement: displacement };
}

export const NodeMouvementDistanceMovedCustomCriteria: Criteria = criteriaWrap({
  criteria: scaleChange,
  name: 'node-mouvement/distance-moved/custom',
  short: 'nm_dm_c'
});
export default NodeMouvementDistanceMovedCustomCriteria;
