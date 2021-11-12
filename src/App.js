import React, { Component } from 'react';
import Login from './components/login';
import Home from './components/home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    token: localStorage.getItem('token'),
    imageUrl: ''
  }
  setAuth = () => {
    this.setState({ token: localStorage.getItem('token') });
  }
  LogOut = () => {
    localStorage.removeItem('token');
    toast.warn('You are logged out!');
    this.setState({ token: '' });
  }
  setImageUrl = (url) => {
    this.setState({
      imageUrl: url
    })
  }
  render() {
    return (
      <div>
        {this.state.token ? (<Home LogOut={this.LogOut} userPhoto={this.state.imageUrl} />) : (<Login setAuth={this.setAuth} setImageUrl={this.setImageUrl} />)}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
