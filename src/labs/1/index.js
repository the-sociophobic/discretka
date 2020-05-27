import React, { Component } from 'react'

import Input from 'components/Input'
import SetComponent from 'components/Set'
import SetCreation from './SetCreation'

import {
  generateUniversum,
  unionSets,
  intersectionSets,
  relativeComplementSets,
  symmetricDifferenceSets,
  complementSets,
} from 'utils/sets'
import clamp from 'utils/clamp'


const maxUniversumSize = 5


export default class Lab1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dimension: 2,
      setA: [],
      setB: [],
    }

    this.universum = generateUniversum(maxUniversumSize)
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

  render = () => {
    const { dimension } = this.state
    const universum = this.universum
      .slice(0, dimension === 0 ? 0 : 2 ** dimension)
      .map(elem => elem.slice(maxUniversumSize - dimension))
    const setA = this.state.setA.filter(elem => universum.includes(elem))
    const setB = this.state.setB.filter(elem => universum.includes(elem))

    return (
      <div className="lab">
        <h1 className="h1 mb-2">Лабораторная 1</h1>

        <div className="d-flex justify-content-between mb-5">
          <div className="">
            <Input
              zeroNumber
              value={dimension}
              onChange={value => this.setState({dimension: clamp(value, 0, maxUniversumSize)})}
              label="размерность универсума"
            />
            <h3 className="h3">Универсум</h3>
            <SetComponent set={universum} />
          </div>
          <SetCreation
            name="A"
            set={setA}
            onChange={value => this.setState({setA: value})}
            universum={universum}
          />
          <SetCreation
            name="B"
            set={setB}
            onChange={value => this.setState({setB: value})}
            universum={universum}
          />
        </div>

        <div className="d-flex justify-content-between">
          <div className="">
            <h5 className="h5">A ∪ B</h5>
            <SetComponent set={unionSets(setA, setB)} />
          </div>
          <div className="">
            <h5 className="h5">A ∩ B</h5>
            <SetComponent set={intersectionSets(setA, setB)} />
          </div>
          <div className="">
            <h5 className="h5">A \ B</h5>
            <SetComponent set={relativeComplementSets(setA, setB)} />
          </div>
          <div className="">
            <h5 className="h5">A Δ B</h5>
            <SetComponent set={symmetricDifferenceSets(setA, setB)} />
          </div>
          <div className="">
            <h5 className="h5">Дополнение A до U</h5>
            <SetComponent set={complementSets(setA, universum)} />
          </div>
          <div className="">
            <h5 className="h5">Дополнение B до U</h5>
            <SetComponent set={complementSets(setB, universum)} />
          </div>
        </div>
      </div>
    )
  }
}