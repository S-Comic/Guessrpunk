import Head from "next/head";
import { Teko } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
import Photosphere from "../components/photosphere";
import InfoOverlay from "@/components/infooverlay";
import { useState, useEffect, useCallback, useRef } from "react";
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

  const [roundSeed, setRoundSeed] = useState(() =>
    Math.random().toString(36).slice(2, 7).toUpperCase()
  );
  const [panoramaImageID, setPanoramaImageID] = useState(0);
  const [panoramaImage, setPanoramaImage] = useState(() => createImageArray());
  const [isInfoDisplay, setInfoDisplay] = useState(false);
  const [isCustomGamesDisplay, setCustomGamesDisplay] = useState(false);
  const [roundNum, setRoundNum] = useState(1);

  const [markers, setMarkers] = useState({
    guess: null,
    answer: null,
  });

  const [score, setScore] = useState({
    totalScore: 0,
    highScore: 0,
  });

  function handleContentChange(state) {
    if (state == "info") {
      setCustomGamesDisplay(false);
      setInfoDisplay((prev) => !prev);
    } else {
      setInfoDisplay(false);
      setCustomGamesDisplay((prev) => !prev);
    }
  }

  // Get highscore cookie on page load
  useEffect(
    () =>
      setScore((prev) => {
        return {
          ...prev,
          highScore: hasCookie("highscore") ? getCookie("highscore") : 0,
        };
      }),
    []
  );

  // The below runs whenever the panorama image is updated.
  const wrapperSetPanoramaImage = useCallback(() => {
    // Iterate on the round number unless it's 5, in which case reset round number
    setRoundNum((prevNum) => {
      if (prevNum == 5) {
        setScore((prev) => {
          return { ...prev, totalScore: 0 };
        });
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
    seedInput.current.value = roundSeed;
    setPanoramaImage(createImageArray());
  }, [roundSeed]);

  const wrapperSetRoundSeed = useCallback(() => {
    console.log("runs");
  }, [setRoundSeed]);

  function createImageArray() {
    var shuffled = shuffleseed.shuffle(imageArray, roundSeed);
    return shuffled.slice(0, 5);
  }
  function updateSeed() {
    if (seedInput.current.value == "") {
      seedInput.current.placeholder = "ENTER SEED";
    } else {
      setMarkers({ guessLocation: null, answerLocation: null });
      setRoundSeed(seedInput.current.value);
      setPanoramaImage(() => createImageArray());
      setScore((prev) => {
        return { ...prev, totalScore: 0 };
      });
      setInfoDisplay(false);
      setCustomGamesDisplay(false);
      setRoundNum(1);
      setPanoramaImageID(0);
    }
  }

  const wrapperSetMarkers = useCallback(
    (val) => {
      setMarkers((prev) => {
        return { ...prev, ...val };
      });
    },
    [setMarkers]
  );

  const wrapperSetScore = useCallback(
    (val) => {
      setScore((prev) => {
        return { ...prev, ...val };
      });
    },
    [setScore]
  );

  // Whenever score is updated, update highscore
  useEffect(() => {
    setScore((prev) => {
      if (score.totalScore > score.highScore) {
        setCookie("highscore", score.totalScore);
        return { ...prev, highScore: score.totalScore };
      } else {
        return { ...prev, highScore: score.highScore };
      }
    });
  }, [score.totalScore]);

  return (
    <>
      <Head>
        <title>GuessrPunk</title>
        <meta name="description" content="Where is V? 
        Test your knowledge of Night City in this GeoGuessr inspired game, 
        and try to find your location with knowledge alone! " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/markericon.webp" />
        <meta name="og:image" content="/panoramas/16.jpg"></meta>
      </Head>
      <main className={`${styles.main} ${teko.className}`}>
        <div className={styles.topBar}>
          <ul className={styles["topBar__text-left"]}>
            <div
              className={`${styles.asideBox} ${styles.infoToggle} ${
                isInfoDisplay ? styles.infoBoxMovement : ""
              }`}
              onClick={() => handleContentChange("info")}
            >
              <p>{isInfoDisplay ? "X" : "?"}</p>
            </div>

            <div
              className={`${styles.asideBox} ${styles.customGameToggle} ${
                isInfoDisplay ? styles.infoBoxMovement : ""
              }`}
              onClick={() => handleContentChange()}
            >
              <p>{isCustomGamesDisplay ? "CLOSE" : "CUSTOM GAMES"}</p>
            </div>
          </ul>
          <ul
            className={`${styles["topBar__text-right"]} ${
              isCustomGamesDisplay || isInfoDisplay ? "displayNone" : ""
            }`}
          >
            <li className={styles["topBar__item"]}>
              <p className={styles["topBar__item--small"]}>ROUND</p>
              <p className={styles["topBar__item--large"]}>{roundNum}/5</p>
            </li>
            <li className={styles["topBar__item"]}>
              <p className={styles["topBar__item--small"]}>SCORE</p>
              <p className={styles["topBar__item--large"]}>
                {score.totalScore}
              </p>
            </li>
            <li className={styles["topBar__item"]}>
              <p className={styles["topBar__item--small"]}>HIGH SCORE</p>
              <p className={styles["topBar__item--large"]}>{score.highScore}</p>
            </li>
          </ul>
        </div>

        {isInfoDisplay ? <InfoOverlay /> : ""}
        <div
          className={`${styles["info--container"]} ${
            isCustomGamesDisplay ? "" : "displayNone"
          }`}
        >
          {/* Usually this would go in it's own component, but it can't because of the ref on the input box/s */}
          <div className={styles["info--contentblock"]}>
            <h2>{`CREATE CUSTOM GAME`}</h2>
            <p>{`Create a game more suited to your tastes, or one to share with friends! This section is a work in progress with more to come.`}</p>

            <div className={styles.inputContainer}>
              <label htmlFor="seedInput">{`Round Seed`}</label>
              <input
                ref={seedInput}
                id="seedInput"
                type="text"
                className={teko.className}
              ></input>
            </div>
            <a href="#" onClick={() => updateSeed()} className={styles.button}>
              START GAME
            </a>
          </div>
        </div>

        {/* Needs cleaning. When I get time I'll merge similar states into one state object */}
        <MapWithNoSSR
          imageObject={imageArray}
          setPanoramaImage={wrapperSetPanoramaImage}
          panoramaImage={panoramaImage}
          setMarkers={wrapperSetMarkers}
          markers={markers}
          score={score}
          setScore={wrapperSetScore}
          panoramaImageID={panoramaImageID}
        />
        <Photosphere
          imageObject={imageArray}
          panoramaImage={panoramaImage}
          panoramaImageID={panoramaImageID}
          roundSeed={roundSeed}
        />
      </main>
    </>
  );
}
