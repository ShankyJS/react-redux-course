# Stateful vs Stateless

- Stateful is a class component (not functions)

- Stateless are functional components.

# Component Life Cycle on React

Fases por las que un componente pasa
Inicialización se declara nuestro estado o nuestras propiedades (setup props and state)-aparece siempre en el constructor.
Montado tres métodos en las cuales 1 es obligatorio que es el RENDER. El componentWillMount siempre se ejecutará antes que el render y el componentDidMount se ejecutará después del render.
Actualización o editar hay varias funciones
Destrucción o desmontaje solo hay una función que se llama componentWillUnmount

# Using promises.


````
async componentDidMount() {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    // console.log(response.data)
    const data = response.data
    this.setState({
      users: data
    });
  }

````

# What is Redux?

It's an open source tool that helps us to save all the state of an application in a single place.

## Principles.

- Data Storing.
- Inmutable.
- Centralized.

## How it Works?

Better than have a local state, you can manage a global one. 

## When I can use Redux?

In massive applications where the data flow is shared with a lot of components. 

When you want to share information, for example a login.

Is for manage states of data, not format (colors, brightness, etc.)

# Principles of Redux

- Store (data)

- Reducers (State)

- Action Creators (Functions)

- Components (JSX Code)

## Flow:

The component communicates with the Action Creator and goes to the Reducer and gives the information, when the reducer have the data it updates the component with the new state and the component with the virtual DOM knows what to change and the process get repeated. 

The heart of all this process is the store, becauses there flows all the data 

<img src="https://i.imgur.com/9p00Wua.png"
     alt="Reducer"
     style="width: 300px;" />


## Creating a Reducer

````
const INITIAL_STATE = {
  users: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "get_users":
      return { ...state, users: action.payload };
    defaultq: return state;
  }
};

````
Exporting this reducer to the reducers/index.js

````
import { combineReducers } from 'redux';
import usersReducer from "./usersReducer";

export default combineReducers({
    usersReducer
})
````


## How to connect the reducer with our component.

Dispatch changes the state.

## Complete Life Cycle of Redux 

Cuando nuestro componente terminar de cargar (componentDidMount) llama al Action Creator, luego el Action Creator contiene la promesa, trae los datos necesarios y luego va y modifica al Reducer para que actualice el estado usando dispatch() y luego lo actualizamos en el componente con el mapStateToProps.

## Archive Types

Is hightly recommend to use Types files on Redux to call them in user actions and reducers without errors, we can set constants in a single file an invoke them in my dispatchers or reducers.

````
export const GET_ALL = "get_all";
````

## Try Catch

In our userActions we can set this operators to manage the exceptions.

````
import axios from "axios";
import { GET_ALL } from "../types/usersTypes";

export const getAll = () => async dispatch => {
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    dispatch({
      type: GET_ALL,
      payload: response.data
    });
  } catch (error) {
    console.log("Error" + error.message);
  }
};

````

## Async moments.

In Async requests there are 3 events that we have to implementate. 

Loading, error and succesful.

## Spinner Component.

This is used for the loading event.

## Fatal: 

This is the famous (404 error, not found or error.)

# Sharing Information with Redux

We shared a parameter creating a Route that moves our customers to the publications.

We created this route:

````
<Route exact path="/publications/:key" component={Publications} />
````

And we added this link to move our users.

````
<Link to={`/publications/${key}`}>
  <div className="eye-solid icon"></div>     
</Link> 
````


In the publication component we shared the ID of the User with the following props:

````
import React, { Component } from 'react';

export default class Publications extends Component {
    render() {
        return (
            <div>
                {this.props.match.params.key}
            </div>
        )
    }
}
````

I had a little issue with the posts component, the problem was that I can't get all my users from the reducer because in that moment we just have don't used our userAction (get all users.)

We resolve it with this:

````
import React, { Component } from 'react';
import {connect} from "react-redux";
import * as usersActions from "../../actions/usersActions";


class Publications extends Component {

    componentDidMount() {
      if (!this.props.users.length) {
        this.props.getAll()
      }
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h1>
                    Posts of: {this.props.match.params.name}
                </h1>
                {this.props.match.params.key}
            </div>
        )
    }
}

const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
};

export default connect(mapStateToProps, usersActions)(Publications)

````


