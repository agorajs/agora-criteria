import NodeMouvementDistanceMovedCustomCriteria from './dm-ime';

const init = {
  nodes: [
    { index: 0, x: 10, y: 10, label: '0', width: 1, height: 1 },
    { index: 1, x: 10, y: 20, label: '0', width: 1, height: 1 },
    { index: 3, x: 20, y: 20, label: '0', width: 1, height: 1 },
    { index: 4, x: 20, y: 10, label: '0', width: 1, height: 1 },
    { index: 5, x: 15, y: 22, label: '0', width: 1, height: 1 },
    { index: 6, x: 14, y: 23, label: '0', width: 1, height: 1 }
  ],
  edges: []
};

const change = {
  nodes: [
    { index: 0, x: 12, y: 10, label: '0', width: 1, height: 1 },
    { index: 1, x: 10, y: 20, label: '0', width: 1, height: 1 },
    { index: 3, x: 20, y: 20, label: '0', width: 1, height: 1 },
    { index: 4, x: 20, y: 10, label: '0', width: 1, height: 1 },
    { index: 5, x: 15, y: 22, label: '0', width: 1, height: 1 },
    { index: 6, x: 14, y: 23, label: '0', width: 1, height: 1 }
  ],
  edges: []
};

const doubleInitX = {
  nodes: [
    { index: 0, x: 20, y: 10, label: '0', width: 1, height: 1 },
    { index: 1, x: 20, y: 20, label: '0', width: 1, height: 1 },
    { index: 3, x: 40, y: 20, label: '0', width: 1, height: 1 },
    { index: 4, x: 40, y: 10, label: '0', width: 1, height: 1 },
    { index: 5, x: 30, y: 22, label: '0', width: 1, height: 1 },
    { index: 6, x: 28, y: 23, label: '0', width: 1, height: 1 }
  ],
  edges: []
};

const doubleInitY = {
  nodes: [
    { index: 0, x: 10, y: 20, label: '0', width: 1, height: 1 },
    { index: 1, x: 10, y: 40, label: '0', width: 1, height: 1 },
    { index: 3, x: 20, y: 40, label: '0', width: 1, height: 1 },
    { index: 4, x: 20, y: 20, label: '0', width: 1, height: 1 },
    { index: 5, x: 15, y: 44, label: '0', width: 1, height: 1 },
    { index: 6, x: 14, y: 46, label: '0', width: 1, height: 1 }
  ],
  edges: []
};

const doubleXY = {
  nodes: [
    { index: 0, x: 20, y: 20, label: '0', width: 1, height: 1 },
    { index: 1, x: 20, y: 40, label: '0', width: 1, height: 1 },
    { index: 3, x: 40, y: 40, label: '0', width: 1, height: 1 },
    { index: 4, x: 40, y: 20, label: '0', width: 1, height: 1 },
    { index: 5, x: 30, y: 44, label: '0', width: 1, height: 1 },
    { index: 6, x: 28, y: 46, label: '0', width: 1, height: 1 }
  ],
  edges: []
};

const nudgedDoubleXY = {
  nodes: [
    { index: 0, x: 10, y: 21, label: '0', width: 1, height: 1 },
    { index: 1, x: 10, y: 40, label: '0', width: 1, height: 1 },
    { index: 3, x: 30, y: 40, label: '0', width: 1, height: 1 },
    { index: 4, x: 30, y: 20, label: '0', width: 1, height: 1 },
    { index: 5, x: 20, y: 44, label: '0', width: 1, height: 1 },
    { index: 6, x: 18, y: 46, label: '0', width: 1, height: 1 }
  ],
  edges: []
};
test('Custom is working correctly', () => {
  expect(NodeMouvementDistanceMovedCustomCriteria.criteria(init, init)).toEqual(
    {
      value: 0,
      displacement: [0, 0, 0, 0, 0, 0]
    }
  );

  expect(
    NodeMouvementDistanceMovedCustomCriteria.criteria(init, change)
  ).toEqual({ displacement: [2, 0, 0, 0, 0, 0], value: 0.6666666666666666 });

  expect(
    NodeMouvementDistanceMovedCustomCriteria.criteria(init, doubleInitX)
  ).toEqual({
    value: 0,
    displacement: [0, 0, 0, 0, 0, 0]
  });

  expect(
    NodeMouvementDistanceMovedCustomCriteria.criteria(init, doubleInitY)
  ).toEqual({
    value: 0,
    displacement: [0, 0, 0, 0, 0, 0]
  });

  expect(
    NodeMouvementDistanceMovedCustomCriteria.criteria(init, doubleXY)
  ).toEqual({
    value: 0,
    displacement: [0, 0, 0, 0, 0, 0]
  });

  expect(
    NodeMouvementDistanceMovedCustomCriteria.criteria(init, nudgedDoubleXY)
  ).toEqual({
    value: 0.16666666666666666,
    displacement: [1, 0, 0, 0, 0, 0]
  });
});
