import React from 'react'
import IndexRouter from './router/IndexRouter'
import { Provider } from 'react-redux';
import './App.scss';
import storex from './redux/storex';
import { BrowserRouter } from 'react-router-dom';
export default function App () {
  return (
    <BrowserRouter>
      <Provider store={storex}>
        <IndexRouter></IndexRouter>
      </Provider>
    </BrowserRouter>

  )
}
