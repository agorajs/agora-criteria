import SpreadBoundingBoxAreaCriteria from './bounding-box/area';
import SpreadBoundingBoxNormalizedAreaCriteria from './bounding-box/normalized-area';
import SpreadBoundingBoxL1MetricLengthCriteria from './bounding-box/l1-metric-length';
import SpreadConvexHullAreaCriteria from './convex-hull_area';

export const Spread = {
  BoundingBox: {
    Area: SpreadBoundingBoxAreaCriteria,
    NormalizedArea: SpreadBoundingBoxNormalizedAreaCriteria,
    L1MetricLength: SpreadBoundingBoxL1MetricLengthCriteria
  },
  ConvexHull: {
    Area: SpreadConvexHullAreaCriteria
  }
};
export default Spread;
