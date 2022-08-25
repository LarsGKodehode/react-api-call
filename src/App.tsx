// Libraries
import {
  useState,
  useEffect,
} from 'react';

// CSS
import './App.css';

// Components

interface CatFact {
  fact: string;
};

function App() {
  // State management
  const [ catFacts, setCatFacts ] = useState("");
  const [ currentFact, setCurrentFact ] = useState(0);

  // Get first text
  useEffect(() => {
    // function for fetching data
    const fetcher = async () => {
      // Fetch
      const response = await fetch('https://catfact.ninja/facts');

      // Parse response
      const parsed = await response.json();

      // Get the interesting bits
      const newFacts = parsed.data.map((element: CatFact) => element.fact );

      // Push to state
      setCatFacts(newFacts);
    };

    // Call function
    fetcher();
  }, []);

  /**
   * Gets a new random fact
   */
  function updateFact() {
    const length = catFacts.length;
    const randomInteger = Math.floor(Math.random() * 10);
    setCurrentFact(randomInteger);
  };


  return (
    <div className="App">
      <p>{catFacts[currentFact]}</p>
      <button onClick={() => updateFact()}>Update</button>
    </div>
  );
};

export default App;
