import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsOpen2, setShouldShowSideBar } from "../../reducers/SiteCustom";

const Blog = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // window.location.reload();
    dispatch(setIsOpen2(true));
    dispatch(setShouldShowSideBar(true));
  }, []);
  const points = props.text ? props.text.split("\n") : [];
  return (
    <div className="bg-white shadow-md flex  flex-col rounded-lg mx-36 my-12">
      <img
        src={props.img}
        alt=""
        className="w-72 rounded-l-md !w-full object-cover max-h-[30vh]"
      />
      <div className="pl-8 py-16">
        <div
          className="text-4xl font-semibold"
          style={{ marginTop: "-50px", marginBottom: "30px" }}
        >
          {props.heading}
        </div>
        <div className="text-lg">
          {points.map((point, index) => (
            <p key={index}>{point}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
