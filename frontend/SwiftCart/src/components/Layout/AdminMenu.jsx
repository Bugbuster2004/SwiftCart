import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminMenu.css"; // Import custom CSS file

const AdminMenu = () => {
  return (
    <div className="text-center admin-menu-container">
      <div className="list-group admin-menu">
        <h4 className="admin-panel-title">Admin Panel</h4>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action admin-menu-item"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action admin-menu-item"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action admin-menu-item"
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action admin-menu-item"
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
