import SpreadBoundingBoxAreaCriteria from './bounding-box_area';
import SpreadBoundingBoxAreaNormalizedCriteria from './bounding-box_area-normalized';
import SpreadBoundingBoxL1MetricLengthCriteria from './l1-metric-length';
import SpreadConvexHullAreaCriteria from './convex-hull_area';

export const Spread = {
  BoundingBox: {
    Area: SpreadBoundingBoxAreaCriteria,
    AreaNormalized: SpreadBoundingBoxAreaNormalizedCriteria,
    L1MetricLength: SpreadBoundingBoxL1MetricLengthCriteria
  },
  ConvexHull: {
    Area: SpreadConvexHullAreaCriteria
  }
};
export default Spread;
