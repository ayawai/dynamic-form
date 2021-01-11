import * as React from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import App from '../App';
import FormLists from '../pages/FormLists/index'
import View from '../pages/Viewable/index'
import Allocation from '../pages/Allocation/index'

export default function Routes() {
  
  return <Switch>
      <Route exact path='/'>
        <FormLists />
      </Route>
      <Route exact path='/view'>
        <View />
      </Route>
      <Route exact path='/allocation'>
        <Allocation />
      </Route>
    </Switch>
}