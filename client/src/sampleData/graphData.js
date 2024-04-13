// src/sampleData.js

const generateRandomGraphData = () => {
  const nodes = [];
  const edges = [];
  const nodeCount = 10;
  const edgeCount = 15;

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({ id: i + 1, label: `Node ${i + 1}` });
  }

  for (let i = 0; i < edgeCount; i++) {
    const from = Math.floor(Math.random() * nodeCount) + 1;
    let to = Math.floor(Math.random() * nodeCount) + 1;

    // Make sure "from" and "to" are not the same
    while (to === from) {
      to = Math.floor(Math.random() * nodeCount) + 1;
    }

    edges.push({ id: `e${i}`, from, to });
  }

  return { nodes, edges };
};

export default generateRandomGraphData;
