import { CriteriaFunction, CriteraiResult } from "./interfaces";
import * as d3 from "d3-polygon";
import * as _ from "lodash";
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
} from "agora-graph";

type Pos = [number, number];

const GlobalShape: {
  ConvexHull: { standartShapePreservation: CriteriaFunction };
} = {
  ConvexHull: {
    standartShapePreservation: function(initial, updated): CriteraiResult {
      // STEP 1 : retrieve convex hull
      const initialHull = d3.polygonHull(convertNodes(initial.nodes));
      const updatedHull = d3.polygonHull(convertNodes(updated.nodes));

      // STEP 1.1 : check for errors
      if (initialHull === null || updatedHull === null)
        return {
          value: -1,
          error: "could not compute initial or updated convex hull"
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
    }
  }
};

function calculateConvexHullDistances(hull: [number, number][]) {
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

  elements.sort((a, b) => a[1].angle - b[1].angle);

  let buffer = elements[0];
  let rayIndex = 0;
  let distances = [];
  for (let cur = 1; cur < elements.length; cur++) {
    const polarPoint = elements[cur][1];
    const vectorPoint = elements[cur][0];

    // while it is before the current point we need to check if it is intersecting :)
    while (rays[rayIndex].angle < polarPoint.angle) {
      if (rays[rayIndex].angle < buffer[1].angle) {
        ++rayIndex;
        continue;
      }

      const cartesianRay = toCartesian(rays[rayIndex]);

      // calculating intersection
      let intersectionPoint = lineIntersection(
        { start: [0, 0], end: [cartesianRay.x, cartesianRay.y] },
        { start: buffer[0], end: vectorPoint }
      );

      //if they intersect
      if (intersectionPoint) distances.push(magnitude(intersectionPoint));
      else throw "it is supposed to intersect :(";
      ++rayIndex;
    }

    buffer = elements[cur];
  }

  // complete the circle
  const end = elements[0];
  // buffer = elements[last]
  const beginning = rayIndex; // where we start
  while (rays[rayIndex].angle < end[1].angle || rayIndex >= beginning) {
    const cartesianRay = toCartesian(rays[rayIndex]);

    let intersectionPoint = lineIntersection(
      { start: [0, 0], end: [cartesianRay.x, cartesianRay.y] },
      { start: buffer[0], end: end[0] }
    );

    //if they intersect
    if (intersectionPoint) distances.push(magnitude(intersectionPoint));
    else throw "it is supposed to intersect :(";
    rayIndex = (rayIndex + 1) % rays.length;
  }

  return distances;
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

function test() {
  console.log(
    calculateConvexHullDistances([[1, 1], [-1, 1], [-1, -1], [1, -1]])
  );
  console.log(calculateConvexHullDistances([[1, 0], [0, 1], [-1, 0], [0, -1]]));
}

export default GlobalShape;
