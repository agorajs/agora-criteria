import ___default, { flatMap, mean, sumBy, map, forEach, sortBy } from 'lodash';
import { delaunay, round, norm, right, left, bottom, top, toPolar, toCartesian, magnitude, normX, normY } from 'agora-graph';
import { polygonHull, polygonCentroid, polygonArea } from 'd3-polygon';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var defineProperty = _defineProperty;

function isCriteria(object) {
  return object.criteria !== void 0;
}

function criteriaWrap(_ref) {
  var name = _ref.name,
      _criteria = _ref.criteria,
      _short = _ref["short"];
  return {
    name: name,
    "short": _short,
    criteria: function criteria(initial, updated) {
      if (initial.nodes.length !== updated.nodes.length) {
        //* ignoring console because it's captured by the exception

        /*
        console.error(
        'criteria', // family
        criteria.short, // type
        'abording', // action
        'not the same number of nodes' // reason
        ); */
        throw Error("Criteria ".concat(_short ? _short : name, " abording : not same number of nodes"));
      }

      return _criteria(initial, updated);
    }
  };
}

/**
 * TODO: GH10
 *
 * reference:  https://gitlab.com/graphviz/graphviz/blob/master/lib/sfdpgen/layout_similarity.c#L161-180
 * permalink reference : https://gitlab.com/graphviz/graphviz/blob/b0871968de2252653b001bf700ed98c240e8aad6/lib/sfdpgen/layout_similarity.c#L161-180
 *
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */

var edgeLength = function edgeLength(initialGraph, updatedGraph) {
  var withDelaunay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var initialNodes = initialGraph.nodes;
  var updatedNodes = updatedGraph.nodes;

  var initialSorted = ___default.sortBy(initialNodes, 'index');

  var updatedSorted = ___default.sortBy(updatedNodes, 'index');

  var r = function r(e) {
    // if source is equal to target, consider as same length
    if (e.source === e.target) return 1;
    var initLength = norm(initialSorted[e.source], initialSorted[e.target]);
    var uLength = norm(updatedSorted[e.source], updatedSorted[e.target]);
    return uLength / initLength;
  };
  /* not used and supposedly wrong 
  const r_prime = (e: Edge) => {
    const initLength = norm(initialSorted[e.source], initialSorted[e.target]);
    const uLength = norm(updatedSorted[e.source], updatedSorted[e.target]);
    return initLength / uLength;
  }; */


  if (withDelaunay) {
    var delaunayEdges = delaunay(initialNodes);
    return {
      value: round(delta(delaunayEdges, r), -6)
    };
    /* this is how it should be done, but it is unclear about how do we manage r_prime calculation
    const delaunayEdgesPrime = delaunay(updatedNodes);
    return {
      value: round(
        (delta(delaunayEdges, r) + delta(delaunayEdgesPrime, r_prime)) / 2,
        -6
      )
    }; */
  }

  return {
    value: round(delta(initialGraph.edges, r), -6)
  };
};

function delta(edges, r) {
  var meanR = ___default.meanBy(edges, r);

  return Math.sqrt(___default.sumBy(edges, function (e) {
    return Math.pow(r(e) - meanR, 2);
  }) / edges.length) / meanR;
}

var EdgeBasedRelativeStandardDeviationDelaunayCriteria = criteriaWrap({
  criteria: function criteria(initial, updated) {
    return edgeLength(initial, updated, true);
  },
  name: 'edge-based/relative-standard-deviation/delaunay',
  "short": 'eb_rsdd'
});
var EdgeBasedRelativeStandardDeviationCriteria = criteriaWrap({
  criteria: function criteria(initial, updated) {
    return edgeLength(initial, updated, false);
  },
  name: 'edge-based/relative-standard-deviation',
  "short": 'eb_rsd'
});

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var edgeRatioLen = function edgeRatioLen(initial, updated) {
  var ratioOfInitial = calculateEdgeRatio(initial);
  var ratioOfUpdated = calculateEdgeRatio(updated);
  return {
    value: ratioOfUpdated / ratioOfInitial,
    initial: ratioOfInitial,
    updated: ratioOfUpdated
  };
};

function calculateEdgeRatio(graph) {
  var min, max;

  var _iterator = _createForOfIteratorHelper(graph.edges),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var edge = _step.value;
      var u = graph.nodes[edge.source];
      var v = graph.nodes[edge.target];
      var norm_uv = norm(u, v);
      if (norm_uv === 0) continue;
      if (min === undefined || min > norm_uv) min = norm_uv;
      if (max === undefined || max < norm_uv) max = norm_uv;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (max == undefined || min == undefined) throw Error('could not evaluate edge-based/ratio');
  return max / min;
}

var EdgeBasedRatioCriteria = criteriaWrap({
  criteria: edgeRatioLen,
  name: 'edge-based/ratio',
  "short": 'eb_r'
});

var EdgeBased = {
  Ratio: EdgeBasedRatioCriteria,
  RelativeStandardDeviationDelaunay: EdgeBasedRelativeStandardDeviationDelaunayCriteria,
  RelativeStandardDeviation: EdgeBasedRelativeStandardDeviationCriteria
};

/**
 * TODO: LEN05
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */

var aspectRatio = function aspectRatio(initialGraph, updatedGraph) {
  var initialNodes = initialGraph.nodes;
  var updatedNodes = updatedGraph.nodes;
  var w = right(right(initialNodes)) - left(left(initialNodes));
  var h = bottom(bottom(initialNodes)) - top(top(initialNodes));
  var wp = right(right(updatedNodes)) - left(left(updatedNodes));
  var hp = bottom(bottom(updatedNodes)) - top(top(updatedNodes));
  return {
    value: wp > hp ? wp * h / (hp * w) : hp * w / (wp * h)
  };
};
var GlobalShapeBoundingBoxAspectRatioCriteria = criteriaWrap({
  criteria: aspectRatio,
  name: 'global-shape/bounding-box/aspect-ratio',
  "short": 'gs_bb_ar'
});

/**
 * checks how the aspect ratio has changed
 * @param initial
 * @param updated
 */

var improvedAspectRatio = function improvedAspectRatio(initial, updated) {
  var initialSize = [round(bottom(bottom(initial.nodes)) - top(top(initial.nodes))), round(right(right(initial.nodes)) - left(left(initial.nodes)))],
      updatedSize = [round(bottom(bottom(updated.nodes)) - top(top(updated.nodes))), round(right(right(updated.nodes)) - left(left(updated.nodes)))];
  return {
    value: Math.max(initialSize[1] * updatedSize[0] / (initialSize[0] * updatedSize[1]), initialSize[0] * updatedSize[1] / (initialSize[1] * updatedSize[0])),
    updated: updatedSize,
    initial: initialSize
  };
};
var GlobalShapeBoundingBoxImprovedAspectRatioCriteria = criteriaWrap({
  criteria: improvedAspectRatio,
  name: 'global-shape/bounding-box/improved-aspect-ratio',
  "short": 'gs_bb_iar'
});

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * TODO: SSS12
 */
var shapePreservation = function shapePreservation(initial, updated) {
  // STEP 1 : retrieve convex hull
  var initialHull = polygonHull(convertNodes(initial.nodes));
  var updatedHull = polygonHull(convertNodes(updated.nodes)); // STEP 1.1 : check for errors

  if (initialHull === null || updatedHull === null) return {
    value: -1,
    error: 'could not compute initial or updated convex hull'
  }; // DO STEP 2-3-4-5

  var initialDistances = calculateConvexHullDistances(initialHull);
  var updatedDistances = calculateConvexHullDistances(updatedHull);
  var d = [];

  for (var i = 0; i < initialDistances.length; i++) {
    d.push(updatedDistances[i] / initialDistances[i]);
  }

  var mean_d = mean(d);

  var value = sumBy(d, function (d_a) {
    return Math.pow(d_a - mean_d, 2);
  });

  return {
    value: value,
    initial: initialDistances,
    updated: updatedDistances
  };
};
function calculateConvexHullDistances(hull) {
  // STEP 2 get center of the hull and set as center
  var center = polygonCentroid(hull);

  var centeredHull = map(hull, function (pos) {
    return [pos[0] - center[0], pos[1] - center[1]];
  }); // STEP 3 create radian lines from center each 10 degrees.


  var rays = [];

  for (var angle = 0; angle < 360; angle += 10) {
    rays.push({
      angle: angle,
      length: 1,
      theta: round(angle * (Math.PI / 180), -14)
    });
  } // STEP 4 convert point of the hull to polar coordinates (to know which line do i need to raytrace)


  var elements = map(centeredHull, function (pos) {
    return [pos, toPolar({
      x: pos[0],
      y: pos[1]
    })];
  });

  var lines = getLines(elements);
  var distances = [];

  forEach(rays, function (ray) {
    var line = getIntersectingLine(lines, ray);
    var cartesianRay = toCartesian(ray);
    var intersection = lineIntersection({
      start: [0, 0],
      end: [cartesianRay.x, cartesianRay.y]
    }, {
      start: line.start[0],
      end: line.end[0]
    });
    if (intersection) distances.push(magnitude(intersection));else throw Error('it is supposed to intersect :(');
  });

  return distances;
}

function getIntersectingLine(lines, ray) {
  var _iterator = _createForOfIteratorHelper$1(lines),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var line = _step.value;
      if (line.start[1] <= ray.angle && line.end[1] > ray.angle) return line;
    } // should never be in this case

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  throw Error('Unreachable error, how did you manage to get here');
}

function getLines(elements) {
  var sorted = sortBy(elements, function (a) {
    return a[1].angle;
  });

  if (sorted.length === 0) {
    return [];
  }

  if (sorted.length === 1) {
    return [{
      start: [sorted[0][0], sorted[0][1].angle],
      end: [sorted[0][0], sorted[0][1].angle + 360]
    }];
  }

  var lastEl = sorted[sorted.length - 1];
  var buffer = sorted[0];
  var lines = [{
    start: [lastEl[0], lastEl[1].angle - 360],
    end: [buffer[0], buffer[1].angle]
  }];

  for (var i = 1; i < sorted.length; i++) {
    lines.push({
      start: [buffer[0], buffer[1].angle],
      end: [sorted[i][0], sorted[i][1].angle]
    });
    buffer = sorted[i];
  }

  lines.push({
    start: [buffer[0], buffer[1].angle],
    end: [sorted[0][0], sorted[0][1].angle + 360]
  });
  return lines;
}

function lineIntersection(line1, line2) {
  // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite)
  var denominator = (line2.end[1] - line2.start[1]) * (line1.end[0] - line1.start[0]) - (line2.end[0] - line2.start[0]) * (line1.end[1] - line1.start[1]);

  if (denominator == 0) {
    return null;
  }

  var a = line1.start[1] - line2.start[1];
  var b = line1.start[0] - line2.start[0];
  var numerator1 = (line2.end[0] - line2.start[0]) * a - (line2.end[1] - line2.start[1]) * b;
  var numerator2 = (line1.end[0] - line1.start[0]) * a - (line1.end[1] - line1.start[1]) * b;
  a = numerator1 / denominator;
  b = numerator2 / denominator; // if we cast these lines infinitely in both directions, they intersect here:

  return {
    x: line1.start[0] + a * (line1.end[0] - line1.start[0]),
    y: line1.start[1] + a * (line1.end[1] - line1.start[1])
  };
}

function convertNodes(nodes) {
  // TODO: add node boxes
  return flatMap(nodes, function (n) {
    var t = top(n),
        l = left(n),
        r = right(n),
        b = bottom(n);
    return [[l, t], [r, t], [r, b], [l, b]];
  });
}

var GlobalShapeConvexHullStandardDeviationCriteria = criteriaWrap({
  criteria: shapePreservation,
  name: 'global-shape/convex-hull/standard-deviation',
  "short": 'gs_ch_sd'
});

var GlobalShape = {
  BoundingBox: {
    AspectRatio: GlobalShapeBoundingBoxAspectRatioCriteria,
    ImprovedAspectRatio: GlobalShapeBoundingBoxImprovedAspectRatioCriteria
  },
  ConvexHull: {
    StandardDeviation: GlobalShapeConvexHullStandardDeviationCriteria
  }
};

/**
 * TODO: LMR98
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */

var distancesMoved = function distancesMoved(initialGraph, updatedGraph) {
  var initialNodes = initialGraph.nodes;
  var updatedNodes = updatedGraph.nodes;
  var n = initialNodes.length;
  var sum = 0;

  for (var u_index = 0; u_index < initialNodes.length; u_index++) {
    var u = initialNodes[u_index];
    var u_prime = updatedNodes[u_index];
    sum += norm(u_prime, u);
  }

  var w = right(right(initialNodes)) - left(left(initialNodes));
  var h = bottom(bottom(initialNodes)) - top(top(initialNodes));
  var wp = right(right(updatedNodes)) - left(left(updatedNodes));
  var hp = bottom(bottom(updatedNodes)) - top(top(updatedNodes));
  var k = Math.max(w, h, wp, hp);
  return {
    value: sum / (k * Math.SQRT2 * n)
  };
};
var NodeMovementDistanceMovedNormalizedEuclideanCriteria = criteriaWrap({
  criteria: distancesMoved,
  name: 'node-movement/distance-moved/normalized-euclidean',
  "short": 'nm_dm_ne'
});

/**
 * TODO: HL03, HLSG07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */

var costFunction = function costFunction(initialGraph, updatedGraph) {
  var initialNodes = initialGraph.nodes;
  var updatedNodes = updatedGraph.nodes;
  var sum = 0;

  for (var u_index = 0; u_index < initialNodes.length; u_index++) {
    var u = initialNodes[u_index];
    var u_prime = updatedNodes[u_index];
    sum += normX(u_prime, u) + normY(u_prime, u);
  }

  return {
    value: sum
  };
};
var NodeMovementDistanceMovedHamiltonianCriteria = criteriaWrap({
  criteria: costFunction,
  name: 'node-movement/distance-moved/hamiltonian',
  "short": 'nm_dm_h'
});

/**
 * TODO: MSTH03
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */

var phiChange = function phiChange(initialGraph, updatedGraph) {
  var initialNodes = initialGraph.nodes;
  var updatedNodes = updatedGraph.nodes;
  var sum = 0;

  for (var u_index = 0; u_index < initialNodes.length; u_index++) {
    var u = initialNodes[u_index];
    var u_prime = updatedNodes[u_index];
    sum += Math.pow(normX(u_prime, u), 2) + Math.pow(normY(u_prime, u), 2);
  }

  return {
    value: sum
  };
};
var NodeMovementDistanceMovedEuclideanSquareCriteria = criteriaWrap({
  criteria: phiChange,
  name: 'node-movement/distance-moved/squared-euclidean',
  "short": 'nm_dm_se'
});

/**
 * scale to transform a to b
 * @param a first value
 * @param b second value
 */
var getScale = function getScale(a, b) {
  return b / a;
};

function getCenter(nodes, orientation) {
  var min = ___default.minBy(nodes, orientation);

  var max = ___default.maxBy(nodes, orientation);

  if (!min || !max) {
    throw Error("Criteria nm_dm_imse getCenter error either: ".concat(min, " or ").concat(max));
  }

  return max[orientation] / 2 + min[orientation] / 2;
}

function getSpan(nodes, orientation) {
  var min = ___default.minBy(nodes, orientation);

  var max = ___default.maxBy(nodes, orientation);

  if (!min || !max) {
    throw Error("Criteria nm_dm_imse getSpan error either: ".concat(min, " or ").concat(max));
  }

  return max[orientation] - min[orientation];
}

function scaleChange(initial, updated) {
  var nodesLength = initial.nodes.length;
  var scale = {
    x: getScale(getSpan(initial.nodes, 'x'), getSpan(updated.nodes, 'x')),
    y: getScale(getSpan(initial.nodes, 'y'), getSpan(updated.nodes, 'y'))
  };

  var initialCenteredNodes = ___default.sortBy(positionFromCenter(initial.nodes), 'index');

  var updatedCenteredNodes = ___default.sortBy(positionFromCenter(updated.nodes), 'index');

  return ___default.reduce(initialCenteredNodes, function (_ref, _ref2) {
    var value = _ref.value,
        displacement = _ref.displacement;
    var x = _ref2.x,
        y = _ref2.y,
        index = _ref2.index;
    var projected = {
      x: round(x * scale.x, -9),
      y: round(y * scale.y, -9)
    };

    var up = ___default.find(updatedCenteredNodes, ['index', index]);

    if (!up) throw Error("Criteria nm_dm_imse : index ".concat(index, " does not exist in updated"));
    var diff = norm(projected, up);
    value += diff * diff / nodesLength;
    displacement.push(diff);
    return {
      value: value,
      displacement: displacement
    };
  }, {
    value: 0,
    displacement: []
  });
}

function positionFromCenter(nodes) {
  var center_x = getCenter(nodes, 'x');
  var center_y = getCenter(nodes, 'y');
  return ___default.map(nodes, function (_ref3) {
    var index = _ref3.index,
        x = _ref3.x,
        y = _ref3.y;
    return {
      index: index,
      x: x - center_x,
      y: y - center_y
    };
  });
}

var NodeMovementDistanceMovedImprovedMeanSquaredEuclideanCriteria = criteriaWrap({
  criteria: scaleChange,
  name: 'node-movement/distance-moved/improved-mean-squared-euclidean',
  "short": 'nm_dm_imse'
});

/**
 * TODO: HLGS07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */

var lambda1 = function lambda1(initialGraph, updatedGraph) {
  var initialNodes = initialGraph.nodes;
  var updatedNodes = updatedGraph.nodes;
  var n = initialNodes.length;
  var nb = 0;

  for (var u_index = 0; u_index < initialNodes.length; u_index++) {
    var u = initialNodes[u_index];
    var u_prime = updatedNodes[u_index];
    if (u.x !== u_prime.x || u.y !== u_prime.y) nb++;
  }

  return {
    value: nb / n
  };
};
var NodeMovementMovedNodesCriteria = criteriaWrap({
  criteria: lambda1,
  name: 'node-movement/moved-nodes',
  "short": 'nm_mn'
});

/**
 * TODO: SSS*12
 * Evaluates the updatedGraph using the Change criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, displacement: Edge[]}}
 */

var euclideanDistance = function euclideanDistance(initialGraph, updatedGraph) {
  var initialNodes = initialGraph.nodes;
  var updatedNodes = updatedGraph.nodes;
  var nodesLength = initialNodes.length;
  var change = 0;
  var displacement = [];

  for (var index = 0; index < nodesLength; index++) {
    var node = initialNodes[index];
    var upNode = updatedNodes[index];
    var diff = norm(node, upNode);
    change += diff;

    if (diff !== 0) {
      displacement.push({
        source: {
          x: node.x,
          y: node.y
        },
        target: {
          x: upNode.x,
          y: upNode.y
        }
      });
    }
  }

  return {
    value: change / nodesLength,
    displacement: displacement
  };
};
var NodeMovementDistanceMovedMeanEuclideanCriteria = criteriaWrap({
  criteria: euclideanDistance,
  name: 'node-movement/distance-moved/mean-euclidean',
  "short": 'nm_dm_me'
});

/**
 * TODO: NNB*16
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 *
 * @returns {{value: number, displacement: Edge[]}}
 */

var kNearestNeighbors = function kNearestNeighbors(initialGraph, updatedGraph, options) {
  var k = options.k;
  var initialNodes = initialGraph.nodes;
  var updatedNodes = updatedGraph.nodes;
  var nodesLength = initialNodes.length;
  var n_k = n(k);
  var value = 0;

  for (var i = 0; i < nodesLength; i++) {
    var initialNode = initialNodes[i];
    var updatedNode = updatedNodes[i];
    value += Math.pow(k - ___default.intersection(n_k(initialNodes, initialNode), n_k(updatedNodes, updatedNode)).length, 2);
  }

  return {
    value: value
  };
};

function n(k) {
  return function (nodes, node) {
    return ___default.sortBy(nodes, function (n) {
      return norm(node, n);
    }).filter(function (n) {
      return n.index != node.index;
    }).slice(0, k).map(function (n) {
      return n.index;
    });
  };
}

function createKNearestNeighborsCriteria() {
  var k = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;
  return criteriaWrap({
    criteria: function criteria(initial, updated) {
      return kNearestNeighbors(initial, updated, {
        k: k
      });
    },
    name: 'node-movement/' + k + '-nearest-neighbors',
    "short": 'nm_' + k + 'nn'
  });
}
var NodeMovement8NearestNeighborsCriteria = createKNearestNeighborsCriteria();

var NodeMovement = {
  DistanceMoved: {
    Hamiltonian: NodeMovementDistanceMovedHamiltonianCriteria,
    ImprovedMeanSquaredEuclidean: NodeMovementDistanceMovedImprovedMeanSquaredEuclideanCriteria,
    NormalizedEuclidean: NodeMovementDistanceMovedNormalizedEuclideanCriteria,
    MeanEuclidean: NodeMovementDistanceMovedMeanEuclideanCriteria,
    SquaredEuclidean: NodeMovementDistanceMovedEuclideanSquareCriteria
  },
  MovedNodes: NodeMovementMovedNodesCriteria,
  KNearestNeighbors: {
    "default": NodeMovement8NearestNeighborsCriteria,
    setK: createKNearestNeighborsCriteria
  }
};

var orthogonalOrdering = function orthogonalOrdering(initialGraph, updatedGraph) {
  for (var u_index = 0; u_index < initialGraph.nodes.length; u_index++) {
    var u = initialGraph.nodes[u_index];
    var u_prime = updatedGraph.nodes[u_index];

    for (var v_index = 0; v_index < initialGraph.nodes.length; v_index++) {
      var v = initialGraph.nodes[v_index];
      var v_prime = updatedGraph.nodes[v_index];
      if (u.x < v.x !== u_prime.x < v_prime.x || u.y < v.y !== u_prime.y < v_prime.y || u.x === v.x !== (u_prime.x === v_prime.x) || u.y === v.y !== (u_prime.y === v_prime.y)) return {
        value: 0
      };
    }
  }

  return {
    value: 1
  };
};
var OrthogonalOrderingCriteria = criteriaWrap({
  criteria: orthogonalOrdering,
  name: 'orthogonal-ordering/original',
  "short": 'oo_o'
});

/**
 * TODO: SSS*12
 * Evaluates the updatedGraph using the orthogonal ordering criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */

var numberOfInversions = function numberOfInversions(initialGraph, updatedGraph) {
  var initialNodes = initialGraph.nodes;
  var updatedNodes = updatedGraph.nodes;
  var sum = 0;

  for (var u_index = 0; u_index < initialNodes.length; u_index++) {
    var u = initialNodes[u_index];
    var u_prime = updatedNodes[u_index];

    for (var v_index = 0; v_index < initialNodes.length; v_index++) {
      var v = initialNodes[v_index];
      var v_prime = updatedNodes[v_index];
      if (u.x > v.x && u_prime.x < v_prime.x) sum++;
      if (u.y > v.y && u_prime.y < v_prime.y) sum++;
    }
  }

  return {
    value: sum
  };
};
var OrthogonalOrderingNumberInversionsCriteria = criteriaWrap({
  criteria: numberOfInversions,
  name: 'orthogonal-ordering/number-of-inversions',
  "short": 'oo_ni'
});

/**
 * TODO : US
 * Evaluates the updatedGraph using the orthogonal ordering criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */

var normalizedNumberOfInversions = function normalizedNumberOfInversions(initialGraph, updatedGraph) {
  var initialNodes = initialGraph.nodes;
  var updatedNodes = updatedGraph.nodes;
  var sum = 0;

  for (var u_index = 0; u_index < initialNodes.length; u_index++) {
    var u = initialNodes[u_index];
    var u_prime = updatedNodes[u_index];

    for (var v_index = 0; v_index < initialNodes.length; v_index++) {
      var v = initialNodes[v_index];
      var v_prime = updatedNodes[v_index];
      if (u.x > v.x && u_prime.x < v_prime.x) sum++;
      if (u.y > v.y && u_prime.y < v_prime.y) sum++;
    }
  }

  return {
    value: sum / (initialNodes.length * (initialNodes.length - 1))
  };
};
var OrthogonalOrderingNormalizedNumberInversionsCriteria = criteriaWrap({
  criteria: normalizedNumberOfInversions,
  name: 'orthogonal-ordering/normalized-number-of-inversions',
  "short": 'oo_nni'
});

/**
 * TODO: HLGS 07
 * Evaluates the updatedGraph using the orthogonal ordering criteria
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */

var lambda2 = function lambda2(initialGraph, updatedGraph) {
  var initialNodes = initialGraph.nodes;
  var updatedNodes = updatedGraph.nodes;
  var n = initialNodes.length;
  var sum = 0;

  for (var u_index = 0; u_index < initialNodes.length; u_index++) {
    var u = initialNodes[u_index];
    var u_prime = updatedNodes[u_index];

    for (var v_index = 0; v_index < initialNodes.length; v_index++) {
      var v = initialNodes[v_index];
      var v_prime = updatedNodes[v_index];
      if (iv(u, v, u_prime, v_prime)) sum++;
    }
  }

  return {
    value: sum / (n * (n - 1))
  };
};

function iv(u, v, u_prime, v_prime) {
  return left(u) > left(v) && left(u_prime) < left(v_prime) || left(u) < left(v) && left(u_prime) > left(v_prime) || top(u) > top(v) && top(u_prime) < top(v_prime) || top(u) < top(v) && top(u_prime) > top(v_prime);
}

var OrthogonalOrderingKendallTauDistanceCriteria = criteriaWrap({
  criteria: lambda2,
  name: 'orthogonal-ordering/kendall-tau-distance',
  "short": 'oo_ktd'
});

var OrthogonalOrdering = {
  Original: OrthogonalOrderingCriteria,
  NumberInversions: OrthogonalOrderingNumberInversionsCriteria,
  NormalizedNumberInversions: OrthogonalOrderingNormalizedNumberInversionsCriteria,
  KendallTauDistance: OrthogonalOrderingKendallTauDistanceCriteria
};

/**
 * TODO: MELS95
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */

var area = function area(initialGraph, updatedGraph) {
  var initialNodes = initialGraph.nodes;
  var updatedNodes = updatedGraph.nodes;
  var w = right(right(initialNodes)) - left(left(initialNodes));
  var h = bottom(bottom(initialNodes)) - top(top(initialNodes));
  var wp = right(right(updatedNodes)) - left(left(updatedNodes));
  var hp = bottom(bottom(updatedNodes)) - top(top(updatedNodes));
  return {
    value: wp * hp / (w * h)
  };
};
var SpreadBoundingBoxAreaCriteria = criteriaWrap({
  criteria: area,
  name: 'spread/bounding-box/area',
  "short": 'sp_bb_a'
});

/**
 * TODO: HLSG07
 * Evaluates the updatedGraph
 * @param initialGraph the initial graph sorted by index
 * @param updatedGraph the updated graph sorted by index
 */

var lambda3 = function lambda3(initialGraph, updatedGraph) {
  var initialNodes = initialGraph.nodes;
  var updatedNodes = updatedGraph.nodes;
  var w = right(right(initialNodes)) - left(left(initialNodes));
  var h = bottom(bottom(initialNodes)) - top(top(initialNodes));
  var wp = right(right(updatedNodes)) - left(left(updatedNodes));
  var hp = bottom(bottom(updatedNodes)) - top(top(updatedNodes));
  return {
    value: 1 - w * h / (wp * hp)
  };
};
var SpreadBoundingBoxNormalizedAreaCriteria = criteriaWrap({
  criteria: lambda3,
  name: 'spread/bounding-box/normalized-area',
  "short": 'sp_bb_na'
});

/**
 * TODO : LEN05
 * @param initial
 * @param updated
 */

var l1MetricLength = function l1MetricLength(initial, updated) {
  var initialResult = Math.max(round(bottom(bottom(initial.nodes)) - top(top(initial.nodes))), round(right(right(initial.nodes)) - left(left(initial.nodes))));
  var updatedResult = Math.max(round(bottom(bottom(updated.nodes)) - top(top(updated.nodes))), round(right(right(updated.nodes)) - left(left(updated.nodes))));
  return {
    value: initialResult !== 0 ? updatedResult / initialResult : -1,
    initial: initialResult,
    updated: updatedResult
  };
};
var SpreadBoundingBoxL1MetricLengthCriteria = criteriaWrap({
  criteria: l1MetricLength,
  name: 'spread/bounding-box/l1-metric-length',
  "short": 'sp_bb_l1ml'
});

// TODO: SSS*12

var sizeIncrease = function sizeIncrease(initial, updated) {
  var initialHull = polygonHull(convertNodes$1(initial.nodes));
  var updatedHull = polygonHull(convertNodes$1(updated.nodes));
  if (initialHull === null || updatedHull === null) return {
    value: -1,
    error: 'could not compute initial or updated convex hull'
  };
  var initialArea = polygonArea(initialHull);
  var updatedArea = polygonArea(updatedHull);
  return {
    value: updatedArea / initialArea,
    initial: initialArea,
    updated: updatedArea
  };
};

function convertNodes$1(nodes) {
  // TODO: add node boxes
  return ___default.flatMap(nodes, function (n) {
    var t = top(n),
        l = left(n),
        r = right(n),
        b = bottom(n);
    return [[l, t], [r, t], [r, b], [l, b]];
  });
}

var SpreadConvexHullAreaCriteria = criteriaWrap({
  criteria: sizeIncrease,
  name: 'spread/convex-hull/area',
  "short": 'sp_ch_a'
});

var Spread = {
  BoundingBox: {
    Area: SpreadBoundingBoxAreaCriteria,
    NormalizedArea: SpreadBoundingBoxNormalizedAreaCriteria,
    L1MetricLength: SpreadBoundingBoxL1MetricLengthCriteria
  },
  ConvexHull: {
    Area: SpreadConvexHullAreaCriteria
  }
};

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var manager = {
  criterias: {},
  add: function add() {
    var _this = this;

    for (var _len = arguments.length, criterias = new Array(_len), _key = 0; _key < _len; _key++) {
      criterias[_key] = arguments[_key];
    }

    ___default.forEach(criterias, function (c) {
      var name = c.name;
      if (!_this.criterias[name]) _this.criterias[name] = c;else console.error('criterias', 'add', name);
    });
  },
  "delete": function _delete(name) {
    if (this.criterias[name]) delete this.criterias[name];else console.error('criterias', 'delete', name);
  },
  batch: function batch(initial, updatedGraphs) {
    var _this2 = this;

    var list = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ___default.keys(this.criterias);
    var results = [];

    ___default.forEach(list, function (name) {
      results.push(_objectSpread({
        name: name
      }, _this2.execute(name, initial, updatedGraphs)));
    });

    return results;
  },
  execute: function execute(criteria, initial, updatedGraphs) {
    var _this3 = this;

    if (typeof criteria === 'string') {
      if (this.criterias[criteria]) criteria = this.criterias[criteria];
      throw Error("Cannot execute a criteria that wasn't added : " + criteria);
    }

    if (!isCriteria(criteria)) throw Error(criteria + ' cannot be used as a criteria, the structure does not match');
    var results = {};
    var start = new Date();

    ___default.forEach(updatedGraphs, function (updated, name) {
      results[name] = _this3.evaluate(criteria, initial, updated);
    });

    var diff = new Date().getTime() - start.getTime();
    return {
      results: results,
      time: diff
    };
  },
  evaluate: function evaluate(criteria, initial, updated) {
    if (typeof criteria === 'string') {
      if (this.criterias[criteria]) criteria = this.criterias[criteria];else throw Error("Cannot execute a criteria that wasn't added : " + criteria);
    }

    if (isCriteria(criteria)) return criteria.criteria(initial, updated);
    throw Error(criteria + ' cannot be used as a criteria, the structure does not match');
  }
};

export default manager;
export { EdgeBased, GlobalShape, NodeMovement, OrthogonalOrdering, Spread, manager };
