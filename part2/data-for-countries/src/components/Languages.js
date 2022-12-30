import React from "react"

const Language = ({language}) => <li>{language}</li>

const Languages = ({languages}) => {

  const lang = []
  for (const l in languages) lang.push(languages[l])

  return (
  <ul>
    {lang.map((language, index) => <Language key={index} language={language} />)}
  </ul>
  )
}

export default Languages