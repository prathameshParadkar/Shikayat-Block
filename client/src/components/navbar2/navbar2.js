import React from "react";
import "./navbar2.css";
import { AiFillSave, AiFillCamera } from "react-icons/ai";
import { RiArrowGoBackFill, RiShareForwardFill } from "react-icons/ri";
import { BiSolidHide } from "react-icons/bi";
import { FaFileCsv } from "react-icons/fa";
// import { useDispatch } from "react-redux";
import { setPressed } from "../../reducers/SiteCustom";
import { useAppDispatch } from "../../store";

const Navbar2 = () => {
  const dispatch = useAppDispatch();
  return (
    <nav className="nav2 h-[30px]">
      <div className="icons h-[30px]">
        <AiFillSave className="icon" />
        <RiArrowGoBackFill className="icon" />
        <BiSolidHide className="icon" />
        <FaFileCsv className="icon" />
        <AiFillCamera className="icon" />
        <RiShareForwardFill
          className="icon"
          onClick={() => {
            dispatch(setPressed(true));
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar2;
