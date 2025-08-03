import React, { useState } from 'react';
import './Input.css';
import { db } from '../firebase';
import { ref, set } from "firebase/database";

// Web Speech API Setup (Voice to Text)
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US'; // default to English

function Input() {
  const [emergency, setEmergency] = useState('');
  const [instruction, setInstruction] = useState('');
  const [videoSrc, setVideoSrc] = useState('');
  const [language, setLanguage] = useState('en'); // English by default
  const [isListening, setIsListening] = useState(false);

  const classifyEmergency = (text) => {
    const t = text.toLowerCase();
    if (t.includes("bleeding")) {
      setInstruction(language === 'en' ? "Apply firm pressure with a clean cloth. एक साफ कपड़े से मजबूत दबाव डालें।" : "साफ कपड़े से दबाव डालें।");
      setVideoSrc("/assets/bleeding.mp4");
    } else if (t.includes("snake")) {
      setInstruction(language === 'en' ? "Keep the person calm and avoid movement and take him to nearby Hospital. व्यक्ति को शांत रखें और गति से बचें।" : "व्यक्ति को शांत रखें और गति से बचें।");
      setVideoSrc("/assets/snakebite.mp4");
    } else if (t.includes("car")) {
      setInstruction(language === 'en' ? "Check responsiveness and call emergency services. जवाबदेही जांचें और आपातकालीन सेवाओं को कॉल करें" : "जवाबदेही जांचें और आपातकालीन सेवाओं को कॉल करें।");
      setVideoSrc("/assets/caraccident.mp4");
    } else if (t.includes("bike")) {
      setInstruction(language === 'en' ? "Ensure safety and look for signs of injury or call 108.सुरक्षा सुनिश्चित करें और चोट के संकेत देखें।" : "सुरक्षा सुनिश्चित करें और चोट के संकेत देखें।");
      setVideoSrc("/assets/bikeaccident.mp4");
    } else if (t.includes("accident")) {
      setInstruction(language === 'en' ? "Call emergency number and do not move injured person.आपातकालीन नंबर पर कॉल करें और घायल व्यक्ति को न हिलाएं।" : "आपातकालीन नंबर पर कॉल करें और घायल व्यक्ति को न हिलाएं।");
      setVideoSrc("/assets/caraccident.mp4");
    } else {
      setInstruction(language === 'en' ? "Please keep the person calm. And describe the emergency in more detail and call 108. घायल व्यक्ति को न हिलाएं कृपया आपातकाल का विवरण अधिक स्पष्ट रूप से दें।" : "कृपया आपातकाल का विवरण अधिक स्पष्ट रूप से दें।");
      setVideoSrc('');
    }
  };

  const handleInputChange = (e) => {
    setEmergency(e.target.value);
    classifyEmergency(e.target.value);
  };

  const handleVoiceInput = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
      recognition.onresult = (event) => {
        const lastResult = event.results[event.results.length - 1];
        const text = lastResult[0].transcript;
        setEmergency(text);
        classifyEmergency(text);
      };
    }
  };

  const sendLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      set(ref(db, 'emergency/location'), {
        lat: latitude,
        lng: longitude,
        message: emergency
      });
      alert(language === 'en' ? "Location sent to emergency contacts." : "स्थान आपातकालीन संपर्कों को भेजा गया।");
    });
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en'); // Toggle between English and Hindi
  };

  return (
    <div className="input-container">
      <h2>{language === 'en' ? "Describe the Emergency" : "आपातकाल का विवरण दें"}</h2>
      <div className="input-group">
        <input
          type="text"
          value={emergency}
          onChange={handleInputChange}
          placeholder={language === 'en' ? "e.g. There is heavy bleeding" : "उदाहरण: भारी रक्तस्राव है"}
          className="emergency-input"
        />
      </div>

      <div className="input-group">
        <button
          className="mic-button"
          onClick={handleVoiceInput}
        >
          {isListening ? (language === 'en' ? "Stop Listening" : "सुनना बंद करें") : (language === 'en' ? "Start Listening" : "सुनना शुरू करें")}
        </button>
      </div>

      {instruction && (
        <div className="instruction-container">
          {videoSrc && <video src={videoSrc} controls className="instruction-video" />}
          <p className="instruction-text">{instruction}</p>
          <button className="send-location-btn" onClick={sendLocation}>
            {language === 'en' ? "Send Location" : "स्थान भेजें"}
          </button>
        </div>
      )}

      <button className="toggle-language-btn" onClick={toggleLanguage}>
        {language === 'en' ? "Switch to Hindi" : "अंग्रेजी मै स्विच करें" }
      </button>
    </div>
  );
}

export default Input;
