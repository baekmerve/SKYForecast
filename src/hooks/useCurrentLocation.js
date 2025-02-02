/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

export function useCurrentLocation() {
  const [locationData, setLocationData] = useState({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  // Function to fetch the current location
  const getCurrentLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true })); // Add this line

    // Check if Geolocation is available
    if ("geolocation" in navigator) {
      // If available, get the current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationData({
            coordinates: {
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            },
            error: null,
            isLoading: false,
          });
        },
        (error) => {
          let errorMessage;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                "Location permission denied. Please enable location access.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out.";
              break;
            default:
              errorMessage = "An unknown error occurred.";
          }
          setLocationData({
            coordinates: null,
            error: errorMessage,
            isLoading: false,
          });
        }
      );
    } else {
      // Geolocation is not supported
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by this browser.",
        isLoading: false,
      });
    }
  };
  useEffect(() => {
    // Get location on component mount
    getCurrentLocation();
  }, []);

  return {
    ...locationData,
    getCurrentLocation,
  };
}
export default useCurrentLocation;
