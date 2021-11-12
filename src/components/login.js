import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import GoogleButton from 'react-google-button';
import DefaultProfilePicture from '../assets/images/profile.png';

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

export default class Login extends Component {
  state = {
    login: '',
    password: '',
    error: '',
    googleToken: ''
  }

  onGoogleLoginSuccess = (res) => {
    var userData = res.profileObj;
    var userEmail = userData.email;
    var userPhoto = userData.imageUrl;
    var userToken = res.tokenId;
    this.setState({
      email: userEmail,
      googleToken: userToken
    })

    const body = {
      login: userEmail,
      password: '',
      token: this.state.googleToken
    }
    fetch('/auth', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(json => {
      if (json.error) {
        toast.error(json.error);
        this.setState({ error: json.error });
      }
      else {
        toast.success('Login Success!');
        console.log(json);
        localStorage.setItem('token', json.token);
        this.props.setAuth();
      }
    });

    this.props.setImageUrl(userPhoto)
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6 offset-lg-3 card">
            <h5>Sign In</h5>
            <img src={DefaultProfilePicture} className="img-thumbnail rounded-circle m-auto" width="100" height="100" alt="User" />
            <br />
            <GoogleLogin
              className="form-control"
              render={renderProps => <GoogleButton style={{ width: '100%' }} {...renderProps} />}
              clientId={REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Sign in with Google"
              onSuccess={this.onGoogleLoginSuccess}
              onFailure={({ details }) => { toast.error(details) }}
            />
          </div>
        </div>
      </div>
    );
  }
}
