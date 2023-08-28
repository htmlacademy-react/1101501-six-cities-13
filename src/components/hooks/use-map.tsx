import {MutableRefObject, useEffect, useRef, useState} from 'react';
import {Map, TileLayer} from 'leaflet';
import {TCity} from '../../types/offer';


function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: TCity,
):Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);
  const instanceLeafletRef = useRef<Map | null>(null);
  const {location: {latitude: lat, longitude: lng, zoom}, name: cityName} = city;

  useEffect(() => {
    if (mapRef?.current && !isRenderedRef.current) {
      const instanceLeaflet = new Map(mapRef.current, {
        center: {lat, lng}, zoom
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
      instanceLeafletRef.current = instanceLeaflet;
    }

    instanceLeafletRef.current?.flyTo({
      lat,
      lng,
    }, zoom);

  }, [mapRef, cityName, lat, lng, zoom]);

  return map;
}

export default useMap;
