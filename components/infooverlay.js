import styles from "@/styles/Home.module.css";
export default function InfoOverlay() {
  return (
    <div className={styles["info--container"]}>
      <div className={styles["info--contentblock"]}>
        <h2>{`WHERE'S V?`}</h2>
        <p>
          <a
            className={styles["info--link"]}
            href="https://github.com/S-Comic/Guessrpunk"
          >
            Guessrpunk
          </a>{" "}
          {`is a 'Guessr' style game within the world of Cyberpunk 2077. Try to achieve the highest 
                score possible over the course of 5 rounds!`}
        </p>
        <p>{`Images are stitched together from screenshots taken in-game using Microsoft ICE and 
                    may have artifacts or distortion in some places depending on the quality of the stitch. 
                    Written in React / NextJS.`}</p>
        <p>{`There's currently 50 different locations to find with more (probably) being added. Sometimes locations will repeat 
                because the location selection is random. A seed can be manually entered for each round in the 'Custom Games' page 
                to share the same locations with other people.`}</p>
        <p>{`Have fun!`}</p>
        <p>{`- COMIC`}</p>
      </div>
    </div>
  );
}
