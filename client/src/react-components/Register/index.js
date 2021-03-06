import React from "react";
import {Redirect} from 'react-router-dom';
import { checkCity, checkEmpty, checkPassword, checkPhone, checkUsername, checkAge, checkDuplicateNumber, checkDuplicateName, registerDB } from "../../actions/checkRegister"
import RegisterForm from './RegisterForm'
import LeftSideHeader from '../LeftSideHeader'

/* Component for the Register page */
class Register extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      register: false,
      username: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      city: "default",
      age: "",
      error: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = e => {
    if (checkEmpty(this.state)) {
      this.setState({
        error: "Please fill in all required fields."
      })
    }
    else if (checkUsername(this.state)) {
      this.setState({
        error: "Please enter a username that matches the required description."
      })
    }
    else if (this.state.username.startsWith("admin")) { // reserved for admin
      this.setState({
        error: "The username you entered is not available."
      })
    }
    else if (checkPassword(this.state)) {
      this.setState({
        error: "Please enter a password that matches the required description."
      })
    }
    else if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        error: "The passwords you entered do not match."
      })
    }
    else if (checkPhone(this.state)) {
      this.setState({
        error: "Please enter a valid phone number."
      })
    }
    else if (checkCity(this.state)) {
      this.setState({
        error: "Please select a city."
      })
    }
    else if (checkDuplicateNumber.bind(this)()) {
      this.setState({
        error: "Please use a different phone number."
      })
    }
    else if (checkAge(this.state)) {
      this.setState({
        error: "You must be 13 years or older to create an account."
      })
    }
    else if (checkDuplicateName.bind(this)()){
      this.setState({
        error: "The username you entered is not available."
      })
    }
    else {
      registerDB.bind(this)();
    }
  }

  render() {

    if (this.state.register) {
      return <Redirect to='/'/>
    }

    return (
      <div>
        <LeftSideHeader/>
        <RegisterForm
          username={this.state.username}
          password={this.state.password}
          confirmPassword={this.state.confirmPassword}
          phoneNumber={this.state.phoneNumber}
          city={this.state.city}
          age={this.state.age}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default Register;
