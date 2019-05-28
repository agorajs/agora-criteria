import GlobalShapeBoundingBoxAspectRatioCriteria from './bounding-box/aspect-ratio';
import GlobalShapeBoundingBoxImprovedAspectRatioCriteria from './bounding-box/improved-aspect-ratio';
import GlobalShapeConvexHullStandardDeviationCriteria from './convex-hull_standard-deviation';

export const GlobalShape = {
  BoundingBox: {
    AspectRatio: GlobalShapeBoundingBoxAspectRatioCriteria,
    AspectRatioPlus: GlobalShapeBoundingBoxImprovedAspectRatioCriteria
  },
  ConvexHull: {
    StandardDeviation: GlobalShapeConvexHullStandardDeviationCriteria
  }
};
export default GlobalShape;
