import './MapViewModal.scss';
import { Modal } from '../../layout';
import { Icon } from '../../common';
import GoogleMapReact from 'google-map-react';
const { VITE_API_KEY } = import.meta.env;

interface MapViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
  statment?: string;
  buttonLabel?: string;
  buttonOnClick?: () => void;
  origin: CoordinateProps;
  destination: CoordinateProps;
}

interface CoordinateProps {
  lat: number;
  lng: number;
}

const handleApiLoaded = (
  map: google.maps.Map,
  origin: CoordinateProps,
  destination: CoordinateProps,
) => {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  directionsService.route(
    {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error(`error fetching directions ${result}`);
      }
    },
  );
};

const MapViewModal = ({
  isOpen,
  onClose,
  statment,
  origin,
  destination,
}: MapViewModalProps) => {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  return (
    <Modal
      className="success-modal"
      isOpen={isOpen}
      onClose={onClose}
      maxWidth={800}
    >
      <div className="success-modal__icon">
        <Icon className="IoMapSharp success" name="IoMapSharp" />
      </div>
      <h1> {statment}</h1>
      <div style={{ height: 300, width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: VITE_API_KEY }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) =>
            handleApiLoaded(map, origin, destination)
          }
        ></GoogleMapReact>
      </div>
    </Modal>
  );
};

export default MapViewModal;
