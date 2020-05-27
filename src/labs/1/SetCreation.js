import React, { Component, Fragment } from 'react'

import Input from 'components/Input'
import SetComponent from 'components/Set'
import { generateRandomSet } from 'utils/sets'
import clamp from 'utils/clamp'


export default class SetCreation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      setSize: props.universum.length,
    }
  }

  renderUniversumWithButtons = () =>
    this.props.universum
      .map((elem, index) => (
        <div className="w-100" key={index}>
          {index + 1}) {elem} -- {
            this.props.set.includes(elem) ?
              <button
                className="d-inline-block"
                onClick={() => this.manualSetPop(index)}
              >
                Удалить
              </button>
              :
              <button
                className="d-inline-block"
                onClick={() => this.manualSetPush(elem)}
              >
                Добавить
              </button>
          }
        </div>
      ))


  manualSetPush = elem =>
    this.props.onChange([
      ...this.props.set,
      elem
    ])

  manualSetPop = index =>
    this.props.onChange([
      ...this.props.set.slice(0, index),
      ...this.props.set.slice(index + 1),
    ])

  render = () => 
    <div className="">
      <Input
        zeroNumber
        value={this.state.setSize}
        onChange={value => this.setState({
          setSize: clamp(value, 0, this.props.universum.length)
        })}
        label="мощность множества"
      />
      <button
        onClick={() =>
          this.props.onChange(
            generateRandomSet(
              this.state.setSize,
              this.props.universum
        ))}
      >
        Сгенерировать автоматически
      </button>
          
      {this.renderUniversumWithButtons()}
      
      <h3 className="h3">Множество {this.props.name}</h3>
      <SetComponent set={this.props.set} />
    </div>
}