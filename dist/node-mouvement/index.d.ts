import { createKNearestNeighborsCriteria } from "./nm-knn-nnb16";
export declare const NodeMouvement: {
    DistanceMoved: {
        Normalized: import("../interfaces").Criteria;
        Hamiltonian: import("../interfaces").Criteria;
        Squared: import("../interfaces").Criteria;
        MeanEuclidian: import("../interfaces").Criteria;
    };
    MovedNodes: import("../interfaces").Criteria;
    KNearestNeighbors: {
        default: import("../interfaces").Criteria;
        setK: typeof createKNearestNeighborsCriteria;
    };
};
export default NodeMouvement;
