import React, { useEffect, useState } from "react";
import WithSubnavigation from "./kvh_components/Navbar";
import Sidebar from "./kvh_components/Sidebar";
import { useSelector } from "react-redux";
import { NavbarImg, NavbarImgWO } from "./assets";
import { Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import Navbar from "./components/navbar/navbar";
import Navbar2 from "./components/navbar2/navbar2";

const Layout = ({ children }) => {
  // const pathName = window.location.pathname;
  const [pathName, setPathName] = useState(window.location.pathname);
  const strsd = "sdsd";
  // strsd.includes("sdsd")

  useEffect(() => {
    const updatePathName = () => {
      setPathName(window.location.pathname);
    };

    // Attach the event listener to update pathName on location changes
    window.addEventListener("popstate", updatePathName);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", updatePathName);
    };
  }, []);
  const shouldShowSidebar = useSelector(
    (state) => state.siteCustom.shouldShowSideBar
  );
  const { i18n } = useTranslation();

  const changeLanguage = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
  };

  console.log("shouldShowSidebar", shouldShowSidebar);
  return (
    <div className="layout">
      <div className= "fixed z-[100] w-full flex flex-col">
        {/* <div className= "h-[42px] bg-[#0262AF] flex flex-row justify-between items-center text-white px-[1rem] "> */}
        {/* <div className= "h-[32px] bg-[#0262AF] flex flex-row justify-between items-center text-white px-[1rem] "> */}
        <div className= "h-[25px] bg-[#0262AF] flex flex-row justify-between items-center text-white px-[1rem] text-sm">
          {/* <div>GOVERNMENT OF INDIA</div> */}
          <div></div>
          <div>
            <Select
              color="white"
              variant="unstyled"
              // iconSize="0rem" // Adjust the size of the dropdown arrow icon
              iconColor="white" // Set the color of the dropdown arrow icon
              marginLeft="0.5rem" // Add margin to the left of the dropdown button
              // top="50%"
              // marginTop="2rem"

              onChange={(e) => {
                const selectedLanguage = e.target.value;
                changeLanguage(selectedLanguage);

                // Handle language change logic here
              }}
            >
              <option value="en" className= "text-black">
                English
              </option>
              <option value="hi" className= "text-black">
                Hindi
              </option>
            </Select>
          </div>
        </div>
        {/* <div className= "w-full bg-white flex justify-center">
          <img src={NavbarImgWO} className= "h-[80px] object-contain" />
        </div> */}
        {/* <WithSubnavigation /> */}
        <Navbar />

        {pathName && pathName.includes("boards") && <Navbar2 />}
      </div>
      {shouldShowSidebar ? (
        // <div className="content flex flex-row pt-[60px] pl-[240px]">
        // pathName.includes("boards") &&
        <div
          className={
            pathName && !pathName.includes("boards")
              ? "content flex flex-row pt-[90px] pl-[240px]"
              : "content flex flex-row pt-[120px] pl-[240px]"
          }
        >
          <Sidebar />
          <main className= "w-full">{children}</main>
        </div>
      ) : (
        <div className="content flex flex-row pt-[120px]">
          {/* <Sidebar /> */}
          <main className= "w-full">{children}</main>
        </div>
      )}
    </div>
  );
};

export default Layout;
