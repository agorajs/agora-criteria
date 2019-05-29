import NodeMovementDistanceMovedEuclideanNormalizedCriteria from './distance-moved/euclidean-normalized';
import NodeMovementDistanceMovedHamiltonianCriteria from './distance-moved/hamiltonian';
import NodeMovementDistanceMovedEuclideanSquareCriteria from './distance-moved/squared-euclidean';
import NodeMovementDistanceMovedImprovedMeanSquaredEuclideanCriteria from './distance-moved/improved-mean-squared-euclidean';
import NodeMovementMovedNodesCriteria from './moved-nodes';
import NodeMovementDistanceMovedMeanEuclideanCriteria from './distance-moved/mean-euclidean';
import NodeMovement8NearestNeighborsCriteria, {
  createKNearestNeighborsCriteria
} from './k-nearest-neighbors';

export const NodeMovement = {
  DistanceMoved: {
    EuclideanNormalized: NodeMovementDistanceMovedEuclideanNormalizedCriteria,
    Hamiltonian: NodeMovementDistanceMovedHamiltonianCriteria,
    SquaredEuclidean: NodeMovementDistanceMovedEuclideanSquareCriteria,
    MeanEuclidean: NodeMovementDistanceMovedMeanEuclideanCriteria,
    ImprovedMeanSquaredEuclidean: NodeMovementDistanceMovedImprovedMeanSquaredEuclideanCriteria
  },
  MovedNodes: NodeMovementMovedNodesCriteria,
  KNearestNeighbors: {
    default: NodeMovement8NearestNeighborsCriteria,
    setK: createKNearestNeighborsCriteria
  }
};
export default NodeMovement;
