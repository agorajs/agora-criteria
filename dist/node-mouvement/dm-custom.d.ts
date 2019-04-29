import { Graph, Edge, Point } from 'agora-graph';
import { Criteria } from '../interfaces';
export declare function scaleChange(initial: Graph, updated: Graph): {
    value: number;
    displacement: Edge<Point>[];
};
export declare const NodeMouvementDistanceMovedCustomCriteria: Criteria<"nm_dm_c", "node-mouvement/distance-moved/custom">;
export default NodeMouvementDistanceMovedCustomCriteria;
