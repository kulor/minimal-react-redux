import React from 'react';
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'


//
//
// Stateless component
//
//
import './App.css';
const App = (props) => {

  // Thanks Paul https://www.paulirish.com/2009/random-hex-color-code-snippets/
  const randomHexColour = () => {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  };

  const handleClick = e => {
    props.onCreateBlob(e.clientX, e.clientY, randomHexColour());
  };

  return (
    <div className="App" onClick={handleClick}>
      {props.blobs.map((blob, key) => (
        <span
          className="blob"
          style={{top: blob.y, left: blob.x}}
          key={key}
        >
          <span className="animated bounceIn" style={{backgroundColor: blob.colour}}>{blob.x} x {blob.y}</span>
        </span>
      ))}
      <span className="help-text">Click anywhere to create a blob</span>
    </div>
  );
}


//
//
// Actions
//
//
export const addBlob = (x, y, colour) => {
  return {
    type: 'ADD_BLOB',
    x,
    y,
    colour
  }
}


//
//
// Reducer
//
//
const blobs = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOB':
      return [
        ...state,       // <-------- Previous values
        {
          x: action.x,  // <-------- New state addition
          y: action.y,
          colour: action.colour
        }
      ]

    default:
      return state
  }
}

//
//
// Container
//
//
const mapStateToProps = (state) => {
  return {
    blobs: blobs(state, addBlob)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateBlob: (x, y, colour) => {
      dispatch(addBlob(x, y, colour))
    }
  }
}

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


//
//
// Storage
//
//
let store = createStore(
  blobs,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


//
//
// Bootstrap
//
//
render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
)
