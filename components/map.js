import styles from "@/styles/Map.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback } from "react";
import {
  MapContainer,
  useMapEvents
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import MapContent from "./mapcontent";
import { Teko } from "@next/font/google";

const teko = Teko({ subsets: ["latin"], weight: ["400", "700"] });

export default function Map(props) {
  
  var score;
  const wrapperSetMarkers = useCallback(
    (val) => {
      props.setMarkers(val);
    },
    [props.setMarkers]
  );

  const bounds = [
    [-85, -180],
    [85, 180],
  ];

  const [mapState, setMapState] = useState(0);
  const [mapScore, setMapScore] = useState(0);

  function handleSizeChange() {
    setMapState((prevMapState) => {
      return !prevMapState;
    });
  }

  function handleClick() {
    if (props.markers.guess != null) {
      if (props.markers.answer != null) {
        props.setMarkers({guess: null, answer: null})
        props.setPanoramaImage();
      } else {
        props.setMarkers(
          {
            answer: props.panoramaImage[props.panoramaImageID].location
          }
        );
        const distanceLat = Math.abs(
          props.panoramaImage[props.panoramaImageID].location.y -
          props.markers.guess.y
        );
        const distanceLng = Math.abs(
          props.panoramaImage[props.panoramaImageID].location.x -
          props.markers.guess.x
        );
        let totalScoreTemp = Math.round(
          112 - (Math.pow((distanceLat + distanceLng), 1.0001) / 4),
          1
        );
        if (totalScoreTemp < 0) {
          totalScoreTemp = 0;
        }
        else if (totalScoreTemp > 100) {
          totalScoreTemp = 100
        }
        setMapScore(totalScoreTemp);
        props.setScore({totalScore: props.score.totalScore + totalScoreTemp});
      }
    }
  }

  return (
    <section
      className={`${styles.map} ${
        styles[mapState == 0 ? "map--small" : "map--large"]
      } ${styles.unselectable}`}
      onMouseEnter={() => setMapState(true)}
      onMouseLeave={() => setMapState(false)}
    >
      <div
        className={styles.map__toggleIcon}
        onClick={() => handleSizeChange()}
      >
        Expand
      </div>

      <MapContainer
        minZoom={1}
        zoomAnimation={true}
        zoomAnimationThreshold={20}
        maxZoom={7}
        center={[0, 0]}
        zoom={1}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >            
        <MapContent
          setMarkers={wrapperSetMarkers}
          markers={props.markers}
          bounds={bounds}
          mapState={mapState}
        />
      </MapContainer>

      <button
        className={`${styles["map__next-image-button"]} ${teko.className}`}
        onClick={() => handleClick()}
      >
        <p>
          {props.markers.answer == null
            ? props.markers.guess != null
              ? "CONFIRM GUESS"
              : "MAKE A GUESS"
            : `NEXT LOCATION${ mapState == 1 ? `- SCORE: ${mapScore}` : ""}`}
        </p>
      </button>
    </section>
  );
}
