function TreeNode({ name, childrenNodes }) {
    const childEntries = Object.entries(childrenNodes);
  
    return (
      <div className="tree-node">
        <div className="node-circle">
          {name}
        </div>
  
        {childEntries.length > 0 && (
          <>
            <div className="vertical-line"></div>
  
            <div className="children-container">
              {childEntries.map(([childName, childData]) => (
                <TreeNode
                  key={childName}
                  name={childName}
                  childrenNodes={childData}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
  
  export default TreeNode;