import React from "react";
import Blog from "./components/blog/blog.js";
// import blog3 from "./assets/blog3.png";
import blog2 from "./assets/blog3.jpeg";
import blog3 from "./assets/blog1.jpeg";

import img_1 from "./assets/img_1.jpg";
import img_2 from "./assets/img_2.jpg";

import Trust from "./components/canITrust/canITrust.js";
// import AddBlog from "../components/AddBlog";

const blogs = [
  {
    heading:
      "Empowering Individuals: The Importance of Raising Awareness about Lodging Complaints Against Malpractices",

    Description: `This article focuses on the significance of educating individuals about the process of lodging complaints against malpractices. It highlights the importance of empowering individuals to speak up against various forms of misconduct, such as corruption, fraud, discrimination, and unethical behavior. The article emphasizes the role of awareness campaigns, educational programs, and accessible complaint mechanisms in fostering accountability and transparency in both public and private sectors. 
  How Web3 is shaping it: Web3 technology plays a crucial role in democratizing access to information and communication channels. Blockchain-based platforms and decentralized applications (DApps) provide secure and transparent mechanisms for lodging complaints and documenting malpractices. Smart contracts enable automated governance processes, ensuring that complaints are addressed fairly and transparently. Moreover, blockchain-based identity solutions enhance trust and authenticity in complaint submissions, thereby encouraging more individuals to report malpractices without fear of reprisal.`,
    img: img_1,
  },

  {
    img: img_2,
    heading:
      "Building a Culture of Accountability: Strategies for Encouraging Complaint Reporting Against Malpractices",

    Description: `This article explores various strategies for fostering a culture of accountability and encouraging individuals to report malpractices through formal complaint mechanisms. It discusses the importance of creating safe environments where whistleblowers feel supported and protected. The article examines best practices for designing complaint systems that are accessible, confidential, and responsive to the needs of complainants. Additionally, it explores the role of leadership, organizational culture, and public awareness campaigns in promoting ethical behavior and discouraging misconduct.
  
  How Web3 is shaping it: Web3 technologies offer innovative solutions for enhancing accountability and transparency in complaint reporting processes. Decentralized platforms powered by blockchain technology provide immutable records of complaints, ensuring the integrity and transparency of the reporting process. Smart contract-based incentive mechanisms can incentivize individuals to report malpractices by rewarding them with tokens or other forms of digital assets. Furthermore, decentralized governance models enable community-driven oversight and decision-making, reducing the risk of censorship or manipulation in complaint handling.`,
  },
];

const Blogs = () => {
  return (
    <div className="bg-no-repeat bg-cover min-h-screen h-full">
      {/* <div className= "p-10 bg-[#2b343b] text-white text-5xl pl-16 font-bold">
        Blogs
      </div> */}
      <div className="">
        {blogs.map((blog, index) => {
          return (
            <Blog
              key={index}
              img={blog.img}
              heading={blog.heading}
              text={blog.Description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Blogs;
