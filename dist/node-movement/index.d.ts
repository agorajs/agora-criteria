import { createKNearestNeighborsCriteria } from './k-nearest-neighbors';
export declare const NodeMovement: {
    DistanceMoved: {
        NormalizedEuclidean: import("../interfaces").Criteria<"nm_dm_ne", "node-movement/distance-moved/normalized-euclidean">;
        Hamiltonian: import("../interfaces").Criteria<"nm_dm_h", "node-mouvement/distance-moved/hamiltonian">;
        SquaredEuclidean: import("../interfaces").Criteria<"nm_dm_se", "node-movement/distance-moved/squared-euclidean">;
        MeanEuclidean: import("../interfaces").Criteria<"mn_dm_me", "node-movement/distance-moved/mean-euclidean">;
        ImprovedMeanSquaredEuclidean: import("../interfaces").Criteria<"nm_dm_imse", "node-mouvement/distance-moved/improved-mean-squared-euclidean">;
    };
    MovedNodes: import("../interfaces").Criteria<"nm_mn", "node-movement/moved-nodes">;
    KNearestNeighbors: {
        default: import("../interfaces").Criteria<string, string>;
        setK: typeof createKNearestNeighborsCriteria;
    };
};
export default NodeMovement;
