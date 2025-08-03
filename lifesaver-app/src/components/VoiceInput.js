import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from "react-router-dom";

export default function VoiceInput() {
  const navigate = useNavigate();
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [typedText, setTypedText] = useState("");

  const handleSubmit = () => {
    const emergency = typedText || transcript;

    if (!emergency) {
      alert("Please type or speak an emergency description.");
      return;
    }

    localStorage.setItem("emergency_text", emergency);
    resetTranscript();
    setTypedText("");
    navigate("/instructions");
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>🗣️ Describe the Emergency</h2>

      <textarea
        rows={4}
        cols={40}
        placeholder="Type emergency here..."
        value={typedText}
        onChange={(e) => setTypedText(e.target.value)}
        style={{ fontSize: "1rem", padding: "1rem", marginBottom: "1rem" }}
      />

      <div>
        <button onClick={() => SpeechRecognition.startListening({ continuous: false })}>
          🎤 Start Voice
        </button>
        <button onClick={handleSubmit} style={{ marginLeft: "1rem" }}>
          ✅ Submit
        </button>
      </div>

      {transcript && (
        <p style={{ marginTop: "1rem" }}>
          <strong>Voice Input:</strong> {transcript}
        </p>
      )}
    </div>
  );
}
