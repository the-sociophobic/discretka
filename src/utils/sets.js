import randomArrayElements from './randomArrayElements'


const grayCode = i =>
  i ^ (i >> 1)

const toBinaryString = (number, dimension) =>
  Array.from(
    {length: dimension},
    (item, pos) => (number & (1 << (dimension - pos - 1))) > 0 ? "1" : "0"
  )
  .reduce((a, b) => a + b)

const generateUniversum = dimension =>
  dimension === 0 ?
    []
    :
    Array.from(
      {length: 2 ** dimension},
      (item, index) => toBinaryString(
        grayCode(index),
        dimension
      )
    )

const generateRandomSet = (size, universum) =>
  randomArrayElements(universum, size)

const unionSets = (setA, setB) => [
  ...setA,
  ...setB
]

const intersectionSets = (setA, setB) =>
  setA
    .filter(elem => setB.includes(elem))

const relativeComplementSets = (setA, setB) =>
  setA
    .filter(elem => !setB.includes(elem))

const symmetricDifferenceSets = (setA, setB) =>
  unionSets(
    relativeComplementSets(setA, setB),
    relativeComplementSets(setB, setA),
  )

const complementSets = (setA, universum) =>
  relativeComplementSets(
    universum,
    setA,
  )


export {
  generateUniversum,
  generateRandomSet,

  unionSets,
  intersectionSets,
  relativeComplementSets,
  symmetricDifferenceSets,
  complementSets,
}