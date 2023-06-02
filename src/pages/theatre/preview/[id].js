import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Markup } from 'interweave';
import styles from '@/styles/Theatre.module.css'
import { SERVER_IP, SERVER_PORT, VIDEO_FORMATS } from '@/utils/const';
import Image from 'next/legacy/image';
import Slider from "react-slick";
import slide from "../../../../public/assets/slides.png"

export default function Article() {
  const [data, setData] = useState(null);
  const router = useRouter();

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styles.arrow}`}
        style={{ ...style, display: "block", background: "#000", width: "80px", height: "80px", right: 0, zIndex: 5 }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styles.arrow}`}
        style={{ ...style, display: "block", background: "#000", width: "80px", height: "80px", left: 0, zIndex: 5 }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await axios.get(`http://${SERVER_IP}:${SERVER_PORT}/theatre/${router.query.id}`)
        setData(articles.data.find(item => item.id == router.query.id))
      }
      catch (err) {
        console.log(err)
      }
    }
    if (router.query.id) {
      fetchArticles()
    }
  }, [router])
  console.log(data)
  if (data) {
    return (
      <>
        <section className={styles.hero}>
          <Image src={data.media_1.replace("localhost", `http://${SERVER_IP}`)} width={800} height={484} layout='responsive' alt="hero-image" priority />
          <div className={styles.heroContent}>
            <p>{data.head_date.split("|")[0]} | <span>{data.head_date.split("|")[1]}</span></p>
            <h1>{data.head_title}</h1>
          </div>
        </section>
        <div className={styles.postDetails}>
          <h1 className={styles.postTitle}>{data.title}</h1>
          <div className={styles.postDesc}>
            <Markup content={data.description} />
          </div>
        </div>
        <section className={styles.leftRightContainer}>
          <div className={styles.quote}>
            <Markup content={data.quote} />
          </div>
        </section>
        <div className={styles.mediaContainer}>
          {VIDEO_FORMATS.includes(data.media_2.split(".")[data.media_2.split(".").length - 1]) ?
            <video autoPlay muted loop id="myVideo" width="100%">
              <source src={data.media_2.replace("localhost", `http://${SERVER_IP}`)} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
            :
            <Image src={data.media_1.replace("localhost", `http://${SERVER_IP}`)} width={800} height={484} layout='responsive' alt="hero-image" priority />
          }
        </div>
        <div className={styles.slideContainer}>
          <Slider {...settings}>
            <div className={styles.slide}>
              <Image src={slide} layout='responsive' alt="slide" />
            </div>
            <div className={styles.slide}>
              <Image src={slide} layout='responsive' alt="slide" />
            </div>
            <div className={styles.slide}>
              <Image src={slide} layout='responsive' alt="slide" />
            </div>
            <div className={styles.slide}>
              <Image src={slide} layout='responsive' alt="slide" />
            </div>
            <div className={styles.slide}>
              <Image src={slide} layout='responsive' alt="slide" />
            </div>
            <div className={styles.slide}>
              <Image src={slide} layout='responsive' alt="slide" />
            </div>
          </Slider>
        </div>
        <div className={styles.navs}>
          <div>Previous</div>
          <div>All Production</div>
          <div>Next</div>
        </div>
      </>
    )
  }
}