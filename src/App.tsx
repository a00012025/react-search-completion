import { useState } from "react";
import useDebounce from "./debounce";
import "./App.css";
import { useSuggestions } from "./suggestions";
import "./tailwind.css";

function App() {
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 1000);
  const { result, loading } = useSuggestions(debounceQuery);

  return (
    <div className="App bg-gray-100 flex items-center justify-center">
      <header className="App-header">
        <div className="w-full max-w-md">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search..."
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          {loading && <p>Loading...</p>}
          {!loading && result && (
            <ul className="mt-3">
              {result.map((e: string) => {
                return (
                  <li
                    key={e}
                    className="list-none bg-black px-4 py-2 mb-2 rounded shadow"
                  >
                    {e}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
