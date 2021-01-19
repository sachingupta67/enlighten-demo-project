import React, { useState, useEffect } from "react";

const Speak = (props) => {
  const { active, onResult, onEnd } = props;
  const [recognition, setRecognition] = useState();
  const result = (event) => {
    const transcript = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");

    onResult && onResult(transcript);
  };

  const end = (event) => {
    if (active) {
      recognition.start();
    } else {
      onEnd && onEnd();
    }
  };

  useEffect(() => {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const r = new window.SpeechRecognition();

    r.interimResults = true;
    r.addEventListener("result", result);
    r.addEventListener("end", end);
    setRecognition(r);
  }, []);

  useEffect(() => {
    if (active) {
      try {
        recognition.start();
      } catch (e) {}
    }
  }, [active]);

  return null;
};

export default Speak;
