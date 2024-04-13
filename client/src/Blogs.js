import React from "react";
import Blog from "./components/blog/blog.js";
// import blog3 from "./assets/blog3.png";
import blog2 from "./assets/blog3.jpeg";
import blog3 from "./assets/blog1.jpeg";
import Trust from "./components/canITrust/canITrust.js";
// import AddBlog from "../components/AddBlog";
const Blogs = () => {
  return (
    <div className="bg-no-repeat bg-cover min-h-screen h-full">
      {/* <div className= "p-10 bg-[#2b343b] text-white text-5xl pl-16 font-bold">
        Blogs
      </div> */}
      <div className="">
        <Blog
          img={blog3}
          heading="How to avoid cryptocurrency scams?"
          text="Always research the cryptocurrency project, team, and technology before investing. Verify team members' credentials and look for legitimate whitepapers and official websites.
          Trade and buy cryptocurrencies on established and reputable exchanges.
          Never share private keys, recovery phrases, or personal information with anyone.
          Stay updated on cryptocurrency news, forums, and scams."
        />
        <Blog
          img={blog2}
          heading="What should be the next actions if someone is fallen victim to a cryptocurrency scam?"
          text="Report the scam to local law enforcement or cybercrime units to initiate an official investigation. Inform relevant cryptocurrency exchanges or platforms to prevent further damage. 
          Alert your bank or credit card issuer about fraudulent transactions to initiate chargebacks and protect your financial accounts. Learn from the experience and educate others to raise 
          awareness about cryptocurrency scams and prevent future victims."
        />
        {/* <AddBlog/> */}
      </div>
      <div>
        <Trust />
      </div>
    </div>
  );
};

export default Blogs;
