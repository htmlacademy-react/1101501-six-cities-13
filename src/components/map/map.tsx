import {useEffect, useRef} from 'react';
import {Icon, Marker, layerGroup, LayerGroup} from 'leaflet';
import {TCity, TOffer} from '../../types/offer';
import useMap from '../hooks/use-map';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../constants';
import 'leaflet/dist/leaflet.css';
import { TOfferFull } from '../../types/offerFull';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT
});

type TMapProps = {
  targetOffer: TOfferFull | TOffer | null ;
  city: TCity;
  offers: TOffer[];
  pageType: string;
}

function Map({targetOffer, city, offers, pageType}: TMapProps): JSX.Element {
  const instanceMarkerLayer = useRef<null | LayerGroup>(null);
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const setMarkers = (offersData: TOffer[], layer: LayerGroup | null) => {
    if (!layer) {
      return;
    }

    offersData.forEach((offer) => {
      const markerIcon = new Marker({
        lat: offer.location.latitude,
        lng: offer.location.longitude
      });
      markerIcon.setIcon(defaultCustomIcon).addTo(layer);
    });
  };

  const setTargetMarkerIcon = (currentLayer: LayerGroup | null, icon: typeof defaultCustomIcon) => {
    currentLayer?.eachLayer((layer: Marker) => {
      const {lat, lng} = layer.getLatLng();
      if ((targetOffer?.location.latitude === lat) && (targetOffer?.location.longitude === lng)) {
        layer.setIcon(icon);
      }
    });
  };

  useEffect(() => {
    if (map) {
      instanceMarkerLayer.current = layerGroup().addTo(map);
      const markerLayer = instanceMarkerLayer.current;

      setMarkers(offers, markerLayer);

      return () => {
        if (markerLayer) {
          instanceMarkerLayer.current = null;
          map.removeLayer(markerLayer);
        }
      };
    }
  },[map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = instanceMarkerLayer.current;
      setTargetMarkerIcon(markerLayer, currentCustomIcon);

      return () => {
        setTargetMarkerIcon(markerLayer, defaultCustomIcon);
      };
    }
  }, [map, targetOffer]);

  return <section className={`${pageType}__map map`} ref={mapRef} />;
}

export default Map;
