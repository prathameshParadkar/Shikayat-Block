// src/GraphComponent.js

import React from "react";
import { Network } from "vis-network";

const GraphComponent = ({ graphData }) => {
  const containerRef = React.useRef(null);
  const networkRef = React.useRef(null);

  function handleHoverNode(event) {
    console.log("in handleHoverNode");
    const { node } = event;
    const { nodes } = networkRef.current.body;
    const { edges } = networkRef.current.body;

    console.log(node);
    console.log(nodes);
    console.log(edges);
  }

  const optionsv1 = {
    nodes: {
      shape: "circle",
    },
    edges: {
      color: "orange", // Change the color of links (edges) to orange
      arrows: "to;",
    },
    physics: {
      enabled: false,
    },
  };

  let options = {
    layout: {
      randomSeed: 2,
    },
    nodes: {
      fixed: {
        x: false,
        y: false,
      },
      shape: "dot",
      size: 13,
      borderWidth: 1.5,
      borderWidthSelected: 2,
      font: {
        size: 15,
        align: "center",
        bold: {
          color: "#bbbdc0",
          size: 15,
          vadjust: 0,
          mod: "bold",
        },
      },
    },
    edges: {
      width: 0.01,
      color: {
        color: "#D3D3D3",
        highlight: "#797979",
        hover: "#797979",
        opacity: 1.0,
      },
      arrows: {
        to: { enabled: true, scaleFactor: 1, type: "arrow" },
        middle: { enabled: false, scaleFactor: 1, type: "arrow" },
        from: { enabled: true, scaleFactor: 1, type: "arrow" },
      },
      smooth: {
        type: "continuous",
        roundness: 0,
      },
    },
    groups: {
      Physics: {
        color: {
          background: "#ffffff",
          border: "#acdbae",
          highlight: {
            border: "#acdbae",
            background: "#ffffff",
          },
          hover: {
            border: "#acdbae",
            background: "#ffffff",
          },
        },
      },
      Chemistry: {
        color: {
          background: "#ffffff",
          border: "#f3bd86",
          highlight: {
            border: "#f3bd86",
            background: "#ffffff",
          },
          hover: {
            border: "#f3bd86",
            background: "#ffffff",
          },
        },
      },
      Biology: {
        color: {
          background: "#ffffff",
          border: "#c89dc8",
          highlight: {
            border: "#c89dc8",
            background: "#ffffff",
          },
          hover: {
            border: "#c89dc8",
            background: "#ffffff",
          },
        },
      },
      Mathematics: {
        color: {
          background: "#ffffff",
          border: "#52CBEC",
          highlight: {
            border: "#52CBEC",
            background: "#ffffff",
          },
          hover: {
            border: "#52CBEC",
            background: "#ffffff",
          },
        },
      },
      English: {
        color: {
          background: "#ffffff",
          border: "#c2b59b",
          highlight: {
            border: "#c2b59b",
            background: "#ffffff",
          },
          hover: {
            border: "#c2b59b",
            background: "#ffffff",
          },
        },
      },
      "Logical Reasoning": {
        color: {
          background: "#ffffff",
          border: "#87a6aa",
          highlight: {
            border: "#87a6aa",
            background: "#ffffff",
          },
          hover: {
            border: "#87a6aa",
            background: "#ffffff",
          },
        },
      },
    },
    physics: {
      enabled: false,
    },
    interaction: {
      hover: true,
    },
  };

  React.useEffect(() => {
    if (!networkRef.current) {
      networkRef.current = new Network(
        containerRef.current,
        graphData,
        options
      );
    } else {
      networkRef.current.setData(graphData);

      const timelineInstance = networkRef.current.$el;
      console.log("timelineInstance: ", timelineInstance);
      // Add the hoverNode event listener
      timelineInstance.on("hoverNode", handleHoverNode);
    }
  }, [graphData]);

  return (
    <div
      ref={containerRef}
      style={{ height: "500px" }}
      //   hoverNode={() => {
      //     console.log("in hovvvver node");
      //   }}
    ></div>
  );
};

export default GraphComponent;
