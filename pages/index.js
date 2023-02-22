import Head from 'next/head'
import Image from 'next/image'
import { Teko } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import dynamic from "next/dynamic";
import Photosphere from '../components/photosphere';
import { useState, createRef, useEffect, useCallback } from 'react';
import imageArray from '../components/imageArray'


const MapWithNoSSR = dynamic(() => import("../components/map"), {
  ssr: false
});

const teko = Teko({ subsets: ['latin'], weight: ['400', '700'], })

export default function Home() {
  
  // Create image state and allow it to be used by children
  const [panoramaImage, setPanoramaImage] = useState(imageArray[Math.floor(Math.random() * imageArray.length)])
  const [markerLocation, setMarkerLocation] = useState(null)
  const [answerLocation, setAnswerLocation] = useState(null)
  const [totalScore, setTotalScore] = useState(0)
  const [roundNum, setRoundNum] = useState(1)
  const wrapperSetPanoramaImage = useCallback(val => {
    setPanoramaImage(val);
    

      setRoundNum((prevNum) => {
        if (prevNum == 5){
          setTotalScore(0)
          return 1
        }
        return prevNum + 1
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


  }, [panoramaImage])


  return (
    <>
      <Head>
        <title>GuessrPunk</title>
        <meta name="description" content="Where in the world is V?" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/markericon.webp" />
      </Head>
      <main className={`${styles.main} ${teko.className}`}>

        <div className={styles.scoreBox}>
          <p>ROUND: {roundNum}/5</p>
          <p>TOTAL SCORE: {totalScore}</p>
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
          setTotalScore={wrapperSetTotalScore}  />
        <Photosphere 
          imageObject={imageArray} 
          panoramaImage={panoramaImage}
          answerLocation={answerLocation}/>
      </main>

    </>
  )
}
