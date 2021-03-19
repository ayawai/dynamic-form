import * as React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import App from '../App';
import FormLists from '../pages/FormLists/index'
import View from '../pages/Viewable/index'
import Users from '../pages/Users/index'
import Allocation from '../pages/Allocation/index'
import LoginPage from '../Login';

export default function Routes() {
  
  return <Switch>
      <Route exact path='/'>
        <FormLists />
      </Route>
      <Route exact path='/user'>
        <Users />
      </Route>
      <Route exact path='/view'>
        <View />
      </Route>
      <Route exact path='/allocation'>
        <Allocation />
      </Route>
      <Route exact path='/login'>
        <LoginPage />
      </Route>
    </Switch>
}