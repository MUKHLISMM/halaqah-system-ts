import { Box, Img } from "@chakra-ui/react";
import { AiOutlineLeft, AiOutlineMenu } from "react-icons/ai";
import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { signOut, useSession } from "next-auth/react";
import { SessionAccount } from "../interface/account";
import { getRole } from "../function";

export default function Template(props: any) {
  const {data}:any=useSession({required:true})
 const account:SessionAccount= data?.user
  const [isToggle, setIsToggle] = useState(false);
  const [isShow, setIsShow] = useState(false);
  return (
    <Box
      className={`light-style layout-menu-fixed ${
        isToggle ? "layout-menu-expanded" : ""
      }`}
      bg="#e9ecf2"
    >
      <Box className="layout-wrapper layout-content-navbar">
        <Box className="layout-container">
          {/* <!-- Menu --> */}

          <Box
            as="aside"
            id="layout-menu"
            className="layout-menu menu-vertical menu bg-menu-theme"
          >
            <Box className="app-brand demo" py={10} h="auto">
              <Img src="/wide-logo.png" alt="" className=" h-auto " />

              <Box
                onClick={() => setIsToggle(false)}
                className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
                style={{ cursor: "pointer" }}
              >
                {/* <i className="bx bx-chevron-left bx-sm align-middle"></i> */}
                <AiOutlineLeft
                  color="white"
                  size={20}
                  className="bx bx-chevron-left bx-sm align-middle"
                />
              </Box>
            </Box>

            <Box className="menu-inner-shadow"></Box>

            <ul className="menu-inner py-1">
              {/* <!-- Dashboard --> */}
              <Navbar />
            </ul>
          </Box>
          {/* <!-- / Menu --> */}

          {/* <!-- Layout container --> */}
          <Box className="layout-page">
            {/* <!-- Navbar --> */}

            <Box
              as="nav"
              className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
              id="layout-navbar"
            >
              <Box
                className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none"
                onClick={() => setIsToggle(true)}
              >
                <a className="nav-item nav-link px-0 me-xl-4" href="#">
                  <i className="bx bx-menu bx-sm"></i>
                  <AiOutlineMenu />
                </a>
              </Box>

              <Box
                className="navbar-nav-right d-flex align-items-center"
                id="navbar-collapse"
              >
                {/* <!-- Search --> */}
                <Box className="navbar-nav align-items-center">
                  <Box className="nav-item d-flex align-items-center">
                    <i className="bx bx-search fs-4 lh-0"></i>
                    <input
                      type="text"
                      className="form-control border-0 shadow-none"
                      placeholder="Search..."
                      aria-label="Search..."
                    />
                  </Box>
                </Box>
                {/* <!-- /Search --> */}

                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  {/* <!-- Place this tag where you want the button to render. --> */}


                  {/* <!-- User --> */}
                  <li
                    className="nav-item navbar-dropdown dropdown-user dropdown"
                    onClick={() => setIsShow(!isShow)}
                  >
                    <Box
                      className="nav-link dropdown-toggle hide-arrow"
                      aria-expanded="true"
                    >
                      <Box className="avatar avatar-online">
                        <img
                          src="https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png"
                          alt=""
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </Box>
                    </Box>
                    <ul
                      className={`dropdown-menu dropdown-menu-end ${
                        isShow ? "show" : ""
                      }`}
                      data-bs-popper="none"
                    >
                      <li>
                        <Box cursor="pointer" className="dropdown-item">
                          <Box className="d-flex">
                            <Box className="flex-shrink-0 me-3">
                              <Box className="avatar avatar-online">
                                <img
                                  src="https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/person-icon.png"
                                  alt=""
                                  className="w-px-40 h-auto rounded-circle"
                                />
                              </Box>
                            </Box>
                            <Box className="flex-grow-1">
                              <span className="fw-semibold d-block">
                                {
                                  account?.userName
                                }
                              </span>
                              <small className="text-muted">
                                {
                                 getRole(account?.roleId) 
                                  
                                }
                              </small>
                            </Box>
                          </Box>
                        </Box>
                      </li>
                      <li>
                        <Box className="dropdown-Boxider"></Box>
                      </li>
                      <li>
                        <Box cursor="pointer" className="dropdown-item">
                          <i className="bx bx-user me-2"></i>
                          <span className="align-middle">My Profile</span>
                        </Box>
                      </li>
                      <li>
                        <Box cursor="pointer" className="dropdown-item">
                          <i className="bx bx-cog me-2"></i>
                          <span className="align-middle">Settings</span>
                        </Box>
                      </li>
                      <li>
                        <Box cursor="pointer" className="dropdown-item">
                          <span className="d-flex align-items-center align-middle">
                            <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                            <span className="flex-grow-1 align-middle">
                              Billing
                            </span>
                            <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                              4
                            </span>
                          </span>
                        </Box>
                      </li>
                      <li>
                        <Box className="dropdown-Boxider"></Box>
                      </li>
                      <li onClick={()=>signOut()}>
                        <Box cursor="pointer" className="dropdown-item">
                          <i className="bx bx-power-off me-2"></i>
                          <span className="align-middle">Log Out</span>
                        </Box>
                      </li>
                    </ul>
                  </li>
                  {/* <!--/ User --> */}
                </ul>
              </Box>
            </Box>

            {/* <!-- / Navbar --> */}

            {/* <!-- Content wrapper --> */}
            <Box className="content-wrapper">
              {/* <!-- Content --> */}
              <Box className="container-xxl flex-grow-1 container-p-y" >
                {props.children}
                </Box>
              {/* <!-- / Content --> */}
              <Footer />

              <Box className="content-backdrop fade"></Box>
            </Box>
            {/* <!-- Content wrapper --> */}
          </Box>
          {/* <!-- / Layout page --> */}
        </Box>

        {/* <!-- Overlay --> */}
        <Box
          className="layout-overlay layout-menu-toggle"
          onClick={() => setIsToggle(false)}
        ></Box>
      </Box>
    </Box>
  );
}
