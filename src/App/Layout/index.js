import React from 'react'
import { Route } from 'react-router-dom';

export const LayoutHome = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
    <div className="App">
      <Component {...props} />
    </div>
    )} />
  )
}