import OrthogonalOrderingNumberInversionsCriteria from "./number-inversions-sss12";

const init = {
  nodes: [
    { index: 0, x: 10, y: 10, label: "0", width: 1, height: 1 },
    { index: 1, x: 10, y: 20, label: "0", width: 1, height: 1 },
    { index: 3, x: 20, y: 20, label: "0", width: 1, height: 1 },
    { index: 4, x: 20, y: 10, label: "0", width: 1, height: 1 },
    { index: 5, x: 15, y: 22, label: "0", width: 1, height: 1 },
    { index: 6, x: 14, y: 23, label: "0", width: 1, height: 1 }
  ],
  edges: []
};

const nochange = {
  nodes: [
    { index: 0, x: 12, y: 10, label: "0", width: 1, height: 1 },
    { index: 1, x: 10, y: 20, label: "0", width: 1, height: 1 },
    { index: 3, x: 20, y: 20, label: "0", width: 1, height: 1 },
    { index: 4, x: 20, y: 10, label: "0", width: 1, height: 1 },
    { index: 5, x: 15, y: 22, label: "0", width: 1, height: 1 },
    { index: 6, x: 14, y: 23, label: "0", width: 1, height: 1 }
  ],
  edges: []
};

const onechange = {
  nodes: [
    { index: 0, x: 15, y: 10, label: "0", width: 1, height: 1 },
    { index: 1, x: 10, y: 20, label: "0", width: 1, height: 1 },
    { index: 3, x: 20, y: 20, label: "0", width: 1, height: 1 },
    { index: 4, x: 20, y: 10, label: "0", width: 1, height: 1 },
    { index: 5, x: 15, y: 22, label: "0", width: 1, height: 1 },
    { index: 6, x: 14, y: 23, label: "0", width: 1, height: 1 }
  ],
  edges: []
};

const ninechange = {
  nodes: [
    { index: 0, x: 20, y: 10, label: "0", width: 1, height: 1 },
    { index: 1, x: 30, y: 20, label: "0", width: 1, height: 1 },
    { index: 3, x: 20, y: 20, label: "0", width: 1, height: 1 },
    { index: 4, x: 10, y: 10, label: "0", width: 1, height: 1 },
    { index: 5, x: 15, y: 22, label: "0", width: 1, height: 1 },
    { index: 6, x: 14, y: 23, label: "0", width: 1, height: 1 }
  ],
  edges: []
};

test("OrthogonalOrdering.NumberInversions is working correctly", () => {
  expect(
    OrthogonalOrderingNumberInversionsCriteria.criteria(init, init)
  ).toEqual({
    value: 0
  });
  expect(
    OrthogonalOrderingNumberInversionsCriteria.criteria(init, nochange)
  ).toEqual({
    value: 0
  });
  expect(
    OrthogonalOrderingNumberInversionsCriteria.criteria(init, onechange)
  ).toEqual({
    value: 1
  });
  expect(
    OrthogonalOrderingNumberInversionsCriteria.criteria(init, ninechange)
  ).toEqual({
    value: 9
  });
});
