import { faArrowUp, faBookAtlas, faEllipsis, faHome, faLandMineOn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="bg-amber-700 w-auto h-140  mx-5">
      <h1 className="text-center font-bold text-xl text-white"> <FontAwesomeIcon icon={faLandMineOn}/> Admin Dashboard</h1>
      <hr className="my-3 border-white" />

      {/* FIXED: flex instead of felx */}
      <div className="flex flex-col items-center gap-14">

          <Link to={'/admin-home'} className="w-70 text-center bg-white rounded p-3 text-black font-semibold"> <FontAwesomeIcon icon={faHome}/>
               HOME
        </Link>

         <Link  to={'/admin-books'} className="w-70 text-center bg-white rounded p-3 text-black font-semibold"> <FontAwesomeIcon icon={faBookAtlas}/>
               All books/Users
        </Link>

        <Link to={'/admin-career'} className="w-70 text-center bg-white rounded p-3 text-black font-semibold"> <FontAwesomeIcon icon={faArrowUp}/>
               Careers
        </Link>

        <Link to={'/admin-applications'} className="w-70 text-center bg-white rounded p-3 text-black font-semibold"> <FontAwesomeIcon icon={faArrowUp}/>
               Applications
        </Link>

       <Link to={'/admin-settings'} className="w-70 text-center bg-white rounded p-3 text-black font-semibold"> <FontAwesomeIcon icon={faEllipsis}/>
               Settings
        </Link>

      </div>
    </div>
  );
};

export default AdminSidebar;