import styles from '@/styles/Home.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightAndDownLeftFromCenter } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function Map(){
    // 0 == Small, 1 == Big
    const [mapState, setMapState] = useState(0)

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

        <div className={styles.map__wrapper}>
            <div className={styles.map__toggleIcon}
                 onClick={() => handleSizeChange()}>

            <FontAwesomeIcon  
                icon={faUpRightAndDownLeftFromCenter}
            />
                
                
            </div>
            <img
                    className={styles["map__image"]} 
                    src="/mapimage.jpg"
            />
        </div>
    </section>
    )
}