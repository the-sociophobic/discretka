import React, { Component, Fragment } from 'react'

import Input from 'components/Input'
import SetComponent from 'components/Set'
import SetCreation from './SetCreation'
import { getPower } from '../../utils/sets'

import {
  generateUniversum,
  unionSets,
  intersectionSets,
  relativeComplementSets,
  symmetricDifferenceSets,
  complementSets,
} from 'utils/sets'


export default class Lab1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dimension: 2,
      universum: generateUniversum(2),
      setA: [],
      setB: [],
    }
  }

  renderSet = set =>
    set.length === 0 ?
      <div className="w-100">
        ∅
      </div>
      :
      set
        .map((elem, index) => (
          <div className="w-100">
            {index + 1}) {elem}
          </div>
        ))

  renderUniversum = () => (
    <Fragment>
      <h3 className="h3">Универсум</h3>
      <SetComponent set={this.state.universum} />
      <h3 className="h3">2 множества</h3>
      <div className="row">
        <SetCreation
          set={this.state.setA}
          onChange={value => this.setState({setA: value})}
          universum={this.state.universum}
        />
        <SetCreation
          set={this.state.setB}
          onChange={value => this.setState({setB: value})}
          universum={this.state.universum}
        />
      </div>
      {this.renderOperations()}
    </Fragment>
  )

  renderOperations = () => {
    const { setA, setB, universum } = this.state

    return (
      <Fragment>
        <h3 className="h3">результаты всех действий над множествами</h3>
        <div className="row">
          <div className="col-2">
            <p className="p">Объединение</p>
            <SetComponent set={unionSets(setA, setB)} />
          </div>
          <div className="col-2">
            <p className="p">Пересечение</p>
            <SetComponent set={intersectionSets(setA, setB)} />
          </div>
          <div className="col-2">
            <p className="p">Разность</p>
            <SetComponent set={relativeComplementSets(setA, setB)} />
          </div>
          <div className="col-2">
            <p className="p">Симметрическая разность</p>
            <SetComponent set={symmetricDifferenceSets(setA, setB)} />
          </div>
          <div className="col-2">
            <p className="p">Дополнение A до U</p>
            <SetComponent set={complementSets(setA, universum)} />
          </div>
          <div className="col-2">
            <p className="p">Дополнение B до U</p>
            <SetComponent set={complementSets(setB, universum)} />
          </div>
        </div>
      </Fragment>
    )
  }

  render = () => (
    <div className="lab">
      <h1 className="h1 mb-5">Лабораторная 1</h1>
      <Input
        zeroNumber
        value={this.state.dimension}
        onChange={value => this.setState({
          dimension: value,
          universum: generateUniversum(value)
        })}
        label="размерность универсума"
      />
      <br />
      {this.state.error || this.renderUniversum()}
    </div>
  )
}