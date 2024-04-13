import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TestComponent from "./components/test";
import Test2 from "./components/Test2";
import Layout from "./Layout";
import Login from "./kvh_components/Login";
import SignupCardOg from "./kvh_components/SignUp";
import generateRandomGraphData from "./sampleData/graphData";
import GraphComponent from "./components/GraphComponent";
import GraphVisualization from "./components/GraphViz";
import Label from "./components/labels/Label";
import Dashboard from "./components/Dashboard/Dashboard";
import Monitoring from "./components/Monitoring/Monitoring";
import ComplaintForm from "./components/Complaint";
import Blogs from "./Blogs";
import ComplainsTable from "./components/ComplaintsTable";
import MyComplaints from "./components/MyComplaints";
import AdminComplaint from "./components/csi_hack_components/AdminComplaint";
import AdminInnerComplaint from "./components/csi_hack_components/AdminInnerComplaint";

const App = () => {
  const graphData = generateRandomGraphData();

  // return (
  //   <div className="App">
  //     <h1>Sample Graph using vis-react</h1>
  //     {/* <GraphComponent graphData={graphData} /> */}
  //     <div>
  //       <GraphVisualization />
  //     </div>
  //   </div>
  // );

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/test2" element={<Test2 />} />
          <Route path="/test" element={<TestComponent />} />
          <Route path="/auth/signin" element={<Login />} />
          <Route path="/auth/signup" element={<SignupCardOg />} />
          <Route path="/boards/:board_id" element={<GraphVisualization />} />
          <Route path="/boards" element={<GraphVisualization />} />
          <Route path="/labels" element={<Label />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/test" element={<TestComponent />} />

          <Route path="/complaint" element={<ComplaintForm />} />
          <Route path="/complaints" element={<ComplainsTable />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
          <Route path="/admin/complaints" element={<AdminComplaint />} />
          <Route path="/admin/complaints/:complaint_id" element={<AdminInnerComplaint />} />

          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
