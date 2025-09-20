import { useEffect, useState } from "react";
import hackconnectlogo from "../assets/hackconnectlogo.png"; 

export default function Splasher() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // trigger fade-out after 2s
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
  

  return (
    <div className={`splasher-container ${fadeOut ? "fade-out" : ""}`}>
      <img
        src={hackconnectlogo}
        alt="HackConnect"
        className="splash-logo"
        width={1000}
      />
    </div>
  );
}
