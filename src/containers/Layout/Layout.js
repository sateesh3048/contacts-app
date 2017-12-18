import React, { Component } from 'react';
import Contacts from '../Contacts/Contacts';
import NewContact from '../NewContact/NewContact';
import EditContact from '../EditContact/EditContact';
import { Route, Switch, NavLink, Redirect} from 'react-router-dom';
import Support from '../../components/Support/Support';

class Layout extends Component {
  render(){
    return (
      <div>
        <header className="mb-5">
          <nav className="nav nav-pills nav-fill">
            <NavLink to="/contacts" className="nav-item nav-link"> Contacts</NavLink>
            <NavLink to="/support" className="nav-item nav-link"> Support</NavLink>
          </nav>     
        </header>   
        <Switch>
          <Route path="/contacts" exact component={Contacts} />
          <Route path="/contacts/new" exact component={NewContact} />
          <Route path="/contacts/:id/edit" exact component={EditContact} />
          <Route path="/support" exact component={Support} />
          <Redirect exact from="/" to="/contacts" />
          <Route render={() => <h1 className="text-center text-info">Sorry Route Not Found</h1>} />
        </Switch>
      </div>
    )
  }
}

export default Layout;
