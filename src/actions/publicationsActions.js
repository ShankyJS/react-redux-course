import axios from "axios";
import {
  UPDATE,
  LOADING,
  ERROR,
  COM_UPDATE,
  COM_ERROR,
  COM_LOADING
} from "../types/publicationsTypes";
import * as usersTypes from "../types/usersTypes";

const { GET_ALL: USERS_GET_ALL } = usersTypes;

export const getForUser = key => async (dispatch, getState) => {
  dispatch({
    type: LOADING
  });

  const { users } = getState().usersReducer;
  const { publications } = getState().publicationsReducer;
  const user_id = users[key].id;

  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${user_id}`
    );

    const news = response.data.map(publication => ({
      ...publication,
      comments: [],
      open: false
    }));

    const publications_updated = [...publications, news];

    dispatch({
      type: UPDATE,
      payload: publications_updated
    });

    const publications_key = publications_updated.length - 1;
    const users_updated = [...users];
    users_updated[key] = {
      ...users[key],
      publications_key
    };

    dispatch({
      type: USERS_GET_ALL,
      payload: users_updated
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: ERROR,
      payload: "Posts are not available."
    });
  }
};

export const openClose = (pub_key, com_key) => (dispatch, getState) => {
  const { publications } = getState().publicationsReducer;
  const selected = publications[pub_key][com_key];

  const updated = {
    ...selected,
    open: !selected.open
  };

  const publications_updated = [...publications];

  publications_updated[pub_key] = [
    ...publications[pub_key]
  ];

  publications_updated[pub_key][com_key] = updated;

  dispatch({
    type: UPDATE,
    payload: publications_updated
  });
};

export const getComments = (pub_key, com_key) => async (dispatch, getState) => {
  dispatch({
    type: COM_LOADING
  });
  
  const { publications } = getState().publicationsReducer;
  const selected = publications[pub_key][com_key];

  try{
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?postId=${selected.id}`
    );
  
    const updated = {
      ...selected,
      comments: response.data
    };
  
    const publications_updated = [...publications];
    publications_updated[pub_key] = [...publications[pub_key]];
  
    publications_updated[pub_key][com_key] = updated;
  
    dispatch({
      type: COM_UPDATE,
      payload: publications_updated
    });
    
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: COM_ERROR,
      payload: `Comments not found.`
    })
  }
};
