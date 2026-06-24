import { useState } from "react";
import InputForm from "./components/InputForm";
import SummaryCard from "./components/SummaryCard";
import HierarchyCard from "./components/HierarchyCard";
import "./App.css";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="container">
      <h1>BFHL Hierarchy Analyzer</h1>

      <InputForm setResult={setResult} />

      {result && (
        <>
          <SummaryCard summary={result.summary} />

          <div className="hierarchies">
            {result.hierarchies.map((hierarchy, index) => (
              <HierarchyCard
                key={index}
                hierarchy={hierarchy}
              />
            ))}
          </div>

          <div className="extra-card">
            <h3>Invalid Entries</h3>

            {result.invalid_entries.length === 0 ? (
              <p>None</p>
            ) : (
              <ul>
                {result.invalid_entries.map((entry, index) => (
                  <li key={index}>{entry}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="extra-card">
            <h3>Duplicate Edges</h3>

            {result.duplicate_edges.length === 0 ? (
              <p>None</p>
            ) : (
              <ul>
                {result.duplicate_edges.map((edge, index) => (
                  <li key={index}>{edge}</li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;