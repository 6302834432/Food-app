import React, { useState,useEffect } from 'react'
import '../Map/Map.css'
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { toast } from 'react-toastify'
import { set } from 'react-hook-form'
export const Map = ({ readonly, location, onChange }) => {
    return (
        <div className='map-container'>
          <MapContainer
            className='map-map'
            center={[0, 0]}
            zoom={1}
            dragging={!readonly}
            touchZoom={!readonly}
            doubleClickZoom={!readonly}
            scrollWheelZoom={!readonly}
            boxZoom={!readonly}
            keyboard={!readonly}
            attributionControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <FindButtonAndMarker
              readonly={readonly}
              location={location}
              onChange={onChange}
            />
          </MapContainer>
        </div>
      );
    }
    
    function FindButtonAndMarker({ readonly, location, onChange }) {
      const [position, setPosition] = useState(location);
    
      useEffect(() => {
        if (readonly) {
          map.setView(position, 10);
          return;
        }
        if (position) onChange(position);
      }, [position]);
    
      const map = useMapEvents({
        click(e) {
          !readonly && setPosition(e.latlng);
        },
        locationfound(e) {
          setPosition(e.latlng);
          map.flyTo(e.latlng, 10);
        },
        locationerror(e) {
          toast.error(e.message);
        },
      });
    
      return (
        <>
          {!readonly && (
            <button
              type="button"
              className='map-find_location'
              onClick={() => map.locate()}
            >
              Find My Location
            </button>
          )}
    
          {position && (
            <Marker
              eventHandlers={{
                dragend: e => {
                  setPosition(e.target.getLatLng());
                },
              }}
              position={position}
              draggable={!readonly}
            >
              <Popup>Shipping Location</Popup>
            </Marker>
          )}
        </>
      );
    }