import NormalizedEuclidean from './distance-moved/normalized-euclidean';
import Hamiltonian from './distance-moved/hamiltonian';
import SquaredEuclidean from './distance-moved/squared-euclidean';
import ImprovedMeanSquaredEuclidean from './distance-moved/improved-mean-squared-euclidean';
import MovedNodes from './moved-nodes';
import MeanEuclidean from './distance-moved/mean-euclidean';
import NodeMovement8NearestNeighborsCriteria, {
  createKNearestNeighborsCriteria
} from './k-nearest-neighbors';

export const NodeMovement = {
  DistanceMoved: {
    Hamiltonian,
    ImprovedMeanSquaredEuclidean,
    NormalizedEuclidean,
    MeanEuclidean,
    SquaredEuclidean
  },
  MovedNodes,
  KNearestNeighbors: {
    default: NodeMovement8NearestNeighborsCriteria,
    setK: createKNearestNeighborsCriteria
  }
};
export default NodeMovement;
