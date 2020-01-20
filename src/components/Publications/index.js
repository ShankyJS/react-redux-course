import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../general/Loading";
import Fatal from "../general/Fatal";
import Comments from "./Comments";

import * as usersActions from "../../actions/usersActions";
import * as publicationsActions from "../../actions/publicationsActions";

const { getAll: usersGetAll } = usersActions;
const {
  getForUser: publicationsGetForUser,
  openClose,
  getComments
} = publicationsActions;

class Publications extends Component {
  async componentDidMount() {
    const {
      usersGetAll,
      publicationsGetForUser,
      match: {
        params: { key }
      }
    } = this.props;

    if (!this.props.usersReducer.users.length) {
      await usersGetAll();
    }
    if (this.props.usersReducer.error) {
      return;
    }
    if (!("publications_key" in this.props.usersReducer.users[key])) {
      publicationsGetForUser(key);
    }
  }

  putUsers = () => {
    const {
      usersReducer,
      match: {
        params: { key }
      }
    } = this.props;

    if (usersReducer.error) {
      return <Fatal message={usersReducer.error} />;
    }

    if (!usersReducer.users.length || usersReducer.loading) {
      return <Loading />;
    }

    const name = usersReducer.users[key].name;
    return <h1>Posts of: {name}</h1>;
  };

  putPublications = () => {
    const {
      usersReducer,
      usersReducer: { users },
      publicationsReducer,
      publicationsReducer: { publications },
      match: {
        params: { key }
      }
    } = this.props;

    if (!users.length) {
      return;
    }

    if (usersReducer.error) {
      return;
    }

    if (publicationsReducer.loading) {
      return <Loading />;
    }

    if (publicationsReducer.error) {
      return <Fatal message={publicationsReducer.error} />;
    }

    if (!publications.length) return;

    if (!("publications_key" in users[key])) {
      return;
    }

    const { publications_key } = users[key];
    return this.showInfo(publications[publications_key], publications_key);
  };

  showInfo = (publications, pub_key) => (
    publications.map((publication, com_key) => (
      <div
        className="pub_title"
        key={publication.id}
        onClick={() =>
          this.showComments(pub_key, com_key, publication.comments)
        }
      >
        <h2>{publication.title}</h2>
        <h3>{publication.body}</h3>
        {publication.open ? <Comments comments={publication.comments} /> : ""}
      </div>
    ))
    );

  showComments = (pub_key, com_key, comments) => {
    this.props.openClose(pub_key, com_key)
    if (!comments.length) {
      this.props.getComments(pub_key, com_key)
    }
  };

  render() {
    return (
      <div>
        {this.putUsers()}
        {this.putPublications()}
      </div>
    );
  }
}


const mapStateToProps = ({ usersReducer, publicationsReducer }) => {
  return {
    usersReducer,
    publicationsReducer
  };
};

const mapDispatchToProps = {
  usersGetAll,
  publicationsGetForUser,
  openClose,
  getComments
};

export default connect(mapStateToProps, mapDispatchToProps)(Publications);
