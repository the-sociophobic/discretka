const maxLength = 8
const plusOneTable = [1, 4, 6, 7, 2, 3, 5, 0]
const neutralSumElemIndex = 7
// const realTable = [0, 1, 4, 2, 6, 5, 3, 7]
const realTable = [0, 1, 3, 6, 2, 5, 4, 7]

const additionTable = [
  [0, 1, 2, 3, 4, 5, 6, 7],
  [1, 4, 6, 7, 2, 3, 5, 0],
  [2, 6, 3, 1, 5, 0, 7, 4],
  [3, 7, 1, 6, 0, 2, 4, 5],
  [4, 2, 5, 0, 6, 7, 3, 1],
  [5, 3, 0, 2, 7, 4, 1, 6],
  [6, 5, 7, 4, 3, 1, 0, 2],
  [7, 0, 4, 5, 1, 6, 2, 3],
]

const additionOverflowTable = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1],
  [0, 0, 0, 1, 0, 1, 0, 1],
  [0, 0, 1, 1, 1, 1, 1, 1],
  [0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 1, 1, 0, 1, 1, 1],
  [0, 0, 0, 1, 0, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 1],
]

const multiplicationTable = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 2, 3, 4, 5, 6, 7],
  [0, 2, 1, 4, 3, 7, 6, 5],
  [0, 3, 4, 6, 6, 3, 0, 4],
  [0, 4, 3, 6, 6, 4, 0, 3],
  [0, 5, 7, 3, 4, 1, 6, 2],
  [0, 6, 6, 0, 0, 6, 0, 6],
  [0, 7, 5, 4, 3, 2, 6, 1],
]

const multiplicationOverflowTable = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 2, 0, 1, 1, 4],
  [0, 0, 2, 6, 1, 4, 2, 5],
  [0, 0, 0, 1, 0, 1, 1, 1],
  [0, 0, 1, 4, 1, 2, 4, 6],
  [0, 0, 1, 2, 1, 4, 4, 2],
  [0, 0, 4, 5, 1, 6, 2, 3],
]

export {
  realTable,
  maxLength,
  plusOneTable,
  neutralSumElemIndex,
  additionTable,
  additionOverflowTable,
  multiplicationTable,
  multiplicationOverflowTable,
}