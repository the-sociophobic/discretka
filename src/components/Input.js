import React from 'react'


const Input = props => (
  <div className="position-relative">
    <div className="input__label">
      {props.label}
    </div>
    <input
      className="input"
      value={props.value}
      onChange={e => {
        let value

        switch (true) {
          case props.naturalNumber:
            value = e.target.value.toString().replace(/[^0-9]/g, '').replace(/^0*/g, '')
            break
          case props.zeroNumber:
            value = e.target.value.toString().replace(/[^0-9]/g, '')
            if (value.length === 0 || value.charAt(0) === "0")
              value = 0
            value = parseInt(value)
            break
          default:
            value = e.target.value
        }

        props.onChange(value)
      }}
      placeholder={props.placeholder}
    />
  </div>
)

export default Input