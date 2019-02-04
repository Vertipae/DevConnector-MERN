import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
// import axios from "axios";
import classnames from "classnames";
// Connecting redux to this component
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

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

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      // Cheking that if the user is logged in
      // If thats true then redirect user to dashboard
      this.props.history.push("/dashboard");
    }
  }

  // Testing the errors prop // Getting the errors from redux state (deprecated)
  //   componentWillReceiveProps(nextProps) {
  //     if (nextProps.errors) {
  //       this.setState({ errors: nextProps.errors });
  //     }
  //   }

  // Testing the errors prop // Getting the errors from redux state and moving them to component state (without changing the component error state)
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
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

    this.props.registerUser(newUser, this.props.history);

    // console.log(newUser);
  }
  render() {
    const { errors } = this.state; // const errors = this.state.errors (component state error)
    // const { errors } = this.props;

    // const { user } = this.props.auth;

    return (
      <div className="register">
        {/* shows the user name if its not null */}
        {/* {user ? user.name : null} */}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// Putting the auth state inside of a proprerty called auth so it can be accessed // example: (anything thats in that state )this.props.auth.user
// Comes from rootReduce reducers/index.js
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps, // Popping it in here order it to work
  { registerUser }
)(withRouter(Register));
