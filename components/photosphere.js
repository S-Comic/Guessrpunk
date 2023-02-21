import styles from '@/styles/Home.module.css'
import { useEffect, useState, createRef, useRef, Fragment, useCallback } from 'react';
import dynamic from 'next/dynamic';
// import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';


const ReactPhotoSphereViewer = dynamic(
    () =>
      import('react-photo-sphere-viewer').then(
        (mod) => mod.ReactPhotoSphereViewer
      ),
    {
      ssr: false,
    }
  );

export default function Photosphere(props){
    const photoSphereRef = useRef(null)
    
    
    
    function handleReady(e){
        if (photoSphereRef.current){

        }
        photoSphereRef.current=e
        console.log(photoSphereRef)
    }
    useEffect(() => {
        if (photoSphereRef.current){
            console.log(photoSphereRef.current)
            photoSphereRef.current.setPanorama(props.panoramaImage)
        }
    })

    
    return(
        <Fragment>
            <button onClick={() => props.setPanoramaImage("/stairs.jpg")}>CLICK</button>
      <ReactPhotoSphereViewer ref={photoSphereRef} onReady={(e) => handleReady(e)} id="fuck"  navbar={false} src={props.panoramaImage} height={'100vh'} width={"100%"}>
        
      </ReactPhotoSphereViewer>
  
      </Fragment>
      )
}