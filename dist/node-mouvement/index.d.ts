import { createKNearestNeighborsCriteria } from './knn-nnb16';
export declare const NodeMouvement: {
    DistanceMoved: {
        Normalized: import("../interfaces").Criteria<"nm_dm_n", "node-mouvement/distance-moved-normalized">;
        Hamiltonian: import("../interfaces").Criteria<"nm_dm_h", "node-mouvement/distance-moved/hamiltonian">;
        Squared: import("../interfaces").Criteria<"nm_dm_s", "node-mouvement/distance-moved/squared">;
        MeanEuclidian: import("../interfaces").Criteria<"mn_dm_me", "node-mouvement/distance-moved/mean-euclidian">;
        Custom: import("../interfaces").Criteria<"nm_dm_c", "node-mouvement/distance-moved/custom">;
    };
    MovedNodes: import("../interfaces").Criteria<"nm_mn", "node-mouvement/moved-nodes">;
    KNearestNeighbors: {
        default: import("../interfaces").Criteria<string, string>;
        setK: typeof createKNearestNeighborsCriteria;
    };
};
export default NodeMouvement;
