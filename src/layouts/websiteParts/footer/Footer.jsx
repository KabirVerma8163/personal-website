import React, { useState, useEffect } from "react";
import WaveComponent from "./WaveComponent.jsx";
// ... other imports ...

function ReactFooter({ pageName, links, styleTags }) {
  const [parentHeight, setParentHeight] = useState('auto');
  const [visible, setVisible] = useState(pageName === "home"); // Immediately visible if pageName is "home"

  useEffect(() => {
    if (pageName !== "home") {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 500);
      
      // Cleanup function to clear the timeout if the component is unmounted before the timeout is finished
      return () => {
        clearTimeout(timer);
      };
    }
  }, [pageName]);

  // If not visible, return null (don't render anything)
  if (!visible) return null;

  // ... rest of the component logic ...
  let { contact, Footer, waveContainer } = styleTags;

  return (
    <>
      <div 
        id="ReactFooter" 
        className={`Footer ${Footer}`}
        style={{ height: parentHeight }}
      >
        <div id="WaveContainer" className={`waveContainer ${waveContainer}`}>
          <WaveComponent 
            setParentHeight={setParentHeight}
            pageName={pageName}
          />
        </div>
      </div>
    </>
  );
}

export default ReactFooter;
