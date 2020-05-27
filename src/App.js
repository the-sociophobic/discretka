import React, { Component } from 'react'

import Lab1 from './labs/1'
import Lab2 from './labs/2'
import Lab3 from './labs/3'

import './styles/index.sass'


const labs = [
  {
    name: "Лабораторная работа №1",
    render: () => <Lab1 />,
  },
  {
    name: "Лабораторная работа №2",
    render: () => <Lab2 />,
  },
  {
    name: "Курсовая работа",
    render: () => <Lab3 />,
  }
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentLab: 2
    }
  }
  
  render = () =>
    <div className="App">
      <div className="container">
        <h1
          className="h1 mb-2"
          onClick={() => this.setState({
            currentLab: (this.state.currentLab + 1) % labs.length
          })}
        >
          {labs[this.state.currentLab].name}
        </h1>

        {labs[this.state.currentLab].render()}
      </div>
    </div>
}

export default App
