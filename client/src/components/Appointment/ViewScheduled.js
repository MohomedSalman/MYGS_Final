import React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import props from 'prop-types';

// components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import AppointHeader from "components/Appointment/AppointHeader.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";


export default function ViewScheduled() {

    const [viewList,setviewList]=useState([])

    useEffect(()=>{
        axios.get("http://localhost:3001/viewSchedule").then((response)=>{
            setviewList(response.data)
        })
    },[])

     // decline
     const [decline, setdecline] = useState("Declined");
     const declineReq = (availID) => {
       axios
         .put("http://localhost:3001/decline-book", {
           status: decline,
           availID: availID,
         })
 
         .then((response) => {
           console.log(availID);
         });
       alert(" Appointment Request Delclined ");
     };



  return (
    <>
    
  <main>
  <Sidebar />
    <div className="relative md:ml-64 bg-blueGray-100">
      <AdminNavbar />
      {/* Header */}
      <AppointHeader />
      <section className="pb-18 relative block bg-white">
      <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
        <br /> <br /> <br /> <br /> 
        <section className="relative block py-18 lg:pt-0 ">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-12/12 px-4">

                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                      <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                          <h3 className="font-semibold text-base text-blueGray-700">
                            Past Appointment Schedules
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                      {/* Projects table */}
                      <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                          <tr>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Availability ID
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              GS Name
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Date
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Time Slot
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                               Duration
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                               Booked slots
                            </th>
                            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        {viewList.map((viewApp)=>{
                            const dt = new Date(viewApp.date);
                            const year = dt.getFullYear() + '/';
                            const month = ('0' + (dt.getMonth() + 1)).slice(-2) + '/';
                            const day = ('0' + dt.getDate()).slice(-2);


                            return(
                          <tr>
                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                 {viewApp.availID} 
                            </th>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                 {viewApp.gsname}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {year + month + day} 
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {viewApp.startTime} - {viewApp.endTime}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                 {viewApp.Duration}
                            </td>
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {viewApp.currentCount} Out of {viewApp.maxCount}
                            </td>
                            {/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                 {viewApp.availStatus}
                            </td> */}
                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <Link to="/ViewRequests">
                                <button className="bg-red-500 text-white active:bg-emerald-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                      type="submit" 
                                      onClick={() => declineReq(viewApp.availID)}>  {" "}  
                                      Remove
                                </button>
                              </Link> 
                              </td>
                          </tr>
                            )
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
        </section>
        
        </div>
        <FooterAdmin />
        </section>
        
        </div>
      </main>
      
    </>
  );
}
