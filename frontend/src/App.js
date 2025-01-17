import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("/api/hello")
        .then(response => setMessage(response.data))
        .catch(error => console.error("Error fetching API:", error));
  }, []);

  return (
      <div>
        <h1>{message || "Loading..."}</h1>
      </div>
  );
}

export default App;
