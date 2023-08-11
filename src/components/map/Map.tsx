import {useEffect, useRef} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import {TCity, TOffer} from '../../types/offer';
import useMap from '../hooks/useMap';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../constants';
import 'leaflet/dist/leaflet.css';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT
});

type TMapProps = {
  targetOffer: TOffer | undefined;
  city: TCity;
  offers: TOffer[];
  pageType: string;
}

function Map({targetOffer, city, offers, pageType}: TMapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

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
  },[map, targetOffer, offers]);

  return <section className={`${pageType}__map map`} ref={mapRef} />;
}

export default Map;
