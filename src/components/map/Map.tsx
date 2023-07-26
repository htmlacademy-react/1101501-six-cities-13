import {useEffect, useRef} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import {TOffer} from '../../types/offer';
import useMap from '../use-map/UseMap';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../constants';
import 'leaflet/dist/leaflet.css';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

type TMapProps = {
  targetOffer: TOffer;
  offers: TOffer[];
}

function Map({targetOffer, offers}: TMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, targetOffer);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker.setIcon(
          (targetOffer?.location.latitude === offer?.location.latitude)
            && (targetOffer?.location.longitude === offer?.location.longitude)
            ? currentCustomIcon
            : defaultCustomIcon
        ).addTo(markerLayer);
      });
      return () => {
        map.removeLayer(markerLayer);
      };
    }
  },[map, targetOffer]);
  return <section className="cities__map map" ref={mapRef} />;
}

export default Map;
