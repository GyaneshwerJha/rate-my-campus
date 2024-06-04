import ReactMapGL, { Marker } from "react-map-gl";

const CampusMap = ({ geometry }) => {
  const [lng, lat] = geometry.coordinates;
  return (
    <div className="h-[300px] sm:h-[400px] rounded-2xl overflow-hidden">
      <ReactMapGL
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 10,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken="pk.eyJ1IjoiZ3lhbmVzaHdlcmpoYSIsImEiOiJjbHYycHh5cGYwZzVhMmpyN3JoZHRvdW9hIn0.K8KUn49I37VstVxVk-FgEA"
      >
        <Marker
          longitude={lng}
          latitude={lat}
          anchor="bottom"
          color="#ff0000"
        />
      </ReactMapGL>
    </div>
  );
};
export default CampusMap;
