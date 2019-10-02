import { createKNearestNeighborsCriteria } from './k-nearest-neighbors';
export declare const NodeMovement: {
    DistanceMoved: {
        Hamiltonian: import("../interfaces").Criteria<"nm_dm_h", "node-movement/distance-moved/hamiltonian">;
        ImprovedMeanSquaredEuclidean: import("../interfaces").Criteria<"nm_dm_imse", "node-movement/distance-moved/improved-mean-squared-euclidean">;
        NormalizedEuclidean: import("../interfaces").Criteria<"nm_dm_ne", "node-movement/distance-moved/normalized-euclidean">;
        MeanEuclidean: import("../interfaces").Criteria<"nm_dm_me", "node-movement/distance-moved/mean-euclidean">;
        SquaredEuclidean: import("../interfaces").Criteria<"nm_dm_se", "node-movement/distance-moved/squared-euclidean">;
    };
    MovedNodes: import("../interfaces").Criteria<"nm_mn", "node-movement/moved-nodes">;
    KNearestNeighbors: {
        default: import("../interfaces").Criteria<string, string>;
        setK: typeof createKNearestNeighborsCriteria;
    };
};
export default NodeMovement;
