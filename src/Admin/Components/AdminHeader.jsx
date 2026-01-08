import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import AdminSidebar from "./AdminSidebar";
import { Link } from "react-router-dom";





const AdminHeader = () => {
  return (
    <>
      {/* Top Header */}
      <div className="flex justify-between items-center px-10 py-4 bg-white shadow-md">
        {/* Logo + Title */}
        <div className="flex items-center gap-4">
          <img
            className="w-20 h-20 object-cover rounded-md"
            src="https://img.freepik.com/premium-vector/cute-book-herbarium-journal-literature-world-book-day-vector-illustration-flat-style_254685-2882.jpg"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">Book Store</h1>
        </div>

        {/* Logout Button */}
        <button className="flex items-center gap-2 text-lg hover:scale-110 transition">
          <FontAwesomeIcon icon={faSignOut} />
          Logout
        </button>
      </div>

      {/* Marquee */}
      <div className="w-full bg-black text-white py-2">
        <marquee>Hai Admin, we are all set to get work!</marquee>
      </div>

{/* 
dashboard grid */}


    
    </>
  );
};

export default AdminHeader;