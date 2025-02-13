import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import '../../Admin.css';
import UserManagement from './ManageUser/UserManagement';

function GeneralAdmin() {
  const [isSelectedResearcher, setIsSelectedResearcher] = useState(false);
  const [isSelectedFarmer, setIsSelectedFarmer] = useState(false);

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Admin Dashboard</h3>
        <nav>
          <NavLink to="UserManagement " activeClassName="active">Manage Users</NavLink>
          <NavLink to="AddNewModel" activeClassName="active">Add New Model</NavLink>
          <div className="Researcher" onClick={() => setIsSelectedResearcher(!isSelectedResearcher)}>
            Researcher
          </div>
          {isSelectedResearcher && (
            <div className="sub-menu">
              <NavLink to="TrainModel" activeClassName="active">Train Model</NavLink>
              <NavLink to="TestModel" activeClassName="active">Test Model</NavLink>
              <NavLink to="PredictImage" activeClassName="active">Predict</NavLink>
            
            </div>
          )}

          <div className="Farmer" onClick={() => setIsSelectedFarmer(!isSelectedFarmer)}>
            Farmer
          </div>
          {isSelectedFarmer && (
            <div className="sub-menu">
              <NavLink to="uploadimageAdmin" activeClassName="active">Upload Image</NavLink>
              <NavLink to="diseaseinfoAdmin" activeClassName="active">Disease Info</NavLink>
            </div>
          )}
          <NavLink to="Admindashboard" activeClassName="active">Dashboard</NavLink>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default GeneralAdmin;
