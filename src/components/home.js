import React, { Component } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import DefaultProfilePicture from '../assets/images/profile.png';

export default class Home extends Component {
  state = {
    email: '',
    profilePhoto: localStorage.getItem('imgUrl') ? localStorage.getItem('imgUrl') : DefaultProfilePicture,
    name: localStorage.getItem('name')
  }
  componentDidMount() {
    const body = {
      token: localStorage.getItem('token'),
    }
    fetch('/authenticated_endpoint', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(json => {
      if (json.error) {
        toast.error(json.error)
        this.props.LogOut();
      }
      else {
        this.setState({
          email: json.email
        })
      }
    });
  }
  render() {
    return (
      <div>
        <Navbar
          bg="primary"
          variant="dark"
          sticky="top"
          className="d-flex justify-content-between"
        >
          <Nav>Kinter Bot</Nav>
          <Nav className="d-flx justify-content-center align-items-center">
            <h5>{this.state.name}</h5>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="bg-transparent border-0">
                <img src={this.state.profilePhoto} width='30' height='30' className="img-thumbnail rounded-circle p-0" alt="" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="mr-5">
                <Dropdown.Item onClick={this.props.LogOut}>Log Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
