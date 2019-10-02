import AspectRatio from './bounding-box/aspect-ratio';
import ImprovedAspectRatio from './bounding-box/improved-aspect-ratio';
import StandardDeviation from './convex-hull_standard-deviation';

export const GlobalShape = {
  BoundingBox: {
    AspectRatio,
    ImprovedAspectRatio
  },
  ConvexHull: {
    StandardDeviation
  }
};
export default GlobalShape;
