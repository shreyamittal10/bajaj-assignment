import TreeNode from "./TreeNode";

function HierarchyCard({ hierarchy }) {
  return (
    <div className="hierarchy-card">
      <div className="hierarchy-header">
        <h3>Root: {hierarchy.root}</h3>

        {hierarchy.has_cycle ? (
          <span className="cycle-badge">
            Cycle Detected
          </span>
        ) : (
          <span className="depth-badge">
            Depth: {hierarchy.depth}
          </span>
        )}
      </div>

      {hierarchy.has_cycle ? (
        <p className="cycle-message">
          This hierarchy contains a cycle.
        </p>
      ) : (
        <div className="tree-container">
          <TreeNode
            name={hierarchy.root}
            childrenNodes={hierarchy.tree[hierarchy.root]}
          />
        </div>
      )}
    </div>
  );
}

export default HierarchyCard;