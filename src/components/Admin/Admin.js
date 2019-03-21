import React, { Component } from 'react';
import AdminTabNav from './AdminTabNav';
import LogOutButton from '../LogOutButton/LogOutButton.js';


class Admin extends Component {
  render() {
    return (
      <div>
        <p className="adminPage">
          Admin Page
        </p>
        <AdminTabNav />

        <LogOutButton className="log-in" />
      </div>
    );
  }
}
export default Admin;