import React, { Component } from "react";
import { connect } from "react-redux";
import * as tasksActions from "../../actions/tasksActions";
import Loading from "../general/Loading";
import Fatal from "../general/Fatal";
import { Redirect } from "react-router-dom";

class Save extends Component {
  componentDidMount() {
    const {
      match: {
        params: { user_id, task_id }
      },
      tasks,
      changeUserId,
      changeTitle,
      cleanForm
    } = this.props;

    if (user_id && task_id) {
      const task = tasks[user_id][task_id];
      changeUserId(task.userId);
      changeTitle(task.title);
    } else {
      cleanForm();
    }
  }

  changeUserId = event => {
    this.props.changeUserId(event.target.value);
  };

  changeTitle = event => {
    this.props.changeTitle(event.target.value);
  };

  save = () => {
    const {
      match: {
        params: { usu_id, task_id }
      },
      tasks,
      user_id,
      title,
      add,
      edit
    } = this.props;

    const new_task = {
      userId: user_id,
      title: title,
      completed: false
    };

    if (usu_id && task_id) {
      const task = tasks[user_id][task_id];
      const edited_task = {
        ...new_task,
        completed: task.completed,
        id: task.id
      };
      edit(edited_task);
    } else {
      add(new_task);
    }
  };

  deshabilitar = () => {
    const { user_id, title, loading } = this.props;

    if (loading) {
      return true;
    }

    if (!user_id || !title) {
      return true;
    }

    return false;
  };

  showAction = () => {
    const { error, loading } = this.props;
    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Fatal message={error.message} />;
    }
  };
  render() {
    return (
      <div>
        {this.props.getBack ? <Redirect to="/tasks" /> : ""}
        <h1>Save Task</h1>
        User ID:
        <input
          type="number"
          value={this.props.user_id}
          onChange={this.changeUserId}
        />
        <br />
        <br />
        Title:
        <input
          type="text"
          value={this.props.title}
          onChange={this.changeTitle}
        />
        <br />
        <br />
        <button onClick={this.save} disabled={this.deshabilitar()}>
          Save
        </button>
        {this.showAction()}
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(mapStateToProps, tasksActions)(Save);
