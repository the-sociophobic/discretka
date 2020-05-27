import React, { Component } from 'react'

import Input from 'components/Input'
import { plusOneTable, maxLength } from './tables'
import myNumber from './myNumber'
import tablesImg from './img/tablesImg.png'


const clearString = string => {
  let value = string.replace(/[^0-7\-]/g, '')

  if (value.charAt(0) === "0" || (value.charAt(0) === "-" && value.charAt(1) === "0"))
    value = "0"

  value = value.charAt(0) + value.slice(1).replace("-", "")

  if (value.charAt(0) === "-")
    return value.slice(0, maxLength + 1)
  return value.slice(0, maxLength)
}


export default class Lab3 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stringA: "0",
      stringB: "0",
    }
  }

  render = () => {
    const numberA = new myNumber(this.state.stringA)
    const numberB = new myNumber(this.state.stringB)
    const results = [
      {
        operation: "+",
        res: numberA.add(numberB),
        resDec: parseInt(numberA.printDec()) + parseInt(numberB.printDec())
      },
      {
        operation: "*",
        res: numberA.multiply(numberB),
        resDec: parseInt(numberA.printDec()) * parseInt(numberB.printDec())
      },
      {
        operation: "-",
        res: numberA.substract(numberB),
        resDec: parseInt(numberA.printDec()) - parseInt(numberB.printDec())
      },
      {
        operation: "/",
        resStringHex: numberA.divide(numberB).print() + " " + (!numberA.divide(numberB).error ? numberA.remainderOfDivision(numberB).print() : ""),
        resStringDec: numberA.divide(numberB).printDec() + " " + numberA.remainderOfDivision(numberB).printDec(),
        resDec: ~~(parseInt(numberA.printDec()) / parseInt(numberB.printDec())) + " " + (parseInt(numberA.printDec()) % parseInt(numberB.printDec()))
      },
    ]

    return (
      <div className="lab">
        <div className="d-flex justify-content-between mb-3">
          <div className="">
            <h3>таблица для +1</h3>
            <h3>{plusOneTable.reduce((a, b) => a + "" + b)}</h3>
            <br /><br />
            <Input
              value={this.state.stringA}
              onChange={value => this.setState({stringA: clearString(value)})}
              label="первое число"
            />
            <Input
              value={this.state.stringB}
              onChange={value => this.setState({stringB: clearString(value)})}
              label="второе число"
            />
          </div>
          <div className="" style={{width: "35%"}}>
            <img style={{width: "100%"}} src={tablesImg} />
          </div>
        </div>
        <div className="results">
          <div className="results__item results__item--title">
            <div className="results__item__hex">
              Операции в заданной конечной арифметике
            </div>
            <div className="results__item__dec">
              Результат переведённый в десятичную систему
            </div>
            <div className="results__item__resDec">
              Результат применения оператора к десятичным операндам
            </div>
          </div>
          {results.map(result =>
            <div className="results__item">
              <div className="results__item__hex">
                {numberA.print()} {result.operation} {numberB.print()} = {result.resStringHex || result.res.print()}
              </div>
              <div className="results__item__dec">
                {numberA.printDec()} {result.operation} {numberB.printDec()} = {result.resStringDec || result.res.printDec()}
              </div>
              <div className="results__item__resDec">
                ({result.resDec} должно быть)
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}