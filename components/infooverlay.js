import styles from "@/styles/Home.module.css";
export default function InfoOverlay() {
  return (
    <div className={styles["info--container"]}>
      <div className={styles["info--contentblock"]}>
        <h2>{`Where in the world is V?`}</h2>
        <p>{`Guessrpunk is an attempt to emulate 'Guessr' style gameplay within the world of 
                    Cyberpunk 2077. Try to achieve the highest score possible over the course of 5 rounds!`}</p>
        <p>{`This is a quick project I've slapped together over a few days. 
                    Images are stitched together from screenshots taken in-game using Microsoft ICE and 
                    may have artifacts or distortion in some places depending on the quality of the stitch. 
                    Written in React / NextJS.`}</p>
        <p>{`There's currently 36 different locations to find with more being added. Sometimes locations will repeat 
                because the location selection is random. A seed can be manually entered for each round using the box above 
                to share the same locations with other people.`}</p>
        <p>{`Have fun!`}</p>
        <p>{`- COMIC`}</p>
      </div>
    </div>
  );
}
