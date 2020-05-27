import React from 'react'


export default props =>
  props.set.length === 0 ?
    <div className="w-100">
      ∅
    </div>
    :
    Array.from(new Set(props.set))
      .map((elem, index) =>
        <div
          className="w-100"
          key={elem + index}
        >
          {index + 1}) {elem}
        </div>
      )