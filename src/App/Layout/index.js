import React from 'react'
import { Route } from 'react-router-dom'
import Header from 'App/Components/Header'

export const LayoutHome = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
    <div className="App">
      <Header {...props}/>
      <Component {...props} />
    </div>
    )} />
  )
}