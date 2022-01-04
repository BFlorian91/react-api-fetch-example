import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://covid19-api.com/country/all?format=json"
      );
      const data = await res.json();
      setData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="loading"><ClipLoader color={'#FFF'} size={'50px'} /></div>;
  if (error) return <div className="error">❌ {error}</div>;

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">🌿 All Countries 🌴</h1>
        {data.map((country, index) => (
          <p className="country" key={index}>
            {country.country} <br />
            Deaths: {country.deaths}
          </p>
        ))}
      </header>
    </div>
  );
}

export default App;
