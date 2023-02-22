import { Fragment, useEffect } from "react";
import { MapContainer, TileLayer,Marker,Popup, ImageOverlay, LatLngBounds, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";



import styles from '@/styles/Home.module.css'

export default function MapContent(props){



    var marker = [];
    var answer = [];
    var answerIcon = L.icon({
        iconUrl: '/answermarker.webp',
        iconAnchor: [10, 28]
    });
    var guessIcon = L.icon({
        iconUrl: '/marker.webp',
        iconAnchor: [10, 28]
    });
    const map = useMapEvents({
        click: (e) => {
            if (props.answerLocation == null){
                props.setMarkerLocation(e.latlng)
            }
            
 
        },

      })
      useEffect(() => {
        map.eachLayer((layer) => {
            if (layer._url != '/satellite.webp'){
                layer.remove();
            }
            
          });
        if (props.markerLocation != null){
            marker = new L.Marker(props.markerLocation, {icon: guessIcon});
            map.addLayer(marker);
        }
        
    }, [props.markerLocation])

    useEffect(() => {
        if (props.answerLocation != null){

            answer = new L.Marker(props.answerLocation, {icon: answerIcon});
            map.addLayer(answer);
            map.setView(props.answerLocation, map.getZoom(), {animate: true});
        }
    }, [props.answerLocation])

    return(
        <Fragment>
        <ImageOverlay bounds={props.bounds} url="/satellite.webp"></ImageOverlay>
        </Fragment>
    )
}