import styles from '@/styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons'
import { useState, useCallback } from 'react'
import { MapContainer, TileLayer,Marker,Popup, ImageOverlay, LatLngBounds } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import MapContent from './mapcontent'


export default function Map(props){
    const wrapperSetMarkerLocation = useCallback(val => {
        props.setMarkerLocation(val);
      }, [props.setMarkerLocation]);

      
    // 0 == Small, 1 == Big
    const bounds = [
        [0, 0],
        [0.2891, 0.2232]
    ];

    const [mapState, setMapState] = useState(0)
    const [markerLocation, setMarkerLocation] = useState({"x" : 0, "y" : 0})
    

    function handleSizeChange(){
        setMapState((prevMapState) =>{
            return !prevMapState
        } )
    }

    function handleClick(){
        props.setPanoramaImage(props.imageObject[Math.floor(Math.random() * props.imageObject.length)])
        
    }


    return (
    <section className={`${styles.map} ${styles[
            mapState==0 
            ? "map--small" 
            : "map--large"
            ]} ${styles.unselectable}`}>
                
            <div className={styles.map__toggleIcon}
                onClick={() => handleSizeChange()}>

            <FontAwesomeIcon  
                icon={faUpRightAndDownLeftFromCenter}
            />
                
                
            </div>

            <MapContainer minZoom={11}
                        
                        maxZoom={17}
                        center={[0.12, 0.1]} zoom={11} 
                        scrollWheelZoom={true} 
                        style={{height: "100%", width: "100%"}}

            >
                <MapContent 
                    setMarkerLocation={wrapperSetMarkerLocation}
                    markerLocation={props.markerLocation} 
                    bounds={bounds}/>
            </MapContainer>
            
            <button className={styles["map__next-image-button"]} onClick={() => handleClick()}>CLICK</button>
 
    </section>
    
    )
}