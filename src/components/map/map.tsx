import {useEffect, useRef} from 'react';
import {Icon, Marker, layerGroup, LayerGroup} from 'leaflet';
import {TCity, TOffer} from '../../types/offer';
import useMap from '../hooks/use-map';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../constants';
import 'leaflet/dist/leaflet.css';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT
});

type TMapProps = {
  targetOffer: TOffer | null;
  city: TCity;
  offers: TOffer[];
  pageType: string;
}

function Map({targetOffer, city, offers, pageType}: TMapProps): JSX.Element {
  const mapRef = useRef(null);
  const currentMarkers = useRef([]);
  const map = useMap(mapRef, city);

  const setMarkers = (offersData: TOffer[], layer: LayerGroup) => {
    offersData.forEach((offer) => {
      const markerIcon = new Marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude
      });

      currentMarkers.current.push(markerIcon);

      markerIcon.setIcon(
        (targetOffer?.location.latitude === offer?.location.latitude)
        && (targetOffer?.location.longitude === offer?.location.longitude)
          ? currentCustomIcon
          : defaultCustomIcon
      ).addTo(layer);
    });
  };

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      const currentMarker: Marker = currentMarkers.current.find((point: Marker) => {
        const {lat, lng} = point.getLatLng();
        return (targetOffer?.location.latitude === lat) && (targetOffer?.location.longitude === lng);
      });

      if (currentMarker) {
        currentMarker.setIcon(currentCustomIcon).addTo(markerLayer);
      }

      if (!currentMarker && currentMarkers.current.length === 0) {
        setMarkers(offers, markerLayer);
      }

      return () => {
        if (currentMarker) {
          currentMarker.setIcon(defaultCustomIcon).addTo(markerLayer);
        }
      };
    }
  },[map, targetOffer]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      setMarkers(offers, markerLayer);

      return () => {
        currentMarkers.current = [];
        map.removeLayer(markerLayer);
      };
    }
  }, [city]);

  return <section className={`${pageType}__map map`} ref={mapRef} />;
}

export default Map;
