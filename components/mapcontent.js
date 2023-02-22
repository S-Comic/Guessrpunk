import { Fragment, useEffect } from "react";
import { MapContainer, TileLayer,Marker,Popup, ImageOverlay, LatLngBounds, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";





export default function MapContent(props){



    var marker = [];
    const map = useMapEvents({
        click: (e) => {
            props.setMarkerLocation(e.latlng)
 
        },

      })
      useEffect(() => {
        map.eachLayer((layer) => {
            if (layer._url != '/satellite.webp'){
                layer.remove();
            }
            
          });
        if (props.markerLocation != null){
            marker = new L.Marker(props.markerLocation, {draggable:true});
            map.addLayer(marker);
        }
        
    }, [props.markerLocation])

    return(
        <Fragment>
        <ImageOverlay bounds={props.bounds} url="/satellite.webp"></ImageOverlay>
        </Fragment>
    )
}