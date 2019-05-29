import OrthogonalOrderingCriteria from './original';
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

const nochange = {
  nodes: [
    { index: 0, x: 10, y: 10, label: '0', width: 1, height: 1 },
    { index: 1, x: 10, y: 20, label: '0', width: 1, height: 1 },
    { index: 3, x: 20, y: 20, label: '0', width: 1, height: 1 },
    { index: 4, x: 20, y: 10, label: '0', width: 1, height: 1 },
    { index: 5, x: 15, y: 22, label: '0', width: 1, height: 1 },
    { index: 6, x: 12, y: 23, label: '0', width: 1, height: 1 }
  ],
  edges: []
};
test('OrthogonalOrdering is working correctly', () => {
  expect(OrthogonalOrderingCriteria.criteria(init, init)).toEqual({
    value: 1
  });
  expect(OrthogonalOrderingCriteria.criteria(init, change)).toEqual({
    value: 0
  });
  expect(OrthogonalOrderingCriteria.criteria(init, nochange)).toEqual({
    value: 1
  });
});
