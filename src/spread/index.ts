import SpreadBoundingBoxAreaCriteria from "./area-mels95";
import SpreadBoundingBoxAreaNormalizedCriteria from "./area-hlsg07";
import SpreadBoundingBoxL1Metriclength from "./l1-length-hlsg07";
import SpreadConvexHullAreaCriteria from "./sp-ch-a";

export const Spread = {
  BoundingBox: {
    Area: SpreadBoundingBoxAreaCriteria,
    AreaNormalized: SpreadBoundingBoxAreaNormalizedCriteria,
    L1MetricLength: SpreadBoundingBoxL1Metriclength
  },
  ConvexHull: {
    SpreadConvexHullAreaCriteria
  }
};

export default Spread;
