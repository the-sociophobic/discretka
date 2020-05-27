const grayCode = i =>
  i ^ (i >> 1)

const toBinaryString = (number, dimension) =>
  Array.from(
    {length: dimension},
    (item, pos) => (number & (1 << (dimension - pos - 1))) > 0 ? "1" : "0"
  )
  .reduce((a, b) => a + b)

const generateUniversum = universumDimension =>
  universumDimension === 0 ?
    []
    :
    Array.from(
      {length: 2 ** universumDimension},
      (item, index) => toBinaryString(
        grayCode(index),
        universumDimension
      )
    )

const getPower = universumDimension =>
  2 ** universumDimension

const generateRandomSet = (size, universum) =>
  Array.from(
    {length: size},
    () => universum[
      Math.floor(Math.random() * (universum.length - 1))
    ]
  )

const unionSets = (setA, setB) => [
  ...setA,
  ...setB
]

const intersectionSets = (setA, setB) => {
  const filteredSetA = setA.filter(elem => setB.includes(elem))
  let res = []

  Array.from(new Set(filteredSetA)).forEach(elem => {
    const amountInSetA = setA.filter(item => item === elem).length
    const amountInSetB = setB.filter(item => item === elem).length

    res = [
      ...res,
      ...Array.from(
        {length: Math.max(amountInSetA, amountInSetB)},
        () => elem
      )
    ]
  })

  return res
}

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
  getPower,
  
  generateUniversum,
  generateRandomSet,

  unionSets,
  intersectionSets,
  relativeComplementSets,
  symmetricDifferenceSets,
  complementSets,
}