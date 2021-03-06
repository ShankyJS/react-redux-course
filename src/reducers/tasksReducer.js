import {
  GET_ALL_TASKS,
  LOADING,
  ERROR,
  CHANGE_USER_ID,
  CHANGE_TITLE,
  SAVE,
  UPDATE, 
  CLEAN
} from "../types/tasksTypes";

const INITIAL_STATE = {
  tasks: {},
  loading: false,
  error: "",
  user_id: "",
  title: "",
  getBack: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false,
        error: "",
        getBack: false
      };

    case LOADING:
      return { ...state, loading: true };

    case ERROR:
      return { ...state, error: action.payload, loading: false };

    case CHANGE_USER_ID:
      return { ...state, user_id: action.payload };

    case CHANGE_TITLE:
      return { ...state, title: action.payload };

    case SAVE:
      return {
        ...state,
        tasks: {},
        loading: false,
        error: '',
        getBack: true,
        user_id: '',
        title: '' 
      }

    case UPDATE: 
      return {...state, tasks: action.payload}
    
    case CLEAN: 
      return {...state, user_id: '', title: ''}

    default:
      return state;
  }
};
