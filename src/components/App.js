import './App.css';
import Home from './home/Home'
import { useGA4React } from "ga-4-react";

function App() {
  const ga = useGA4React();
  console.log(ga);

  return (
      <Home/>
  );
}

export default App;
