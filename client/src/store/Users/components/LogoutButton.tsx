import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../actions";

interface Iprops {
  logoutUser(): void;
}

class LogoutButton extends Component<Iprops> {
  logoutHandler = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };
  render() {
    return (
      <div className="logout-button">
        <button onClick={this.logoutHandler}>Logout</button>
      </div>
    );
  }
}
const mapStateToProps = (state: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  { logoutUser }
)(LogoutButton);
