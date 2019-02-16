import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";
import { Redirect } from "react-router-dom";

class Posts extends Component {
  render() {
    if (!this.props.auth.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="cold-md-12" />
            <PostForm />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Posts);
