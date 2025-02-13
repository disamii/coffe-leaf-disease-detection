import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "../../styling/header.css";
import { useSelector, useDispatch } from "react-redux";
import HeaderResearcher from "./HeaderResearcher";
import HeaderFarmer from "./HeaderFarmer";

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <p style={{ color: "#483C32", fontSize: "15px" }}>
      Current Time: {currentTime.toLocaleString()}
    </p>
  );
};

const LocationDisplay = () => {
  const [location, setLocation] = useState({ city: null, country: null });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationDetails = async (latitude, longitude) => {
      try {
        const apiKey = "944bcffca12044ecb551b956853ef0ee"; // Replace with your API key
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch location details.");
        }

        const data = await response.json();
        const components = data.results[0].components;
        setLocation({
          city:
            components.city ||
            components.town ||
            components.village ||
            "Unknown",
          country: components.country,
        });
      } catch (err) {
        setError("Error retrieving location details.");
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationDetails(latitude, longitude);
        },
        () => setError("Unable to retrieve location.")
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div className="location">
      {error ? (
        <p>{error}</p>
      ) : location.city && location.country ? (
        <p style={{ color: "#483C32", fontSize: "15px" }}>
          City: {location.city}, Country: {location.country}
        </p>
      ) : (
        <p style={{ color: "#483C32", fontSize: "15px" }}>
          Fetching location...
        </p>
      )}
    </div>
  );
};

export default function HeaderAuth() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();


  return (
    <>
      <div className="Header">
        <div className="header-top">
          <CurrentTime />
          <div
            className="location"
            style={{ display: "flex", alignItems: "center" }}
          >
            <LocationOnIcon style={{ color: "#6F4E37", marginRight: "5px" }} />
            <LocationDisplay />
          </div>
        </div>
        {user && user.role === "researcher" && <HeaderResearcher />}
        {user && user.role === "farmer" && <HeaderFarmer />}
      </div>
    </>
  );
}
