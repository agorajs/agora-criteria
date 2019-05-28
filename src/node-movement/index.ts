import NodeMouvementDistanceMovedNormalizedCriteria from './square-normalized';
import NodeMouvementDistanceMovedHamiltonianCriteria from './distance-moved/hamiltonian';
import NodeMovementDistanceMovedSquareCriteria from './distance-moved/square';
import NodeMouvementDistanceMovedCustomCriteria from './dm-ime';
import NodeMovementMovedNodesCriteria from './moved-nodes';
import NodeMovementDistanceMovedMeanEuclideanCriteria from './distance-moved/mean-euclidian';
import NodeMouvement8NearestNeighborsCriteria, {
  createKNearestNeighborsCriteria
} from './knn-nnb16';

export const NodeMovement = {
  DistanceMoved: {
    Normalized: NodeMouvementDistanceMovedNormalizedCriteria,
    Hamiltonian: NodeMouvementDistanceMovedHamiltonianCriteria,
    Square: NodeMovementDistanceMovedSquareCriteria,
    MeanEuclidean: NodeMovementDistanceMovedMeanEuclideanCriteria,
    Custom: NodeMouvementDistanceMovedCustomCriteria
  },
  MovedNodes: NodeMovementMovedNodesCriteria,
  KNearestNeighbors: {
    default: NodeMouvement8NearestNeighborsCriteria,
    setK: createKNearestNeighborsCriteria
  }
};
export default NodeMovement;
