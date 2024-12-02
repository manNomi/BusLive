import { NaverMap, Container as MapDiv } from "react-naver-maps";
import { NavermapsProvider } from "react-naver-maps";
import OLMapComponent from "./OLMap";
import { useRef } from "react";

const NaverMapDiv = ({ center, zoom, setCenter, setZoom }) => {
  const naverMapRef = useRef(null);
  const handleOLMapChange = (newCenter, newZoom) => {
    setCenter(newCenter);
    setZoom(newZoom);
    if (naverMapRef.current) {
      naverMapRef.current.setCenter(newCenter);
      naverMapRef.current.setZoom(newZoom);
    }
  };
  return (
    <NavermapsProvider ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID}>
      <MapDiv style={{ width: "100%", height: "90vh", position: "relative" }}>
        <NaverMap
          ref={naverMapRef}
          center={center}
          zoom={zoom}
          style={{ width: "100%", height: "100%" }}
        />
        <div
          id="ol-map"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}>
          <OLMapComponent
            center={center}
            zoom={zoom}
            onMapChange={handleOLMapChange}
          />
        </div>
      </MapDiv>
    </NavermapsProvider>
  );
};
export default NaverMapDiv;