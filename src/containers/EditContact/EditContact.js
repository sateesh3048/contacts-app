import React, {Component} from "react";
import axios from "axios";

class EditContact extends Component {
  state = {
    id: null,
    contact: {
      name: '',
      title: '',
      type: '',
      phone: '',
      fax: '',
      email_group: ''
    }
  }
 
  componentDidMount(){
     let id = this.props.match.params.id;
     this.setState({id: id});
     axios.get(`https://react-contacts-f961b.firebaseio.com/contacts.json?orderBy="$key"&equalTo="${id}"`)
     .then(response => {
       let contact = response.data[id];
       const editContact = {...contact}
       this.setState({contact: editContact});
     })
  }

  handleChange = (fieldName) => {
    return (event) => {
      let updateContactForm = {...this.state.contact};
      updateContactForm[fieldName] = event.target.value;
      this.setState({contact: updateContactForm})
    }
  }

    submitContact = (e) => {
      e.preventDefault();
      let updateContact = {...this.state.contact};
      axios.patch(`https://react-contacts-f961b.firebaseio.com/contacts/${this.state.id}.json`, updateContact)
      .then((response) => {
        this.props.history.push("/contacts");
      })
    }

    cancelHandler = () => {
      this.props.history.push("/contacts");
    }
  


  render(){
    let editContactUI = null;
    if(this.state.contact){
      editContactUI = <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" className="form-control" id="Name" 
            value = {this.state.contact.name } 
            onChange={this.handleChange("name")}
            placeholder="Enter Name" /> 
          </div>
          <div className="form-group">
            <label >Title</label>
            <input type="text" className="form-control" id="Title"  
            value = {this.state.contact.title}
            onChange={this.handleChange("title")}
            placeholder="Enter Title" /> 
          </div>
          <div className="form-group">
            <label>Type</label>
            <select className="form-control"
            value = {this.state.contact.type} onChange={this.handleChange("type")} >
              <option>Please Select Type</option>
              <option value="Executive">Executive</option>
              <option value="Inmar_AR">Inmar AR</option>
              <option value="Daily">Daily</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label >Phone</label>
            <input type="tel" className="form-control" id="Phone"  
            value = {this.state.contact.phone}
            onChange={this.handleChange("phone")}
            placeholder="Enter Phone Number" /> 
          </div>

          <div className="form-group">
            <label >Fax</label>
            <input type="text" className="form-control" id="Title"  
            value = {this.state.contact.fax}
            onChange={this.handleChange("fax")}
            placeholder="Enter Fax Details" /> 
          </div>
          <div className="form-group">
            <label >Email Group</label>
            <select className="form-control"
            value = {this.state.contact.email_group} 
            onChange={this.handleChange("email_group")} >
              <option>Please Select Email Group</option>
              <option value="Executive">Executive</option>
              <option value="Inmar_AR">Inmar AR</option>
              <option value="Daily">Daily</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success" onClick={this.submitContact}>Update Contact</button>
          &nbsp;
          <button className="btn btn-danger" onClick={this.cancelHandler} >Cancel</button>
        </form>
    }
    return(
     <div>
        <h3 className="text-center text-success">Edit Contact</h3> 
        {editContactUI}
      </div>
    )
  }

}

export default EditContact;