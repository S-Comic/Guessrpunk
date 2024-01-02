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
                console.debug(map.project(e.latlng, 6))
                props.setMarkers({guess: e.latlng})
            }
            
 
        },

      })
      useEffect(() => {
        map.eachLayer((layer) => {
            // Uncomment when finished
            // if (!(layer instanceof L.TileLayer)){
            //     layer.remove();
            // }
          });
        if (props.markers.guess != null){
            marker = new L.Marker(props.markers.guess, {icon: guessIcon});
            map.addLayer(marker);
        }
        
    }, [props.markers.guess])

    useEffect(() => {
        if (props.markers.answer != null){
            // This maths is a rough method of converting old coordinates (using the previous map) into ones that can be used on the new map
            // -- '*10000' increases the decimal pixel count to an integer (0.0623 to 623)
            // -- '* 3.81182795699' is to then increase the size of the map so that it matches the scale of the new one (the old map would now overlay perfectly ontop of the new)
            // -- '+ 3583' and '+ 4702' are pixel offsets from the left and the bottom of the map respectively, since the new map covers more area.
            answerLocation = {
                x: ((props.markers.answer[1]*10000) * 3.81182795699 ) + 3583, 
                y: 16384 - (((props.markers.answer[0]*10000) * 3.81182795699 ) + 4702)
            }
            answer = new L.Marker(map.unproject(answerLocation, 6), {icon: answerIcon});
            map.addLayer(answer);
            map.setView(map.unproject(answerLocation, 6), map.getZoom(), {animate: true});
        }
    }, [props.markers.answer])

      useEffect(() => {
        console.debug(props.mapState)
        setTimeout(() => { 
            map.invalidateSize({pan: false}); 
          }, 1000); 
    }, [props.mapState])

    return(
        <Fragment>
            <TileLayer
            url="tilespy/{z}/{x}/{y}.png"
            noWrap
            bounds={props.bounds}
            />
        </Fragment>
    )
}