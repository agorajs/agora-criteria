import { Graph, Edge, Point } from 'agora-graph';
import { Criteria } from '../interfaces';
export declare function scaleChange(initial: Graph, updated: Graph): {
    value: number;
    displacement: Edge<Point>[];
};
export declare const NodeMouvementDistanceMovedCustomCriteria: Criteria;
export default NodeMouvementDistanceMovedCustomCriteria;
