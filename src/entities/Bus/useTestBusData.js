import { useState } from "react";
import React from "react";

export const getTestBusData = () => {
  const nodes = [
    { lastNode: 0, lat: 37.4478052441598, lng: 126.646296789041 },
    { lastNode: 3, lat: 37.4460269045282, lng: 126.643593618829 },
    { lastNode: 15, lat: 37.4503492910096, lng: 126.659916449765 },
    { lastNode: 27, lat: 37.4587371703138, lng: 126.676210388807 },
    { lastNode: 36, lat: 37.4641711732054, lng: 126.677968529141 },
    { lastNode: 60, lat: 37.4487536815333, lng: 126.649458501003 },
  ];
  return nodes;
};

const useTestBusData = () => {
  const [busData, setBusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const busData = getTestBusData();
        setBusData(busData);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };

    fetchData();
  }, []);
  return [busData, loading, error];
};
export default useTestBusData;
