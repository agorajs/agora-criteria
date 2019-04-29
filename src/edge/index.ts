import EdgeLengthRatioCriteria from './edge-ratio-len05';
import EdgeRelativeStandardDeviationDelaunayCriteria, {
  EdgeRelativeStandardDeviationCriteria
} from './edge-length-gh10';

export const EdgeLength = {
  Ratio: EdgeLengthRatioCriteria,
  RelativeStandardDeviationDelaunay: EdgeRelativeStandardDeviationDelaunayCriteria,
  RelativeStandardDeviation: EdgeRelativeStandardDeviationCriteria
};
export default EdgeLength;
