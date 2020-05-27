import React, { Component, Fragment } from 'react'

import Input from 'components/Input'

import line from './line'

import { countData } from './utils'


export default class Lab2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      z: 0,
      w: 0,
    }
  }

  render = () => {
    const {
      outputSDNF,
      outputSKNF,
      outputCompare,
      outputZhegalkin,
    } = countData(line, this.state)

    return (
      <div className="lab">
        <h1 className="h1 mb-5">Лабораторная 2</h1>
        <h3>Исходная булева функция, заданная с помощью таблицы истинности:</h3>
        <h3>{line}</h3>
        <br /><br />
        Полином Жегалкина: {outputZhegalkin} <br />
        СКНФ: {outputSDNF} <br />
        СДНФ: {outputSKNF} <br />
        Подставить значения: <br />
        <div className="">
          {Object.keys(this.state).map(key => 
            <div
              className=""
              key={key}
              style={{float: "left"}}
            >
              {key} = {this.state[key]} <br />
              <button
                className=""
                onClick={() => this.setState({[key]: this.state[key] === 1 ? 0 : 1})}
              >
                поменять
              </button>
            </div>
          )}
        </div>
        <br /><br /><br /><br />
        Результат проверки: {outputCompare}
      </div>
    )
  }
}