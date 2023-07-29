import React from 'react'
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import Login from '../views/login/Login'
import PcbLayout from '../views/PcbLayout'
import BackDoor from '../views/backdoor/BackDoor';

export default function IndexRouter () {

  // const { token } = useAppContext()

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/changerole' component={BackDoor}></Route>
        <Route path='/' render={(props) => {
          return localStorage.getItem('accessToken') ?
            <PcbLayout></PcbLayout> :
            <Redirect to='/login' />
        }
        } />
      </Switch>
    </BrowserRouter>
  )
}
