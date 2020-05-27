const variablesNames = ["x", "y", "z", "w"]
const negateSymbol = symbol => String.fromCharCode(symbol.charCodeAt(0), 773)
const negate = number => number === 1 ? 0 : 1


const calcBDD = (x, y, z, w) =>
  y ?
    z ?
      x ?
        w
        :
        1
      :
      negate(w)
    :
    w

const iterateOverTable = fn => {
  for (let index = 0, x = 0; x < 2; x++)
    for (let y = 0; y < 2; y++)
      for (let z = 0; z < 2; z++)
        for (let w = 0; w < 2; w++, index++)
          fn(x, y, z, w, index)
}

const calcSDNF = truthTable => {
  let res = []

  iterateOverTable((x, y, z, w, index) =>
    truthTable[index] &&
      res.push([x, y, z, w])
  )

  return res
}

const calcSKNF = truthTable => {
  let res = []

  iterateOverTable((x, y, z, w, index) =>
    !truthTable[index] &&
      res.push([negate(x), negate(y), negate(z), negate(w)])
  )

  return res
}

const calcZhegalkin = truthTable => {
  let res = [truthTable]

  for (let i = 1; i < truthTable.length; i++) {
    let column = new Array(truthTable.length - i)

    for (let j = i; j < truthTable.length; j++)
      column[truthTable.length - 1 - j] =
        res[i - 1][truthTable.length - j] ^ res[i - 1][truthTable.length - 1 - j]

    res.push(column)
  }

  return res.map(column => column[0])
}

const printForm = (form, delimeter0, delimeter1) =>
  form
    .map(term =>
      term
        .map((termsItem, index) =>
          termsItem ?
            variablesNames[index]
            :
            negateSymbol(variablesNames[index]))
        .reduce((a, b) => a + delimeter0 + b))
    .map(term => `(${term})`)
    .reduce((a, b) => a + delimeter1 + b)

const calcByTruthTable = (x, y, z, w, truthTable) => {
  let res

  iterateOverTable((xi, yi, zi, wi, index) =>
    x === xi &&
    y === yi &&
    z === zi &&
    w === wi &&
    (res = truthTable[index])
  )

  return res
}

const ZhegalkinTerms = [
  "1","x","y","z","w","xy","xz","xw","yz",
  "yw","zw","xyz","xyw","xzw","yzw","xyzw"
]
const printZhegalkin = Zhegalkin =>
  Zhegalkin
    .map((term, index) =>
      term ? ZhegalkinTerms[index] : "")
    .reduce((a, b) => a && b ? `${a} + ${b}` : a + b)

const calcBySDNF = (x, y, z, w, SDNF) =>
  SDNF
    .map(term =>
      term
        .map((termsItem, index) => {
          switch(index) {
            case 0:
              return termsItem ? x : negate(x)
            case 1:
              return termsItem ? y : negate(y)
            case 2:
              return termsItem ? z : negate(z)
            case 3:
              return termsItem ? w : negate(w)
          }
        })
        .reduce((a, b) => a * b))
      .reduce((a, b) => a || b ? 1 : 0)


export {
  negate,
  calcBDD,
  iterateOverTable,
  calcSDNF,
  calcSKNF,
  calcZhegalkin,
  printForm,
  printZhegalkin,
  calcByTruthTable,
  calcBySDNF
}