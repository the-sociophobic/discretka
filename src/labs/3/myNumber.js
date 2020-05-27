import {
  realTable,
  maxLength,
} from './tables'
import {
  plusOne,
  charAddition,
  addition ,
  LeftCircularShift,
  RightCircularShift,
  charMultiplication,
  multiplication,
  substraction,
  compare,
} from './fns'
  


const summateMindingNuances = (a, b, isPlusOperator) => {
  if ((a.negative === b.negative && isPlusOperator) ||
      (a.negative !== b.negative && !isPlusOperator))
    return new myNumber({
      array: addition(a.array, b.array),
      negative: a.negative,
    })
  
  if (compare(a.array, b.array) === 0)
    return new myNumber()

  if (compare(a.array, b.array) === -1)
    return new myNumber({
      array: substraction(b.array, a.array),
      negative: b.negative
    })

  return new myNumber({
    array: substraction(a.array, b.array),
    negative: a.negative
  })
}

const divideMindingNuances = (a, b) => {
  let res = new myNumber(),
      remainder = new myNumber()

  if (b.isZero()) {
    if (a.isZero()) {
      res.error = "Любое число в [-77777777;77777777]"
      remainder.error = ""
    }
    else {
      res.error = "На 0 делить не стоит"
      remainder.error = ""
    }
  } else {
    let counter = new myNumber(),
        tmpA = new myNumber(a),
        tmpB = new myNumber(b)
    var backUpCounter = 0
  
    tmpB.negative = false

    if (a.negative) {
      while (tmpA.negative && backUpCounter < 10000) {
        backUpCounter++
        tmpA = tmpA.add(tmpB)
        counter = counter.add(new myNumber("1"))
      }

      if (!b.negative)
        counter.negative = true
    } else {
      while(compare(tmpA.array, b.array) >= 0 && backUpCounter < 10000) {
        backUpCounter++
        tmpA = tmpA.substract(tmpB)
        counter = counter.add(new myNumber("1"))
      }
  
      if (b.negative)
        counter.negative = true
    }
  
    res = counter
    remainder = tmpA 
  }

  return ({
    res: res,
    remainder: remainder
  })
}



class myNumber {
  constructor(props) {
    if (Array.isArray(props)) {
      this.negative = false
      this.array = props
      return
    }
    if (typeof props === "object") {
      this.array = props.array
      this.negative = props.negative
      return
    }
    //DEFAULT STRING
    if (!props || props.length === 0) {
      this.negative = false      
      this.array = Array.from(
        {length: maxLength},
        () => 0
      )
    }
    else {
      this.negative = props.charAt(0) === "-"
      const inputArray = [...props.replace("-", "")].slice().reverse().map(number => parseInt(number))

      this.array = Array.from(
        {length: maxLength},
        (item, index) => index < inputArray.length ? inputArray[index] : 0
      )
    }
  }

  isZero = () =>
    this.array
      .filter(char => char !== 0)
      .length === 0

  add = b =>
    summateMindingNuances(this, b, true)

  multiply = b => {
    let res = new myNumber(multiplication(this.array, b.array))

    if (this.negative !== b.negative)
      res.negative = true

    return res
  }

  substract = b =>
    summateMindingNuances(this, b, false)
  
  divide = b =>
    divideMindingNuances(this, b).res

  remainderOfDivision = b =>
    divideMindingNuances(this, b).remainder


  print = () => {
    if (this.error)
      return this.error

    let zeroFlag = true

    return (this.negative ? "-" : "") +
      this.array
        .slice().reverse()
        .map((char, index) => {
          if (char === 0 && zeroFlag && index !== maxLength - 1)
            return ""
          zeroFlag = false
          return char
        })
        .reduce((a, b) => a + "" + b)
  }

  printDec = () => {
    let res = this.array
      .slice().reverse()
      .map(char => realTable[char])
      .reduce((a, b) => a * maxLength + b)

    return (this.negative ? "-" : "") + res
  }
}

export default myNumber