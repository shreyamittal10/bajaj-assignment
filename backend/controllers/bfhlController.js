const processHierarchy = (req, res) => {
    try {
      const { data } = req.body;
  
      if (!Array.isArray(data)) {
        return res.status(400).json({
          message: "data must be an array",
        });
      }
  
      const validEdges = [];
      const invalidEntries = [];
  
      const regex = /^[A-Z]->[A-Z]$/;
  
      // PHASE 1 - VALIDATION
      for (let entry of data) {
  
        if (typeof entry !== "string") {
          invalidEntries.push(String(entry));
          continue;
        }
  
        entry = entry.trim();
  
        if (!regex.test(entry)) {
          invalidEntries.push(entry);
          continue;
        }
  
        const [parent, child] = entry.split("->");
  
        if (parent === child) {
          invalidEntries.push(entry);
          continue;
        }
  
        validEdges.push(entry);
      }
  
      const uniqueEdges = [];
      const duplicateEdges = [];
  
      const seen = new Set();
      const duplicateSet = new Set();
  
      for (const edge of validEdges) {
  
        if (!seen.has(edge)) {
          seen.add(edge);
          uniqueEdges.push(edge);
        } else {
          duplicateSet.add(edge);
        }
      }
  
      duplicateEdges.push(...duplicateSet);

      const filteredEdges = [];
      const childParentMap = new Map();

      for (const edge of uniqueEdges) {

      const [parent, child] = edge.split("->");

      if (!childParentMap.has(child)) {

      childParentMap.set(child, parent);
      filteredEdges.push(edge);

      }

      }

      // PHASE 4 - GRAPH CONSTRUCTION
const graph = {};
const indegree = {};

for (const edge of filteredEdges) {

  const [parent, child] = edge.split("->");

  if (!graph[parent]) {
    graph[parent] = [];
  }

  if (!graph[child]) {
    graph[child] = [];
  }

  graph[parent].push(child);

  indegree[child] = (indegree[child] || 0) + 1;

  if (!(parent in indegree)) {
    indegree[parent] = 0;
  }
}

// PHASE 5 - CONNECTED COMPONENTS

const undirectedGraph = {};

for (const node in graph) {
  undirectedGraph[node] = [];
}

for (const edge of filteredEdges) {

  const [parent, child] = edge.split("->");

  undirectedGraph[parent].push(child);
  undirectedGraph[child].push(parent);
}

const visited = new Set();
const components = [];

for (const node in undirectedGraph) {

  if (visited.has(node)) continue;

  const component = [];
  const stack = [node];

  while (stack.length > 0) {

    const current = stack.pop();

    if (visited.has(current)) continue;

    visited.add(current);
    component.push(current);

    for (const neighbour of undirectedGraph[current]) {

      if (!visited.has(neighbour)) {
        stack.push(neighbour);
      }
    }
  }

  component.sort();
  components.push(component);
}

  const buildTree = (node) => {

    const children = {};
  
    for (const child of graph[node]) {
      children[child] = buildTree(child);
    }
  
    return children;
  };
  
  const calculateDepth = (node) => {
  
    if (graph[node].length === 0) {
      return 1;
    }
  
    let maxDepth = 0;
  
    for (const child of graph[node]) {
      maxDepth = Math.max(
        maxDepth,
        calculateDepth(child)
      );
    }
  
    return maxDepth + 1;
  };

const hierarchies = [];

for (const component of components) {

  let roots = component.filter(node => indegree[node] === 0);

  let root;

  if (roots.length > 0) {
    roots.sort();
    root = roots[0];
  } else {
    root = [...component].sort()[0];
  }

  const visitedNodes = new Set();
  const recursionStack = new Set();

  let hasCycle = false;

  const dfsCycle = (node) => {

    if (recursionStack.has(node)) {
      hasCycle = true;
      return;
    }

    if (visitedNodes.has(node)) {
      return;
    }

    visitedNodes.add(node);
    recursionStack.add(node);

    for (const child of graph[node]) {
      dfsCycle(child);
    }

    recursionStack.delete(node);
  };

  for (const node of component) {

    if (!visitedNodes.has(node)) {
      dfsCycle(node);
    }

    if (hasCycle) break;
  }

  if (hasCycle) {

    hierarchies.push({
      root,
      tree: {},
      has_cycle: true
    });
  
  } else {
  
    const tree = {
      [root]: buildTree(root)
    };
  
    const depth = calculateDepth(root);
  
    hierarchies.push({
      root,
      tree,
      depth
    });
  }
}

let totalTrees = 0;
let totalCycles = 0;

let largestTreeRoot = "";
let largestDepth = 0;

for (const hierarchy of hierarchies) {

  if (hierarchy.has_cycle) {
    totalCycles++;
  } else {

    totalTrees++;

    if (
      hierarchy.depth > largestDepth ||
      (
        hierarchy.depth === largestDepth &&
        hierarchy.root < largestTreeRoot
      )
    ) {
      largestDepth = hierarchy.depth;
      largestTreeRoot = hierarchy.root;
    }
  }
}

res.status(200).json({
    user_id: "shreyamittal_10022005",
    email_id: "shreya0970.be23@chitkara.edu.in",
    college_roll_number: "2310990970",
  
    hierarchies,
  
    invalid_entries: invalidEntries,
  
    duplicate_edges: duplicateEdges,
  
    summary: {
      total_trees: totalTrees,
      total_cycles: totalCycles,
      largest_tree_root: largestTreeRoot
    }
  });
  
    } catch (error) {
      console.log(error);
  
      res.status(500).json({
        message: "Server Error",
      });
    }
  };
  
  module.exports = {
    processHierarchy,
  };