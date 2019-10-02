# Agora Criterias

> This repository contains all the evaluation criterias used in agorajs.

Contains 5 classes of criteria :

- Edge Based
- Global Shape
- Node Movement
- Orthogonal Ordering
- Spread

## Documentation

> ... in progress

## Credits

- [Edge Based](#edge-based)
- [Global Shape](#global-shape)
- [Node Movement](#node-movement)
- [Orthogonal Ordering](#orthogonal-ordering)
- [Spread](#spread)

### Edge Based

#### `EdgeBased.Ratio`

> Li, W., Eades, P., Nikolov, N.: _Using spring algorithms to remove node overlapping._ In: Proceedings of the 2005 Asia-Pacific Symposium on Information Visualisation - Volume 45. pp. 131–140. APVis ’05, Australian Computer Society, Inc., Darlinghurst, Australia (2005)

#### `EdgeBased.RelativeStandardDeviation`

and `EdgeBased.RelativeStandardDeviation`

> Gansner, E., Hu, Y.: _Efficient, proximity-preserving node overlap removal._ Journal of Graph Algorithms and Applications 14(1), 53–74 (2010)

### Global Shape

#### `GlobalShape.BoundingBox.AspectRatio`

> Li, W., Eades, P., Nikolov, N.: _Using spring algorithms to remove node overlapping._ In: Proceedings of the 2005 Asia-Pacific Symposium on Information Visualisation - Volume 45. pp. 131–140. APVis ’05, Australian Computer Society, Inc., Darlinghurst, Australia (2005)

#### `GlobalShape.BoundingBox.AspectRatioPlus`

> Authors of [agorajs](https://github.com/agorajs).

#### `GlobalShape.ConvexHull.StandardDeviation`

> Strobelt, H., Spicker, M., Stoffel, A., Keim, D., Deussen, O.: _Rolled-out wordles: A heuristic method for overlap removal of 2d data representatives._ Computer Graphics Forum 31(3), 1135–1144 (2012)

### Node Movement

#### `NodeMovement.MovedNodes`

> Huang, X., Lai, W., Sajeev, A., Gao, J.: _A new algorithm for removing node overlapping in graph visualization._ Information Sciences 177(14), 2821 – 2844 (2007)

#### `NodeMovement.DistanceMoved.MeanEuclidean`

> Strobelt, H., Spicker, M., Stoffel, A., Keim, D., Deussen, O.: _Rolled-out wordles: A heuristic method for overlap removal of 2d data representatives._ Computer Graphics Forum 31(3), 1135–1144 (2012)

#### `NodeMovement.DistanceMoved.NormalizedEuclidean`

> Lyons, K.A., Meijer, H., Rappaport, D.: _Algorithms for cluster busting in anchored graph drawing._ Journal of Graph Algorithms and Applications 2(1), 1–24 (1998)

#### `NodeMovement.DistanceMoved.Hamiltonian`

> Huang, X., Lai, W.: _Force-transfer: a new approach to removing overlapping nodes in graph layout._ In: Proceedings of the 26th Australasian computer science conference-Volume 16. pp. 349–358. Australian Computer Society, Inc. (2003)
>
> Huang, X., Lai, W., Sajeev, A., Gao, J.: _A new algorithm for removing node overlapping in graph visualization._ Information Sciences 177(14), 2821 – 2844 (2007)

#### `NodeMovement.DistanceMoved.SquaredEuclidean`

> Marriott, K., Stuckey, P., Tam, V., He, W.: _Removing node overlapping in graph layout using constrained optimization._ Constraints 8(2), 143–171 (2003)

#### `NodeMovement.DistanceMoved.ImprovedMeanSquaredEuclidean`

> Authors of [agorajs](https://github.com/agorajs)

#### `NodeMovement.KNearestNeighbors.default`

> Nachmanson, L., Nocaj, A., Bereg, S., Zhang, L., Holroyd, A.: _Node overlap removal by growing a tree._ In: International Symposium on Graph Drawing and Network Visualization. pp. 33–43. Springer (2016)

### Orthogonal Ordering

#### `OrthogonalOrdering.Original`

> Misue, K., Eades, P., Lai, W., Sugiyama, K.: _Layout adjustment and the mental map._ Journal of Visual Languages & Computing 6(2), 183–210 (1995)

#### `OrthogonalOrdering.KendallTauDistance`

> Huang, X., Lai, W., Sajeev, A., Gao, J.: _A new algorithm for removing node overlapping in graph visualization._ Information Sciences 177(14), 2821 – 2844 (2007)

#### `OrthogonalOrdering.NumberInversions`

> Strobelt, H., Spicker, M., Stoffel, A., Keim, D., Deussen, O.: _Rolled-out wordles: A heuristic method for overlap removal of 2d data representatives._ Computer Graphics Forum 31(3), 1135–1144 (2012)

#### `OrthogonalOrdering.NormalizedNumberInversions`

> Authors of [agorajs](https://github.com/agorajs)

### Spread

#### `Spread.BoundingBox.L1MetricLength`

> Li, W., Eades, P., Nikolov, N.: _Using spring algorithms to remove node overlapping._ In: Proceedings of the 2005 Asia-Pacific Symposium on Information Visualisation - Volume 45. pp. 131–140. APVis ’05, Australian Computer Society, Inc., Darlinghurst, Australia (2005)

#### `Spread.BoundingBox.Area`

> Misue, K., Eades, P., Lai, W., Sugiyama, K.: _Layout adjustment and the mental map._ Journal of Visual Languages & Computing 6(2), 183–210 (1995)

#### `Spread.BoundingBox.NormalizedArea`

> Huang, X., Lai, W., Sajeev, A., Gao, J.: _A new algorithm for removing node overlapping in graph visualization._ Information Sciences 177(14), 2821 – 2844 (2007)

#### `Spread.ConvexHull.Area`

> Strobelt, H., Spicker, M., Stoffel, A., Keim, D., Deussen, O.: _Rolled-out wordles: A heuristic method for overlap removal of 2d data representatives._ Computer Graphics Forum 31(3), 1135–1144 (2012)
