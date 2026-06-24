function SummaryCard({ summary }) {
    return (
      <div className="summary-card">
  
        <h2>Summary</h2>
  
        <div className="summary-grid">
  
          <div className="summary-item">
            <h3>{summary.total_trees}</h3>
            <p>Total Trees</p>
          </div>
  
          <div className="summary-item">
            <h3>{summary.total_cycles}</h3>
            <p>Total Cycles</p>
          </div>
  
          <div className="summary-item">
            <h3>
              {summary.largest_tree_root || "-"}
            </h3>
            <p>Largest Root</p>
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default SummaryCard;