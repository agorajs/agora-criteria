import { CriteriaFunction, Criteria } from '../interfaces';
import * as d3 from 'd3-polygon';
import * as _ from 'lodash';
import {
  bottom,
  top,
  left,
  right,
  Node,
  PolarVector,
  round,
  toPolar,
  magnitude,
  Point,
  toCartesian
} from 'agora-graph';
import { criteriaWrap } from '../utils';

type Pos = [number, number];
type Line = { start: [Pos, number]; end: [Pos, number] };

export const GlobalShapeConvexHullStandardShapePreservation: CriteriaFunction = function(
  initial,
  updated
) {
  // STEP 1 : retrieve convex hull
  const initialHull = d3.polygonHull(convertNodes(initial.nodes));
  const updatedHull = d3.polygonHull(convertNodes(updated.nodes));

  // STEP 1.1 : check for errors
  if (initialHull === null || updatedHull === null)
    return {
      value: -1,
      error: 'could not compute initial or updated convex hull'
    };

  // DO STEP 2-3-4-5
  const initialDistances = calculateConvexHullDistances(initialHull);
  const updatedDistances = calculateConvexHullDistances(updatedHull);
  const d = [];
  for (let i = 0; i < initialDistances.length; i++) {
    d.push(initialDistances[i] / updatedDistances[i]);
  }

  const dMean = _.mean(d);

  const value = _.sumBy(d, dI => (dI - dMean) ** 2);

  return { value, initial: initialDistances, updated: updatedDistances };
};

export function calculateConvexHullDistances(hull: [number, number][]) {
  // STEP 2 get center of the hull and set as center
  const center = d3.polygonCentroid(hull);
  const centeredHull = _.map<Pos, Pos>(hull, pos => [
    pos[0] - center[0],
    pos[1] - center[1]
  ]);
  // STEP 3 create radian lines from center each 10 degrees.
  let rays: PolarVector[] = [];
  for (let angle = 0; angle < 360; angle += 10) {
    rays.push({
      angle,
      length: 1,
      theta: round(angle * (Math.PI / 180), -14)
    });
  }

  // STEP 4 convert point of the hull to polar coordinates (to know which line do i need to raytrace)
  let elements = _.map<Pos, [Pos, PolarVector]>(centeredHull, pos => [
    pos,
    toPolar({ x: pos[0], y: pos[1] })
  ]);

  const lines = getLines(elements);
  const distances: number[] = [];
  _.forEach(rays, ray => {
    const line = getIntersectingLine(lines, ray);
    const cartesianRay = toCartesian(ray);
    const intersection = lineIntersection(
      { start: [0, 0], end: [cartesianRay.x, cartesianRay.y] },
      { start: line.start[0], end: line.end[0] }
    );

    if (intersection) distances.push(magnitude(intersection));
    else throw 'it is supposed to intersect :(';
  });

  return distances;
}

function getIntersectingLine(lines: Line[], ray: PolarVector): Line {
  for (const line of lines) {
    if (line.start[1] <= ray.angle && line.end[1] > ray.angle) return line;
  }

  // should never be in this case
  throw 'Cannot be here';
  return lines[0];
}

function getLines(elements: [Pos, PolarVector][]): Line[] {
  const sorted = _.sortBy(elements, a => a[1].angle);

  if (sorted.length === 0) {
    return [];
  }

  if (sorted.length === 1) {
    return [
      {
        start: [sorted[0][0], sorted[0][1].angle],
        end: [sorted[0][0], sorted[0][1].angle + 360]
      }
    ];
  }
  let lastEl = sorted[sorted.length - 1];
  let buffer = sorted[0];

  const lines: Line[] = [
    {
      start: [lastEl[0], lastEl[1].angle - 360],
      end: [buffer[0], buffer[1].angle]
    }
  ];

  for (let i = 1; i < sorted.length; i++) {
    lines.push({
      start: [buffer[0], buffer[1].angle],
      end: [sorted[i][0], sorted[i][1].angle]
    });
    buffer = sorted[i];
  }

  lines.push({
    start: [buffer[0], buffer[1].angle],
    end: [sorted[0][0], sorted[0][1].angle + 360]
  });

  return lines;
}

function lineIntersection(
  line1: { start: Pos; end: Pos },
  line2: { start: Pos; end: Pos }
): Point | null {
  // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite)
  const denominator =
    (line2.end[1] - line2.start[1]) * (line1.end[0] - line1.start[0]) -
    (line2.end[0] - line2.start[0]) * (line1.end[1] - line1.start[1]);

  if (denominator == 0) {
    return null;
  }

  let a = line1.start[1] - line2.start[1];
  let b = line1.start[0] - line2.start[0];

  const numerator1 =
    (line2.end[0] - line2.start[0]) * a - (line2.end[1] - line2.start[1]) * b;
  const numerator2 =
    (line1.end[0] - line1.start[0]) * a - (line1.end[1] - line1.start[1]) * b;
  a = numerator1 / denominator;
  b = numerator2 / denominator;

  // if we cast these lines infinitely in both directions, they intersect here:
  return {
    x: line1.start[0] + a * (line1.end[0] - line1.start[0]),
    y: line1.start[1] + a * (line1.end[1] - line1.start[1])
  };
}

function convertNodes(nodes: Node[]): [number, number][] {
  // TODO: add node boxes
  return _.flatMap(nodes, function(n): [number, number][] {
    const t = top(n),
      l = left(n),
      r = right(n),
      b = bottom(n);
    return [[l, t], [r, t], [r, b], [l, b]];
  });
}

export const GlobalShapeConvexHullStandardShapePreservationCriteria = criteriaWrap(
  {
    criteria: GlobalShapeConvexHullStandardShapePreservation,
    name: 'global-shape/convex-hull/standard-shape-preservation',
    short: 'gs_ch_ssp'
  }
);
export default GlobalShapeConvexHullStandardShapePreservationCriteria;
