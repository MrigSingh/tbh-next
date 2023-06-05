import styles from '@/styles/Tbh.module.css';
import card from '../../public/assets/card.png'
import cardTitle from '../../public/assets/card-title.png'
import Image from 'next/legacy/image';
import { VIDEO_FORMATS } from '@/utils/const';

function TBH() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.hero}>
        <div className={styles.hero__content}>
          <h1 className={styles.hero__title}>THE BIG MOUTH</h1>
        </div>
      </div>
      <section className={styles.mainContent}>
        <div className={styles.about}>
          <div className={styles.aboutBig}>
            <p>THE HOME<br />
              OF OUR<br />
              DIGITAL<br />
              CONTENT</p>
          </div>
          <div className={styles.aboutSmall}>
            <p>Welcome to The Big Mouth, the place where
              The Big House's digital content will live. It's
              early days and this is just the start of some
              big content to come. To read more about
              what we've got planned check out our article
              here, or take a look below at what we have
              for you right now.</p>
          </div>
        </div>
        <div className={styles.cardContainer}>
          <div><Image src={card} alt="card" /></div>
          <div><Image src={card} alt="card" /></div>
          <div><Image src={card} alt="card" /></div>
          <div><Image src={card} alt="card" /></div>
        </div>
      </section>
      <div className={styles.mediaContainer}>
        {/* {VIDEO_FORMATS.includes(data.media_2.split(".")[data.media_2.split(".").length - 1]) ?
            <video autoPlay muted loop id="myVideo" width="100%">
              <source src={data.media_2.replace("localhost", `http://${SERVER_IP}`)} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
            :
            <Image src={data.media_1.replace("localhost", `http://${SERVER_IP}`)} width={800} height={484} layout='responsive' alt="hero-image" priority />
          } */}
        <Image src={"https://picsum.photos/1000/660"} width={800} height={484} layout='responsive' alt="hero-image" priority />
      </div>
      <section className={styles.mainContent}>
        <div className={styles.navContainer}>
          <div>All</div>
          <div>Production</div>
          <div>Podcast</div>
          <div>Music</div>
          <div>Advice</div>
        </div>
        <div className={styles.gridContainer}>
          <div><Image src={cardTitle} alt="card" layout='responsive' /></div>
          <div><Image src={cardTitle} alt="card" layout='responsive' /></div>
          <div><Image src={cardTitle} alt="card" layout='responsive' /></div>
          <div><Image src={cardTitle} alt="card" layout='responsive' /></div>
          <div><Image src={cardTitle} alt="card" layout='responsive' /></div>
          <div><Image src={cardTitle} alt="card" layout='responsive' /></div>
          <div><Image src={cardTitle} alt="card" layout='responsive' /></div>
          <div><Image src={cardTitle} alt="card" layout='responsive' /></div>
        </div>
      </section>
    </div>
  )
}

export default TBH;