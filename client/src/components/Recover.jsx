import React, { useEffect, useState } from "react";
import Graph from "react-graph-vis";
import { useLocation, useParams } from "react-router-dom";
import { mtransData } from "../sampleData/transData";

const GraphVisualization = () => {
  const { board_id } = useParams();
  console.log("board_id:", board_id);
  const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const showResults = queryParams.get("show_results");
  // Sample graph data in visjs format
  const graphData2 = {
    nodes: [
      {
        id: "0xba2de4a5a477066fc107c9427b34d6519e7ed572",
        label: "0xba2de4a5a477066fc107c9427b34d6519e7ed572",
      },
      {
        id: "0x1111111254eeb25477b68fb85ed929f73a960582",
        label: "0x1111111254eeb25477b68fb85ed929f73a960582",
      },
      // { id: 3, label: "Node 3" },
      // { id: 4, label: "Node 4" },
    ],
    edges: [
      {
        from: "0x1111111254eeb25477b68fb85ed929f73a960582",
        to: "0xba2de4a5a477066fc107c9427b34d6519e7ed572",
      },
      // { from: 1, to: 3 },
      // { from: 2, to: 3 },
      // { from: 3, to: 4 },
    ],
  };

  const [graphData, setGraphData] = useState({
    nodes: [],
    edges: [],
  });

  // const graphData = {
  //   nodes: [],
  //   edges: [],
  // };

  useEffect(() => {
    const nodeArr = [];
    const edgeArr = [];
    const nodeSet = new Set();
    const edgeSet = new Set();
    console.log("mtransData:", mtransData.data.items);
    for (let index in mtransData.data.items) {
      const arrayData = mtransData.data.items[index];
      console.log("arrayData:", arrayData);
      const fromAddress = arrayData.from_address;
      const toAddress = arrayData.to_address;
      // const senderAddress = arrayData.log_events[0].sender_address;
      const transactionAddress = arrayData.tx_hash;

      console.log("fromAddress:", fromAddress);
      console.log("toAddress:", toAddress);

      edgeArr.push({
        from: fromAddress,
        to: toAddress,
        // label: transactionAddress,
      });

      if (!nodeSet.has(toAddress)) {
        nodeArr.push({
          id: toAddress,
          // label: toAddress,
          label: "Add",
          // title: fromAddress,
        });

        nodeSet.add(toAddress);
      }

      if (!nodeSet.has(fromAddress)) {
        nodeArr.push({
          id: fromAddress,
          // label: fromAddress,
          label: "Add",
          // title: fromAddress,
        });
        nodeSet.add(fromAddress);
      }

      // nodeArr.push({
      //   id: fromAddress,
      //   label: fromAddress,
      //   // title: fromAddress,
      // });

      edgeSet.add({
        from: fromAddress,
        to: toAddress,
        label: transactionAddress,
      });
    }

    // multiple transactions hue rahenge toh humko cumulative lena padga []

    // graphData.nodes = nodeArr;
    // graphData.edges = edgeArr;
    // setGraphData({
    //   nodes: Array.from(nodeSet),
    //   edges: Array.from(edgeSet),
    // });
    setGraphData({
      nodes: nodeArr,
      edges: edgeArr,
    });

    console.log("graphData:", {
      nodes: nodeArr,
      edges: edgeArr,
    });
  }, []);

  //   Options for graph visualization
  //     const options = {
  //       interaction: { hover: true },
  //     };

  // Define the hoverNode event handler
  const handleNodeHover = (event) => {
    console.log("event:", event);
    console.log("Hovered node:");
    // console.log("Hovered node ID:", event.nodes[0]);

    // Add your custom actions or information display logic here
  };

  return (
    <div className= "h-screen flex">
      <Graph
        graph={graphData}
        options={{
          interaction: { hover: true },
          physics: {
            enabled: false,
          },
        }}
        events={{ hoverNode: handleNodeHover }}
        style={{ height: "100%" }}
      />
    </div>
  );
};

export default GraphVisualization;
