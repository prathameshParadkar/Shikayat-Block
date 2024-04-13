const graph = {};

const makeGraph = (txsList) => {
  txsList.forEach((txs) => {
    txs.txs.forEach((tx) => {
      if (!Object.keys(graph).includes(tx.from)) {
        graph[tx.from] = [];
      }
      if (!graph[tx.from].includes(tx.to)) graph[tx.from].push(tx.to);
    });
  });
};

makeGraph(transactions.data.data.txs);

function findAllCycles(graph, node, visited, stack, cycles) {
  visited[node] = true;
  if (node in Object.keys(graph)) {
    stack.push(node);

    graph[node].forEach((neighbor) => {
      if (!visited[neighbor]) {
        findAllCycles(graph, neighbor, visited, stack, cycles);
      } else if (stack.includes(neighbor)) {
        const cycle = stack.slice(stack.indexOf(neighbor));
        cycles.push(cycle);
      }
    });
  }
  stack.pop();
  visited[node] = false;
}

function detectAllCycles(graph) {
  const numNodes = Object.keys(graph).length;
  const visited = {};
  const cycles = [];

  Object.keys(graph).forEach((node) => {
    visited[node] = false;
  });

  Object.keys(graph).forEach((node) => {
    if (!visited[node]) {
      const stack = [];
      findAllCycles(graph, node, visited, stack, cycles);
    }
  });

  return cycles;
}

// Example usage
const graph2 = {
  0: [1],
  1: [2],
  2: [3, 4],
  3: [0],
  4: [2],
};

const allCycles = detectAllCycles(graph2);
if (allCycles.length > 0) {
  console.log("All cycles in the graph:", allCycles);
} else {
  console.log("No cycles found.");
}
