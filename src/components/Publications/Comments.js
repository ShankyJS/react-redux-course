import React from "react";
import { connect } from "react-redux";
import Loading from "../general/Loading";
import Fatal from "../general/Fatal";

const Comments = props => {
  if (props.com_error) {
    return <Fatal message={props.com_error} />;
  }
  if (props.com_cargando && !props.comments.length) {
    return <Loading />;
  }

  const putComments = () => (
    props.comments.map(comentario => (
      <li key={comentario.id}>
        <b>
          <u>{comentario.email}</u>
        </b>
        <br />
        {comentario.body}
      </li>
    ))
  );    


  return <ul>{putComments()}</ul>;
};

const mapStateToProps = ({ publicationsReducer }) => publicationsReducer;

export default connect(mapStateToProps)(Comments);
