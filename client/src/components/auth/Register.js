import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";

class Register extends Component {
  // component state
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // Takes event parameter
  // Fireoffs when typing to input and changes the state variables
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // console.log(newUser);
    axios
      // Because of the proxy value in package.json localhost:5000 it is fine to do /api/users/register
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      //   .catch(err => console.log(err))
      //   .catch(err => console.log(err.response.data));
      .catch(err => this.setState({ errors: err.response.data }));
  }
  render() {
    const { errors } = this.state; // const errors = this.state.errors

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    // className="form-control form-control-lg"
                    className={classnames("form-control form-control-lg", {
                      // from-control form-control-lg are in default
                      "is-invalid": errors.name // is-invalid is used when input has an error when it has an error outline becomes red (/validation/register.js)
                    })}
                    placeholder="Name"
                    name="name"
                    value={this.state.name} // linking this to state value
                    // onChange={this.onChange.bind(this)} <- How to bind in one way example (This is for the setState of undefined error)
                    onChange={this.onChange}
                    // required
                  />

                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div> // Error message comes from the backend /validation/register.js // This is cool
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email} // linking this to state value
                    onChange={this.onChange}
                  />

                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div> // Error message
                  )}

                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password} // linking this to state value
                    onChange={this.onChange}
                  />

                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div> // Error message
                  )}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password2
                    })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2} // linking this to state value
                    onChange={this.onChange}
                  />
                  {errors.password2 && (
                    <div className="invalid-feedback">{errors.password2}</div> // Error message
                  )}
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
