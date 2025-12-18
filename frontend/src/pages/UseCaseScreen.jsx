import { useState } from "react";

export default function UseCaseScreen({ onSelect }) {
  const [useCase, setUseCase] = useState("");

  return (
    <div>
      <h2>Select Use Case</h2>
      <input
        value={useCase}
        onChange={(e) => setUseCase(e.target.value)}
        placeholder="Enter use case"
      />
      <button onClick={() => onSelect(useCase)}>Continue</button>
    </div>
  );
}
