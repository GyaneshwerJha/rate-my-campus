import Map, { Marker, Popup } from "react-map-gl";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const ClusterMap = ({ campuses }) => {
  const [selectedCampus, setSelectedCampus] = useState(null);

  if (campuses.length > 0) {
    return (
      <div className="h-[300px] sm:h-[400px]">
        <Map
          initialViewState={{
            longitude: -123.1207,
            latitude: 49.2827,
            zoom: 8.5,
          }}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxAccessToken="pk.eyJ1IjoiZ3lhbmVzaHdlcmpoYSIsImEiOiJjbHYycHh5cGYwZzVhMmpyN3JoZHRvdW9hIn0.K8KUn49I37VstVxVk-FgEA"
        >
          {campuses.map((campus) => (
            <Marker
              key={campus._id}
              longitude={campus.geometry.coordinates[0]}
              latitude={campus.geometry.coordinates[1]}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setSelectedCampus(campus);
              }}
            >
              <button>
                <FaMapMarkerAlt size={30} color="#ff0000" />
              </button>
            </Marker>
          ))}
          {selectedCampus && (
            <Popup
              longitude={selectedCampus.geometry.coordinates[0]}
              latitude={selectedCampus.geometry.coordinates[1]}
              anchor="top"
              onClose={() => setSelectedCampus(false)}
              focusAfterOpen={false}
            >
              <h5 className="text-sm tracking-wide ">{selectedCampus.name}</h5>
              <Link to={`/campuses/${selectedCampus._id}`}>
                <p className="text-blue-700 hover:underline tracking-wide ">
                  View campus
                </p>
              </Link>
            </Popup>
          )}
        </Map>
      </div>
    );
  }
};
export default ClusterMap;
