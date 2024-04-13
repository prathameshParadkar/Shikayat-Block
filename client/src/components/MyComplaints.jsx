import React from "react";
import { useState, useEffect } from "react";

const MyComplaints = () => {
  const [data, setData] = useState(null);
  const user_id = "123";
  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:5000/?user_id=${user_id}`);
    socket.onopen = () => {
      console.log("Connected to server");
      socket.send(JSON.stringify({ type: "getMyComplaints" }));
    };

    socket.onmessage = (event) => {
      console.log("Data received from server: ", event.data);
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    return () => socket.close();
  }, []);

  return (
    <div>
      {data ? (
        <div>
          <h1>My Complaints</h1>
          {JSON.stringify(data)}
          {/* <ComplaintsTable data={data} /> */}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default MyComplaints;
