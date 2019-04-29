import NodeMouvementDistanceMovedNormalizedCriteria from './dm-n-lmr98';
import NodeMouvementDistanceMovedHamiltonianCriteria from './dm-h-hl03';
import NodeMouvementDistanceMovedSquaredCriteria from './dm-s-msth03';
import NodeMouvementDistanceMovedCustom from './dm-custom';
import NodeMouvementMovedNodesCriteria from './mn-hlsg07';
import NodeMouvementDistanceMovedMeanEuclidianCriteria from './dm-sss12';
import NodeMouvement8NearestNeighborsCriteria, {
  createKNearestNeighborsCriteria
} from './knn-nnb16';

export const NodeMouvement = {
  DistanceMoved: {
    Normalized: NodeMouvementDistanceMovedNormalizedCriteria,
    Hamiltonian: NodeMouvementDistanceMovedHamiltonianCriteria,
    Squared: NodeMouvementDistanceMovedSquaredCriteria,
    MeanEuclidian: NodeMouvementDistanceMovedMeanEuclidianCriteria,
    Custom: NodeMouvementDistanceMovedCustom
  },
  MovedNodes: NodeMouvementMovedNodesCriteria,
  KNearestNeighbors: {
    default: NodeMouvement8NearestNeighborsCriteria,
    setK: createKNearestNeighborsCriteria
  }
};
export default NodeMouvement;
