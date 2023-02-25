import Head from 'next/head'
import Image from 'next/image'
import { Teko } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import dynamic from "next/dynamic";
import Photosphere from '../components/photosphere';
import InfoOverlay from '@/components/infooverlay';
import { useState, createRef, useEffect, useCallback } from 'react';
import imageArray from '../components/imageArray'
import { setCookie, hasCookie, getCookie } from 'cookies-next';


const MapWithNoSSR = dynamic(() => import("../components/map"), {
  ssr: false
});

const teko = Teko({ subsets: ['latin'], weight: ['400', '700'], })
function createImageArray(){
  var shuffled = imageArray.sort(function(){return .5 - Math.random()})
  return shuffled.slice(0,5);
}

export default function Home() {

  
  // Create image state and allow it to be used by children
  const [panoramaImageID, setPanoramaImageID] = useState(0)
  const [panoramaImage, setPanoramaImage] = useState(() => createImageArray())
  const [markerLocation, setMarkerLocation] = useState(null)
  const [answerLocation, setAnswerLocation] = useState(null)
  const [isInfoDisplay, setInfoDisplay] = useState(false)
  const [totalScore, setTotalScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  useEffect(() => setHighScore(hasCookie('highscore') ? getCookie('highscore') : 0), [])
  const [roundNum, setRoundNum] = useState(1)
  const wrapperSetPanoramaImage = useCallback(() => {

      setRoundNum((prevNum) => {
        if (prevNum == 5){

          setTotalScore(0)
          return 1
        } else{
          return prevNum + 1
        }
        
      })

      setPanoramaImageID((prevID) => {
        if (prevID == 4){
          setPanoramaImage(() => createImageArray())
          return 0
        } else{
          return prevID + 1
        }
        
      })
    
  }, [setPanoramaImage]);
  const wrapperSetMarkerLocation = useCallback(val => {
    setMarkerLocation(val);
  }, [setMarkerLocation]);
  const wrapperSetAnswerLocation = useCallback(val => {
    setAnswerLocation(val);
  }, [setAnswerLocation]);
  const wrapperSetTotalScore = useCallback(val => {
    setTotalScore(val);
  }, [setTotalScore]);

  useEffect(() => {
    setHighScore((prevHighScore) =>{
      if (totalScore > prevHighScore){
        setCookie("highscore", totalScore)
        return totalScore
      } else{
        return prevHighScore
      }
      
    })

  }, [totalScore])


  return (
    <>
      <Head>
        <title>GuessrPunk</title>
        <meta name="description" content="Where in the world is V?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/markericon.webp" />
        <meta name='og:image' content='/16.jpg'></meta>
      </Head>
      <main className={`${styles.main} ${teko.className}`}>

        {isInfoDisplay ? <InfoOverlay /> : ""}

        <div className={styles.scoreBox}>
          <p>ROUND: {roundNum}/5</p>
          <p>ROUND SCORE: {totalScore}</p>
          <p>HIGH SCORE: {highScore}</p>
        </div>
        
        <div className={styles.infoToggle} onClick={() => setInfoDisplay(prev => !prev)}>
          <p>{isInfoDisplay ? "X" : "?"}</p>
        </div>
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
          panoramaImageID={panoramaImageID}  />
        <Photosphere 
          imageObject={imageArray} 
          panoramaImage={panoramaImage}
          answerLocation={answerLocation}
          panoramaImageID={panoramaImageID}/>
      </main>

    </>
  )
}
