import React, {Component} from "react";
import axios from "axios";

class NewContact extends Component {
  state = {
    type: '',
    name: '',
    title: '',
    phone: '',
    fax: '',
    email_group: '' 

  }
  
  submitContact = (e) => {
    e.preventDefault();
    const Contact = {
      name: this.state.name,
      title: this.state.title,
      type: this.state.type,
      phone: this.state.phone,
      fax: this.state.fax,
      email_group: this.state.email_group
    }
    axios.post("https://react-contacts-f961b.firebaseio.com/contacts.json", Contact)
      .then((response) => {
        this.props.history.push("/contacts");
      })
  }

  cancelHandler = () => {
    this.props.history.push("/contacts");
  }


  render(){
    return(
      <div className="row">
        <div className="col-sm-12">
          <h3 className="text-center  text-success">New Contact Form</h3>
          <form>
            <div className="form-group">
              <label>Name</label>
              <input type="text" className="form-control" id="Name" 
              value = {this.state.name} 
              onChange={(event) => this.setState({name: event.target.value})}
              placeholder="Enter Name" /> 
            </div>

            <div className="form-group">
              <label >Title</label>
              <input type="text" className="form-control" id="Title"  
              value = {this.state.title}
              onChange={(event) => this.setState({title: event.target.value})}
              placeholder="Enter Title" /> 
            </div>

            <div className="form-group">
              <label>Type</label>
              <select className="form-control"
              value = {this.state.type} onChange={(event) => this.setState({type: event.target.value})} >
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
              value = {this.state.phone}
              onChange={(event) => this.setState({phone: event.target.value})}
              placeholder="Enter Phone Number" /> 
            </div>

            <div className="form-group">
              <label >Fax</label>
              <input type="text" className="form-control" id="Title"  
              value = {this.state.fax}
              onChange={(event) => this.setState({fax: event.target.value})}
              placeholder="Enter Fax Details" /> 
            </div>
            <div className="form-group">
              <label >Email Group</label>
              <select className="form-control"
              value = {this.state.email_group} onChange={(event) => this.setState({email_group: event.target.value})} >
                <option>Please Select Email Group</option>
                <option value="Executive">Executive</option>
                <option value="Inmar_AR">Inmar AR</option>
                <option value="Daily">Daily</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success" onClick={this.submitContact}>Add Contact</button>
            &nbsp;
            <button className="btn btn-danger" onClick={this.cancelHandler} >Cancel</button>
          </form>
        </div>
      </div>
    )
  }
}

export default NewContact;