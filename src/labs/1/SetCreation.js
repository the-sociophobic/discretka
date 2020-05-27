import React, { Component, Fragment } from 'react'

import Input from 'components/Input'
import SetComponent from 'components/Set'
import { generateRandomSet } from 'utils/sets'


export default class SetCreation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      setSize: props.universum.length,
    }
  }

  renderGenerateButtons = () => (
    <Fragment>
      <Input
        naturalNumber
        value={this.state.setSize}
        onChange={value => this.setState({setSize: value})}
        label="количество элементов мультимножества"
      />
      {this.state.error}
      <button
        onClick={() =>
          this.props.onChange(generateRandomSet(this.state.setSize, this.props.universum))}
      >
        Сгенерировать автоматически
      </button>
      <button onClick={() => this.setState({setCreationType: "manual"})}>
        Сгенерировать вручную
      </button>
    </Fragment>
  )

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

  renderGenerateTypes = () => {
    switch (this.state.setCreationType) {
      case "none":
        return this.renderGenerateButtons()
      case "manual":
        return this.renderManualSetCreation()
      default:
        return <Fragment>
            <h3 className="h3">Автоматически сгенерированное мультимножество ({this.props.set.length} элементов)</h3>
            <SetComponent set={this.props.set} />
          </Fragment>
    }
  }

  render = () => 
    <Fragment>
      <div className="col-1" />
      <div className="col-4">
        <h3 className="h3">Универсум</h3>
        {this.renderUniversumWithButtons()}
        
        <SetComponent set={this.props.set} />
      </div>
      <div className="col-1" />
    </Fragment>
}