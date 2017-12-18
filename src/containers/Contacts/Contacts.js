import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from 'axios';


class Contacts extends Component{

  state = {
    contacts: [],
    selected_contacts: []
  }
  
  componentDidMount(){
    axios.get("https://react-contacts-f961b.firebaseio.com/contacts.json")
      .then((response) => {
        const contacts = [];
        for(let key in response.data){
          contacts.push({
            ...response.data[key],
            id: key
          })
        }
        this.setState({contacts:  contacts})
      })
  }

  checkboxHanlder = (contact_id) => {
    let update_selected_contacts = this.state.selected_contacts.concat(contact_id);
    this.setState({selected_contacts: update_selected_contacts})
  }

  destroyContactHanlder = (contact_id) => {
    return (event) => {
      event.preventDefault();
      if(window.confirm("Are you sure want to delete?")){
        this.destroyContact(contact_id);
      }
    }
  }

  removeContacts = (e) => {
    e.preventDefault();
    if(window.confirm("Are you sure want to remove selected contacts?")){
      let remove_contacts = [...this.state.selected_contacts];
      remove_contacts.forEach((contact_id, index) => {
        this.destroyContact(contact_id);
      })
    }
  }

  destroyContact = (contact_id) => {
    axios.delete(`https://react-contacts-f961b.firebaseio.com/contacts/${contact_id}.json`)
    .then(response => {
      if(response.status === 200){
          let latestContacts = this.state.contacts;
          let latest_contacts = latestContacts.filter(contact => contact.id !== contact_id);
          this.setState({contacts: latest_contacts});
      }
    })
  }

  render(){
    let contactsUI = null;
    if(this.state.contacts){
      contactsUI = this.state.contacts.map(contact => {
        return <tr key={contact.id}>
          <td>
            <input type="checkbox"   onClick={() => this.checkboxHanlder(contact.id)} />
          </td>
          <td>
            {contact.type}
          </td>
          <td>
            {contact.name}
          </td>
          <td>
            {contact.title}
          </td>
          <td>
            {contact.phone}
          </td>
          <td>
            {contact.fax}
          </td>
          <td>
            {contact.email_group}
          </td>
          <td>
            <Link to={`/contacts/${contact.id}/edit`} className="btn btn-success">Edit</Link>
          </td>
          <td>
            <button
              onClick={this.destroyContactHanlder(contact.id)} 
              className="btn btn-warning" >Remove</button>
          </td>
        </tr>
      });
    }

    return(
      <section>
        <div className="row">
          <div className="col-sm-12 col-md-2">
            <Link to="/contacts/new" className="btn btn-info">Add Contact</Link>  
          </div>
          <div className=" col-sm-12 col-md-7">
            <h3 className="text-success">Contacts List</h3>
          </div>
          <div className="col-sm-12 col-md-3">
            <button className="btn btn-warning" onClick={this.removeContacts}>Remove Contacts</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
              <table className="table table-bordered table-striped table-hover table-responsive w-100 d-block d-sm-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Phone</th>
                    <th>Fax</th>
                    <th>Email Group</th>
                    <th>Actions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                  contactsUI
                  }
                </tbody>
              </table>
            </div>
          </div>
      </section>
    )
  }
}

export default Contacts;