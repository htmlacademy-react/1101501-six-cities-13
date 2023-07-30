import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Map, TileLayer} from 'leaflet';
import {TOffer} from '../../types/offer';


function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  offer: TOffer
):Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef?.current && !isRenderedRef.current) {
      const instanceLeaflet = new Map(mapRef.current, {
        center: {
          lat: offer.location.latitude,
          lng: offer.location.longitude
        },
        zoom: 10
      });

      const layerLeaflet = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instanceLeaflet.addLayer(layerLeaflet);
      setMap(instanceLeaflet);
      isRenderedRef.current = true;

    }
  }, [mapRef, offer]);

  return map;
}

export default useMap;
