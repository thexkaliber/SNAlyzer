import React, { useState } from 'react';
import {
    FaBars,
    FaRegChartBar,
}from "react-icons/fa";
import {BiNetworkChart,BiHomeAlt} from 'react-icons/bi';
import {RiDashboardFill} from 'react-icons/ri'
import {FiSettings, FiDatabase} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';
import '../../App.css';


const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/about",
            name:"About",
            icon:<BiHomeAlt/>
        },
        {
            path:"/sna",
            name:"SNA",
            icon:<BiNetworkChart/>
        },
        {
            path:"/dashboard",
            name:"Dashboard",
            icon:<RiDashboardFill/>
        },
        {
            path:"/analytics",
            name:"Analytics",
            icon:<FaRegChartBar/>
        },
        {
            path:"/datahandling",
            name:"Data Handling",
            icon:<FiDatabase/>
        },
        {
            path:"/Settings",
            name:"Settings",
            icon:<FiSettings/>
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "250px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo"><a href="/welcome">SNAlyzer</a></h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;