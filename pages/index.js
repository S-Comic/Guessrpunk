import Head from "next/head";
import Image from "next/image";
import { Teko } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
import Photosphere from "../components/photosphere";
import InfoOverlay from "@/components/infooverlay";
import { useState, createRef, useEffect, useCallback, useRef } from "react";
import imageArray from "../components/imageArray";
import { setCookie, hasCookie, getCookie } from "cookies-next";
import shuffleseed from "shuffle-seed";

const MapWithNoSSR = dynamic(() => import("../components/map"), {
  ssr: false,
});

const teko = Teko({ subsets: ["latin"], weight: ["400", "700"] });

// Grab a new set of 5 images and add them to 'panoramaImage' state

export default function Home() {
  const seedInput = useRef();
  // Apologies for the 'state hell' here. This was put together pretty quick
  const [panoramaImageID, setPanoramaImageID] = useState(0);
  // *Another* state? You bet
  const [roundSeed, setRoundSeed] = useState(() =>
    Math.random().toString(36).slice(2, 7).toUpperCase()
  );
  const [panoramaImage, setPanoramaImage] = useState(() => createImageArray());
  const [markerLocation, setMarkerLocation] = useState(null);
  const [answerLocation, setAnswerLocation] = useState(null);
  const [isInfoDisplay, setInfoDisplay] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [highScore, setHighScore] = useState(0);



  // Get highscore cookie on page load
  useEffect(
    () => setHighScore(hasCookie("highscore") ? getCookie("highscore") : 0),
    []
  );
  const [roundNum, setRoundNum] = useState(1);

  // The below runs whenever the panorama image is updated.
  const wrapperSetPanoramaImage = useCallback(() => {
    // Iterate on the round number unless it's 5, in which case reset round number
    setRoundNum((prevNum) => {
      if (prevNum == 5) {
        setTotalScore(0);
        return 1;
      } else {
        return prevNum + 1;
      }
    });

    // Iterate panorama image, or make new seed if round is over
    setPanoramaImageID((prevID) => {
      if (prevID == 4) {
        var seed = Math.random().toString(36).slice(2, 7).toUpperCase();
        seedInput.current.value = seed;
        setRoundSeed(seed);

        return 0;
      } else {
        return prevID + 1;
      }
    });
  }, [setPanoramaImage]);

  // When seed is changed, get new image array
  useEffect(() => {
    seedInput.current.value = roundSeed
    setPanoramaImage(createImageArray());
  }, [roundSeed]);

  function createImageArray() {
    var shuffled = shuffleseed.shuffle(imageArray, roundSeed);
    return shuffled.slice(0, 5);
  }
  function updateSeed() {
    if (seedInput.current.value == "") {
      seedInput.current.placeholder = "ENTER SEED";
    } else {
      setAnswerLocation(null);
      setMarkerLocation(null);
      setRoundSeed(seedInput.current.value);
      setPanoramaImage(() => createImageArray());
      setTotalScore(0);
      setRoundNum(1);
      setPanoramaImageID(0);
    }
  }

  const wrapperSetMarkerLocation = useCallback(
    (val) => {
      setMarkerLocation(val);
    },
    [setMarkerLocation]
  );
  const wrapperSetAnswerLocation = useCallback(
    (val) => {
      setAnswerLocation(val);
    },
    [setAnswerLocation]
  );
  const wrapperSetTotalScore = useCallback(
    (val) => {
      setTotalScore(val);
    },
    [setTotalScore]
  );

  // Whenever score is updated, update highscore
  useEffect(() => {
    setHighScore((prevHighScore) => {
      if (totalScore > prevHighScore) {
        setCookie("highscore", totalScore);
        return totalScore;
      } else {
        return prevHighScore;
      }
    });
  }, [totalScore]);

  return (
    <>
      <Head>
        <title>GuessrPunk</title>
        <meta name="description" content="Where in the world is V?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/markericon.webp" />
        <meta name="og:image" content="/panoramas/16.jpg"></meta>
      </Head>
      <main className={`${styles.main} ${teko.className}`}>
        {isInfoDisplay ? <InfoOverlay /> : ""}

        <div className={styles.scoreBox}>
          <p>ROUND: {roundNum}/5</p>
          <p>ROUND SCORE: {totalScore}</p>
          <p>HIGH SCORE: {highScore}</p>
        </div>

        <div
          className={`${styles.asideBox} ${styles.infoToggle} ${
            isInfoDisplay ? styles.infoBoxMovement : ""
          }`}
          onClick={() => setInfoDisplay((prev) => !prev)}
        >
          <p>{isInfoDisplay ? "X" : "?"}</p>
        </div>

        <div
          className={`${styles.asideBox} ${styles.seedBox} ${
            isInfoDisplay ? styles.infoBoxMovement : ""
          }`}
        >
          <input
            ref={seedInput}
            type="text"
            className={teko.className}
          ></input>
          <a onClick={() => updateSeed()}>{"	➤ "}</a>
        </div>

        {/* Needs cleaning. When I get time I'll merge similar states into one state object */}
        <MapWithNoSSR
          imageObject={imageArray}
          setPanoramaImage={wrapperSetPanoramaImage}
          panoramaImage={panoramaImage}
          setMarkerLocation={wrapperSetMarkerLocation}
          markerLocation={markerLocation}
          answerLocation={answerLocation}
          setAnswerLocation={wrapperSetAnswerLocation}
          totalScore={totalScore}
          setTotalScore={wrapperSetTotalScore}
          panoramaImageID={panoramaImageID}
        />
        <Photosphere
          imageObject={imageArray}
          panoramaImage={panoramaImage}
          answerLocation={answerLocation}
          panoramaImageID={panoramaImageID}
          roundSeed={roundSeed}
        />
      </main>
    </>
  );
}
