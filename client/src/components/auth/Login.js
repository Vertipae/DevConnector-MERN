import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import classnames from "classnames";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  // component state
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    // console.log("login mount");
    // console.log(this.props.auth);
    if (this.props.auth.isAuthenticated) {
      // Cheking that if the user is logged in
      // If thats true then redirect user to dashboard
      this.props.history.push("/dashboard");
      // console.log(this.props.history);
    }
  }

  // Tässä vanhassa authentikointi tehdään vain esimmäisellä avaus kerralla, eikä puske suoraa sisää
  // componentDidMount() {
  //   console.log(this.props);
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }
  // // Täällä se puskis suoraa sisää
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }

  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors });
  //   }
  // }

  // Pyörittää kun lisätään DOM puuhun
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return { errors: nextProps.errors };
    }
    return null;
  }
  // Pyörittää joka kerta kun state muuttuu
  componentDidUpdate(prevProps, prevState) {
    // console.log("update");
    if (prevProps.errors !== this.props.errors) {
      // Kattoo onko vanhat errorit erinlaiset kuin nykyiset (kun menee error tilasta error tilaan niin osaa vaihtaa error viestejä)
      this.setState({ errors: this.props.errors });
    }
    // console.log(this.props);
    if (this.props.auth.isAuthenticated) {
      this.setState({ isAuthenticated: this.props.auth.isAuthenticated });
      this.props.history.push("/dashboard");
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    // console.log(userData);
    this.props.loginUser(userData); // Calling the loginUSer action in authActions.js
  }

  render() {
    const { errors } = this.state;
    // console.log(this.props.auth);
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                {/* <div className="form-group">
                 <input
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div> // Error message
                  )}
                </div> */}

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
