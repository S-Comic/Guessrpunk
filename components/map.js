import styles from '@/styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { MapContainer, TileLayer,Marker,Popup, ImageOverlay, LatLngBounds } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";


export default function Map(){
    // 0 == Small, 1 == Big
    const bounds = [
        [40.712, -74.227],
        [40.774, -74.125]
    ];


    const [mapState, setMapState] = useState(0)
    const [markerLocation, setMarkerLocation] = useState({"x" : 0, "y" : 0})
    

    function handleSizeChange(){
        setMapState((prevMapState) =>{
            return !prevMapState
        } )
    }


    return (
    <section className={`${styles.map} ${styles[
            mapState==0 
            ? "map--small" 
            : "map--large"
            ]}`}>
                
            <div className={styles.map__toggleIcon}
                onClick={() => handleSizeChange()}>

            <FontAwesomeIcon  
                icon={faUpRightAndDownLeftFromCenter}
            />
                
                
            </div>

            <MapContainer minZoom={11}
                        maxZoom={17}
                        center={[40.712, -74.227]} zoom={14} 
                        scrollWheelZoom={true} 
                        style={{height: "100%", width: "100%"}}
                        maxBounds={bounds}
                        maxBoundsViscosity={0}
            >
                <ImageOverlay bounds={bounds} url="/mapimage.jpg"></ImageOverlay>
                    <Marker 
                    position={[40.774, -74.125]}
                    draggable={true}
                    animate={true}
                >
                    <Popup>Hey ! you found me</Popup>
                
                </Marker>
            </MapContainer>
            
            <button onClick={() => setBackground("/stairs.jpg")}>CLICK</button>
 
    </section>
    
    )
}