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
    var score
    const wrapperSetMarkerLocation = useCallback(val => {
        props.setMarkerLocation(val);
      }, [props.setMarkerLocation]);

      
    // 0 == Small, 1 == Big
    const bounds = [
        [0, 0],
        [0.2891, 0.2232]
    ];

    const [mapState, setMapState] = useState(0)
    const [mapScore, setMapScore] = useState(0)

    function handleSizeChange(){
        setMapState((prevMapState) =>{
            return !prevMapState
        } )
    }

    function handleClick(){
        if (props.markerLocation != null){
            if (props.answerLocation != null){

                props.setAnswerLocation(null)
                props.setMarkerLocation(null)
                props.setPanoramaImage(props.imageObject[Math.floor(Math.random() * props.imageObject.length)])
            } else {
                props.setAnswerLocation(props.panoramaImage.location)
                const squareLat = Math.pow((props.panoramaImage.location[0] - props.markerLocation.lat), 2)
                const squareLng = Math.pow((props.panoramaImage.location[1] - props.markerLocation.lng), 2)
                let totalScoreTemp = Math.round((10 - Math.pow(((squareLat + squareLng)*800), 1.5)) * 10, 1)
                if (totalScoreTemp < 0){
                    totalScoreTemp = 0
                }
                setMapScore(totalScoreTemp)
                props.setTotalScore((prevScore) =>{
                    return prevScore + totalScoreTemp
                })
            }
        }

        
        
    }


    return (
    <section className={`${styles.map} ${styles[
            mapState==0 
            ? "map--small" 
            : "map--large"
            ]} ${styles.unselectable}`}>
                


            <MapContainer minZoom={11}
                        zoomAnimation={true}
                        zoomAnimationThreshold={20}
                        maxZoom={17}
                        center={[0.12, 0.1]} zoom={11} 
                        scrollWheelZoom={true} 
                        style={{height: "100%", width: "100%"}}

            >
                <MapContent 
                    setMarkerLocation={wrapperSetMarkerLocation}
                    markerLocation={props.markerLocation} 
                    answerLocation={props.answerLocation}
                    bounds={bounds}/>
            </MapContainer>
            
            <button className={styles["map__next-image-button"]} onClick={() => handleClick()}>
                {
                props.answerLocation == null 
                ? props.markerLocation != null ? "CONFIRM GUESS" : "MAKE A GUESS"
                : `NEXT LOCATION - SCORE: ${mapScore}`
                }

                </button>
 
    </section>
    
    )
}