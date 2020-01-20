import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as tasksActions from "../../actions/tasksActions";
import Fatal from "../general/Fatal";
import Loading from "../general/Loading";

class Tareas extends Component {
  componentDidMount() {
    if (!Object.keys(this.props.tasks).length) {
      this.props.getAllTasks();
    }
  }

  componentDidUpdate() {

    const { tasks, loading, getAllTasks} = this.props; 

    if (!Object.keys(tasks).length && !loading) {
      getAllTasks();
    }
  }

  showContent = () => {
    const { tasks, loading, error } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <Fatal message={error} />;
    }

    return Object.keys(tasks).map(user_id => (
      <div key={user_id}>
        <h2>Usuario: {user_id}</h2>
        <div className="container_tasks">{this.putTasks(user_id)}</div>
      </div>
    ));
  };

  putTasks = user_id => {
    const { tasks, changeCheck, deleted } = this.props;
    const for_user = {
      ...tasks[user_id]
    };

    return Object.keys(for_user).map(task_id => (
      <div key={task_id}>
        <input
          type="checkbox"
          defaultChecked={for_user[task_id].completed}
          onChange={() => changeCheck(user_id, task_id)}
        />
        {for_user[task_id].title}
        <button className="m_left">
          <Link to={`/tasks/save/${user_id}/${task_id}`}>Edit</Link>
        </button>
        <button className="m_left" onClick={() => deleted(task_id)}>
          Remove
        </button>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <button className="">
          <Link to="/tasks/save">Add</Link>
        </button>
        {this.showContent()}
      </div>
    );
  }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(mapStateToProps, tasksActions)(Tareas);
