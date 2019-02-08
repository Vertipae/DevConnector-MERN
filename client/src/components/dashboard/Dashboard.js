import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  // Calling this right away
  componentDidMount() {
    // When dashboard is loaded this gets called and will add profile to state (if user has created profile)
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    if (!this.props.auth.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    // Initializing a variable
    let dashboardContent;
    // Ternary example
    // profile === null || loading
    //   ? (dashboardContent = <Spinner />)
    //   : Object.keys(profile).length > 0
    //   ? (dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>)
    //   : (dashboardContent = (
    //       <div>
    //         <p className="lead text-muted">Welcome {user.name} </p>
    //         <p> You have not yet set up a profile, please add some info</p>
    //         <Link to="/create-profile" className="btn btn-lg btn-info">
    //           Create Profile
    //         </Link>
    //       </div>
    //     ));

    // Profile is equal to null or loading is true then it shows loading text/Spinner (profile and loading comes from redux state profileReducer.js)
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      // If profile is greater than zero then object has data and it will display it on dashboard
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>;
      } else {
        // USer is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
