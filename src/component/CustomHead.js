import React from 'react'
import Helmet from 'react-helmet'

function CustomHead ({ children }) {
  return (
    <Helmet>
        {children}
    </Helmet>
  )
}

export default CustomHead