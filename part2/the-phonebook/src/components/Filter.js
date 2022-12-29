import React from "react"

const Filter =({startValue, filter}) => (
    <div>Filter Shown with <input value={startValue} onChange={filter}/></div>
  )

export default Filter