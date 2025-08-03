import React, { useEffect, useState } from "react";

const MOCK_INSTRUCTIONS = {
  bleeding: "Apply pressure to the wound using a clean cloth.",
  fainting: "Lay the person down and elevate their legs.",
  default: "Call emergency services immediately.",
};

export default function FirstAid() {
  const [instruction, setInstruction] = useState("");

  useEffect(() => {
    const text = localStorage.getItem("emergency_text")?.toLowerCase() || "";
    if (text.includes("bleed")) setInstruction(MOCK_INSTRUCTIONS.bleeding);
    else if (text.includes("faint")) setInstruction(MOCK_INSTRUCTIONS.fainting);
    else setInstruction(MOCK_INSTRUCTIONS.default);
  }, []);

  return (
    <div>
      <h2>📢 First Aid Instructions</h2>
      <p>{instruction}</p>
    </div>
  );
}
