import React from "react";

const Blog = (props) => {
  const points = props.text ? props.text.split("\n") : [];
  return (
    <div className="bg-white shadow-md flex rounded-lg mx-36 my-12">
      <img src={props.img} alt="" className="w-72 rounded-l-md" />
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
