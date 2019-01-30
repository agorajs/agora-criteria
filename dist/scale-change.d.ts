import { Graph, Edge, Point } from "agora-graph";
export declare function scaleChange(initial: Graph, updated: Graph): {
    value: number;
    displacement: Edge<Point>[];
};
