import EdgeBasedRelativeStandardDeviationDelaunayCriteria, {
  EdgeBasedRelativeStandardDeviationCriteria
} from './relative-standard-deviation-delaunay';
import EdgeBasedRatioCriteria from './ratio';

export const EdgeBased = {
  Ratio: EdgeBasedRatioCriteria,
  RelativeStandardDeviationDelaunay: EdgeBasedRelativeStandardDeviationDelaunayCriteria,
  RelativeStandardDeviation: EdgeBasedRelativeStandardDeviationCriteria
};
export default EdgeBased;
