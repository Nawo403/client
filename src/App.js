import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [trains, setTrains] = useState([]);

  // Fetch trains from the API every 5 seconds
  useEffect(() => {
    fetchTrains(); // Initial fetch

    const interval = setInterval(() => {
      fetchTrains();
    }, 5000); // Call every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const fetchTrains = () => {
    axios
      .get("https://train-api-production-7912.up.railway.app/api/trains")
      .then((response) => {
        setTrains(response.data);
      })
      .catch((error) => {
        console.error("Error fetching trains:", error);
      });
  };

  // Function to open Google Maps with the given latitude and longitude
  const openInGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, "_blank");
  };

  return (
    <div className="App container mt-4">
      <header
        className="App-header p-3 mb-4"
        style={{
          backgroundColor: "white",
          color: "darkblue",
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        <h1 className="font-weight-bold">Live Train Tracking</h1>
        <h5 className="mb-4 font-weight-bold">By Thilini</h5>

        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Route</th>
              <th>Current Station</th>
              <th>Start Station</th>
              <th>End Station</th>
              <th>Live Location</th>
            </tr>
          </thead>
          <tbody>
            {trains
              .slice()
              .reverse()
              .map((train) => (
                <tr key={train._id}>
                  <td>{train.name}</td>
                  <td>{train.route}</td>
                  <td>{train.currentStation}</td>
                  <td>{train.startStation}</td>
                  <td>{train.endStation}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        openInGoogleMaps(
                          train.currentLocation.latitude,
                          train.currentLocation.longitude
                        )
                      }
                    >
                      View on Map
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default App;
