import { useState } from "react";

function InputForm({ setResult }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const data = input
  .split("\n")
  .map(item => item.trim())
  .filter(item => item !== "");

      const response = await fetch(
        "https://backend-j5i6.onrender.com/bfhl",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data }),
        }
      );

      const result = await response.json();

      setResult(result);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <textarea
        rows="10"
        placeholder="Enter edges...

A->B
A->C
B->D"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}

export default InputForm;
