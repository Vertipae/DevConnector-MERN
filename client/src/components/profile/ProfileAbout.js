import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    // Skill list
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" />
        {skill}
      </div>
    ));
    return (
      <div className="row" style={{ width: "200%" }}>
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Bio</h3>
            {/* Checking if this is empty because bio ain't required */}
            <p className="lead">
              {isEmpty(profile.bio) ? (
                <span>
                  Excuse me sir {firstName} but do you have time to create a
                  bio?
                </span>
              ) : (
                <span>{profile.bio}</span>
              )}
            </p>
            <hr />
            <h3 className="text-center text-info">Skill Set</h3>
            <div className="row">
              <div className="d-flex flex-wrap justify-content-center align-items-center">
                {skills}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
