import { useState } from "react";
import useDebounce from "./debounce";
import logo from "./logo.svg";
import "./App.css";
import { useSuggestions } from "./suggestions";

function App() {
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 1000);
  const { result, loading } = useSuggestions(debounceQuery);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        {loading && <p>loading...</p>}
        {!loading &&
          result &&
          result.map((e: string) => {
            return <div>{e}</div>;
          })}
      </header>
    </div>
  );
}

export default App;
