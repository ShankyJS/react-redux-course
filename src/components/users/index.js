import React, { Component } from "react";
import { connect } from "react-redux";
import * as usersActions from "../../actions/usersActions";
import Loading from "../../components/general/Loading";
import Fatal from "../../components/general/Fatal";
import Table from "./Table";

class Users extends Component {
  componentDidMount() {
    if (!this.props.users.length) {
      this.props.getAll();
    }
  }

  putContent = () => {
    if (this.props.loading) {
      return <Loading />;
    }

    if (this.props.error) {
      return <Fatal message={this.props.error} />;
    }

    return <Table />;
  };

  render() {
    return (
      <div>
        <h1>Users</h1>
        {this.putContent()}
      </div>
    );
  }
}

//Mapping the global state to props, this function
// Returns the user that we want.

const mapStateToProps = reducers => {
  return reducers.usersReducer;
};

export default connect(mapStateToProps, usersActions)(Users);
