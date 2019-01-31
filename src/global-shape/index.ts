import GlobalShapeBoundingBoxAspectRatioCriteria from "./aspect-ratio-len05";
import GlobalShapeBoundingBoxAspectRatioPlusCriteria from "./aspect-ratio";
import GlobalShapeConvexHullStandardShapePreservationCriteria from "./gs-ch-ssp";

export const GlobalShape = {
  BoundingBox: {
    AspectRatio: GlobalShapeBoundingBoxAspectRatioCriteria,
    AspectRatioPlus: GlobalShapeBoundingBoxAspectRatioPlusCriteria
  },
  ConvexHull: {
    StandardShapePreservation: GlobalShapeConvexHullStandardShapePreservationCriteria
  }
};
export default GlobalShape;
