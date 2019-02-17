import React, { Component } from 'react';
import { get } from "./actions/common";
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
    }
  }
  componentDidMount() {
    get('users', (data) => { this.setState({ users: data }) })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="container" >
            {this.state.users.length < 1 && ('Loading...')}
            {this.state.users.map((user, i) => (
              <div  key={i}>
                <Link to={`/user/${user.id}`}>
                  <h4>{user.name}</h4>
                  <p>{user.website}</p>
                </Link>
              </div>
            ))}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
