import styles from "@/styles/Map.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import { useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ImageOverlay,
  LatLngBounds,
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
    [0, 0],
    [0.2891, 0.2232],
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
        const squareLat = Math.pow(
          props.panoramaImage[props.panoramaImageID].location[0] -
          props.markers.guess.lat,
          2
        );
        const squareLng = Math.pow(
          props.panoramaImage[props.panoramaImageID].location[1] -
          props.markers.guess.lng,
          2
        );
        let totalScoreTemp = Math.round(
          (10 - Math.pow((squareLat + squareLng) * 9000, 1.0001)) * 10,
          1
        );
        if (totalScoreTemp < 0) {
          totalScoreTemp = 0;
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
    >
      <div
        className={styles.map__toggleIcon}
        onClick={() => handleSizeChange()}
      >
        Expand
      </div>

      <MapContainer
        minZoom={11}
        zoomAnimation={true}
        zoomAnimationThreshold={20}
        maxZoom={17}
        center={[0.12, 0.1]}
        zoom={11}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <MapContent
          setMarkers={wrapperSetMarkers}
          markers={props.markers}
          bounds={bounds}
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
