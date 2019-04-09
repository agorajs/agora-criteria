import GlobalShapeConvexHullStandardShapePreservationCriteria, {calculateConvexHullDistances} from "./gs-ch-ssp"

test("global-shape/convex-hull/standard-shape-preservation is working correctly", () => {
    console.log(
        calculateConvexHullDistances([[2, 1], [0, 1], [0, -1], [2, -1]])
        );
    console.log(calculateConvexHullDistances([[1, 0], [0, 1], [-1, 0], [0, -1]]));
});
