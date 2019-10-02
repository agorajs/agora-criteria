import BoundingBoxArea from './bounding-box/area';
import NormalizedArea from './bounding-box/normalized-area';
import L1MetricLength from './bounding-box/l1-metric-length';
import ConvexHullArea from './convex-hull_area';

export const Spread = {
  BoundingBox: {
    Area: BoundingBoxArea,
    NormalizedArea,
    L1MetricLength
  },
  ConvexHull: {
    Area: ConvexHullArea
  }
};
export default Spread;
