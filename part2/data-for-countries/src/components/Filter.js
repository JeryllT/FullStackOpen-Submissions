import React from "react"

const Filter = ({curSearch, handleChange}) => (
    <div>
      <p>find countries <input value={curSearch} onChange={handleChange} /></p>
    </div>
  )

export default Filter