import NodeMouvementDistanceMovedNormalizedCriteria from "./spread-lmr98";
import NodeMouvementDistanceMovedHamiltonianCriteria from "./change-hl03";
import NodeMouvementDistanceMovedSquaredCriteria from "./change-square-msth03";
import NodeMouvementMovedNodesCriteria from "./lambda-1-hlsg07";
import NodeMouvementDistanceMovedMeanEuclidianCriteria from "./nm-dme-sss12";
import NodeMouvement8NearestNeighborsCriteria, {
  createKNearestNeighborsCriteria
} from "./nm-knn-nnb16";

export const NodeMouvement = {
  DistanceMoved: {
    Normalized: NodeMouvementDistanceMovedNormalizedCriteria,
    Hamiltonian: NodeMouvementDistanceMovedHamiltonianCriteria,
    Squared: NodeMouvementDistanceMovedSquaredCriteria,
    MeanEuclidian: NodeMouvementDistanceMovedMeanEuclidianCriteria
  },
  MovedNodes: NodeMouvementMovedNodesCriteria,
  KNearestNeighbors: {
    default: NodeMouvement8NearestNeighborsCriteria,
    setK: createKNearestNeighborsCriteria
  }
};
export default NodeMouvement;
