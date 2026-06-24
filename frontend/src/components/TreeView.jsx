function TreeView({ data, level = 0 }) {
    return (
      <>
        {Object.entries(data).map(([key, value]) => (
          <div key={key}>
            <div
              style={{
                marginLeft: `${level * 20}px`,
                padding: "4px 0"
              }}
            >
              {level > 0 ? "└─ " : ""}
              {key}
            </div>
  
            <TreeView
              data={value}
              level={level + 1}
            />
          </div>
        ))}
      </>
    );
  }
  
  export default TreeView;