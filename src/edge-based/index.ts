import RelativeStandardDeviationDelaunay, {
  EdgeBasedRelativeStandardDeviationCriteria
} from './relative-standard-deviation-delaunay';
import Ratio from './ratio';

export const EdgeBased = {
  Ratio,
  RelativeStandardDeviationDelaunay,
  RelativeStandardDeviation: EdgeBasedRelativeStandardDeviationCriteria
};
export default EdgeBased;
