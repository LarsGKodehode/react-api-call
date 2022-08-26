// Libraries
import {
  useState,
  useEffect,
} from 'react';

// CSS
import './App.css';

// Components

interface CatFact {
  fact: Array<string>;
};

function App() {
  // State management
  const [ catFacts, setCatFacts ] = useState([]);
  const [ currentFact, setCurrentFact ] = useState("");

  // Get first text
  useEffect(() => {
    // function for fetching data
    const fetcher = async () => {
      // Fetch
      const response = await fetch('https://catfact.ninja/facts');

      // Parse response
      const parsed = await response.json();

      // Get the interesting bits
      const newFacts = parsed.data.map((element: CatFact) => element.fact);

      // Push to state
      setCatFacts(newFacts);
      setCurrentFact(newFacts[0]);
    };
    
    // Call function
    fetcher();
  }, []);
  
  /**
   * Gets a new random fact from locally stored cats
   */
  function updateFact() {
    const length = catFacts.length;
    const randomInteger = Math.floor(Math.random() * length);
    setCurrentFact(catFacts[randomInteger]);
  }; 


  return (
    <div className="App">
      <h1>Cat Fact of the day</h1>
      <p>{currentFact || 'Loading...'}</p>
      <button onClick={updateFact}>Get New Fact</button>
    </div>
  );
};

export default App;
