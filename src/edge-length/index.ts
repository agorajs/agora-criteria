import EdgeLengthRatioCriteria from "./edge-ratio-len05";
import EdgeLengthRelativeStandardDeviationCriteria from "./edge-length-gh10";

export const EdgeLength = {
  Ratio: EdgeLengthRatioCriteria,
  RelativeStandardDeviation: EdgeLengthRelativeStandardDeviationCriteria
};
export default EdgeLength;
