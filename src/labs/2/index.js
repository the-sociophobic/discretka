import React, { Component } from 'react'

import truthTable from './truthTable'
import {
  negate,
  calcBDD,
  calcSKNF,
  calcSDNF,
  calcZhegalkin,
  printForm,
  printZhegalkin,
  calcByTruthTable,
  calcBySDNF,
} from './fns'

import initialTreeImg from './img/initialTree.png'
import shortenedTreeImg from './img/shortenedTree.png'
import BDDImg from './img/BDD.png'
import syntacticTreeImg from './img/syntacticTree.png'


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

  render = () => (
    <div className="lab">
      <h3>Исходная булева функция, заданная с помощью Таблицы Истинности:</h3>
      <h3>{truthTable.reduce((a, b) => a + "" + b)}</h3>
      <br /><br />
      <div className="image-gallery">
        {[
          {
            src: initialTreeImg,
            text: "Бинарное Дерево Решений",
          },
          {
            src: shortenedTreeImg,
            text: "Сокращенное Дерево Решений",
          },
          {
            src: BDDImg,
            text: "Бинарная Диаграмма Решений",
          },
          {
            src: syntacticTreeImg,
            text: "Синтаксическое Дерево",
          },
        ].map(elem => (
          <div className="image-gallery__item">
            <div className="image-gallery__item__img-container">
              <img src={elem.src} />
            </div>
            <div className="image-gallery__item__text">
              {elem.text}
            </div>
          </div>
        ))}
      </div>
      Исходная булева функция: {truthTable.reduce((a, b) => a + "" + b)} <br />
      Полином Жегалкина: {printZhegalkin(calcZhegalkin(truthTable))} <br />
      СДНФ: {printForm(calcSDNF(truthTable), "∧", " ∨ ")} <br />
      СКНФ: {printForm(calcSKNF(truthTable), "∨", " ∧ ")} <br />
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
              onClick={() => this.setState({[key]: negate(this.state[key])})}
            >
              поменять
            </button>
          </div>
        )}
      </div>
      <br /><br /><br />
      Результат по БДД: {calcBDD(this.state.x, this.state.y, this.state.z, this.state.w)}
      <br />
      Результат по СДНФ: {calcBySDNF(this.state.x, this.state.y, this.state.z, this.state.w, calcSDNF(truthTable))}
      <br />
      Результат по Таблице Истинности: {calcByTruthTable(this.state.x, this.state.y, this.state.z, this.state.w, truthTable)}
    </div>
  )
}