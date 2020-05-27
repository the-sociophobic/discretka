import myNumber from './myNumber'

import {
  neutralSumElemIndex,
  maxLength,
  plusOneTable,
  additionTable,
  additionOverflowTable,
  multiplicationTable,
  multiplicationOverflowTable,
} from './tables'


const plusOne = char =>
  ({
    res: plusOneTable[char],
    overflow: additionOverflowTable[char][1]
  })

const charAddition = (a, b) => ({
  res: additionTable[a][b],
  overflow: additionOverflowTable[a][b],
})

const addition = (a, b) => {
  let overflow = 0

  const res = a.map((Achar, index) => {
    const Bchar = b[index]
    const charSum = charAddition(Achar, Bchar)
    const charSumPlusOverflow = charAddition(charSum.res, overflow)

    overflow = charSum.overflow || charSumPlusOverflow.overflow

    return charSumPlusOverflow.res
  })

  return res
}


const LeftCircularShift = (array, value) =>
  [
    ...(new Array(value).fill(0)),
    ...array.slice(0, maxLength - value),
  ]
const RightCircularShift = (array, value) =>
  [
    ...array.slice(value),
    ...(new Array(value).fill(0)),
  ]

const charMultiplication = (a, b) => ({
  res: multiplicationTable[a][b],
  overflow: multiplicationOverflowTable[a][b],
})

const multiplication = (a, b) => {
  let res = new Array(maxLength).fill(0)
  let overflow = 0

  for (let i = 0; i < maxLength; i++) {
    const Achar = a[i]
    let AcharMultiplicationProduct = new Array(maxLength).fill(0)

    for (let j = 0; j < maxLength; j++) {
      const Bchar = b[j]
      const charMultiplicationProduct = charMultiplication(Achar, Bchar)
      const charMultiplicationProductPlusOverflow = charAddition(
        charMultiplicationProduct.res, overflow)

      overflow = charAddition(
        charMultiplicationProduct.overflow,
        charMultiplicationProductPlusOverflow.overflow
      ).res

      AcharMultiplicationProduct = addition(
        AcharMultiplicationProduct,
        LeftCircularShift(
          [charMultiplicationProductPlusOverflow.res, 0, 0, 0, 0, 0, 0, 0], j)
      )
    }

    res = addition(res, LeftCircularShift(AcharMultiplicationProduct, i))
    overflow = 0
  }

  return res
}


const charSubstraction = (a, b) => ({
  res: additionTable[a][additionTable[b].indexOf(0)],
  overflow: charCompare(a, b) === -1 ? 1 : 0,
})

const substraction = (a, b) => {
  let overflow = 0

  const res = a.map((Achar, index) => {
    const Bchar = b[index]
    const charSub = charSubstraction(Achar, Bchar)
    const charSubPlusOverflow = charSubstraction(charSub.res, overflow)

    overflow = charSub.overflow || charSubPlusOverflow.overflow

    return charSubPlusOverflow.res
  })

  return res
}


//return 0 if equal, -1 if a less than b, 1 if a is greater than b
const charCompare = (a, b) => {
  if (a === b)
    return 0

  let AcharSize = 0,
      Atmp = plusOneTable[neutralSumElemIndex]
  let BcharSize = 0,
      Btmp = plusOneTable[neutralSumElemIndex]

  while (Atmp !== a) {
    Atmp = plusOne(Atmp).res
    AcharSize++
  }
  while (Btmp !== b) {
    Btmp = plusOne(Btmp).res
    BcharSize++
  }

  if (AcharSize > BcharSize)
    return 1
  return -1
}

const compare = (a, b) => {
  let i = 0

  while (charCompare(a.slice().reverse()[i], b.slice().reverse()[i]) === 0
        && i < maxLength)
    i++

  if (i === maxLength)
    return 0
  
  return charCompare(a.slice().reverse()[i], b.slice().reverse()[i])
}


export {
  plusOne,
  charAddition,
  addition ,
  LeftCircularShift,
  RightCircularShift,
  charMultiplication,
  multiplication,
  substraction,
  charCompare,
  compare
}