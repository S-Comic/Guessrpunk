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
            if (props.markers.answer == null){
                props.setMarkers({guess:  map.project(e.latlng, 6)})
            }
        },
      })
      useEffect(() => {
        map.eachLayer((layer) => {
            if (!(layer instanceof L.TileLayer)){
                layer.remove();
            }
          });
        if (props.markers.guess != null){
            marker = new L.Marker(map.unproject(props.markers.guess, 6), {icon: guessIcon});
            map.addLayer(marker);
        }
        
    }, [props.markers.guess])

    useEffect(() => {
        if (props.markers.answer != null){
            const answerLocation = {
                x: props.markers.answer.x, 
                y: props.markers.answer.y
            }
            answer = new L.Marker(map.unproject(answerLocation, 6), {icon: answerIcon});
            map.addLayer(answer);
            map.setView(map.unproject(answerLocation, 6), map.getZoom(), {animate: true});
        }
    }, [props.markers.answer])

      useEffect(() => {
        setTimeout(() => { 
            map.invalidateSize({pan: false}); 
          }, 1000); 
    }, [props.mapState])

    return(
        <Fragment>
            <TileLayer
            url="satellite-tiles/{z}/{x}/{y}.png"
            noWrap
            maxNativeZoom={6}
            bounds={props.bounds}
            />
        </Fragment>
    )
}