import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Markup } from 'interweave';
import styles from '@/styles/Articles.module.css'
import { SERVER_IP, SERVER_PORT, VIDEO_FORMATS } from '@/utils/const';
import Image from 'next/legacy/image';
// import articleImg from "../../../public/assets/article-img.png";

export default function Article() {
  const [article, setArticle] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await axios.get(`http://${SERVER_IP}:${SERVER_PORT}/preview/article/${router.query.id}`)
        setArticle(articles.data)
      }
      catch (err) {
        console.log(err)
      }
    }
    if (router.query.id) {
      fetchArticles()
    }
  }, [router])

  const returnArticleDetails = () => <p className={styles.postInfo}>By <span>The Big House</span> | Posted in: NEWSLETTER | 1st June 2023</p>
  if (article) {
    return (
      <>
        <section className={styles.hero}>
          {VIDEO_FORMATS.includes(article.image.split(".")[article.image.split(".").length - 1]) ?
            <video autoPlay muted loop id="myVideo" width="100%">
              <source src={article.image.replace("localhost", `http://${SERVER_IP}`)} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
            :
            <Image src={article.image.replace("localhost", `http://${SERVER_IP}`)} width={800} height={484} layout='responsive' alt="hero-image" priority />
          }
          <div className={styles.heroContent}>
            <p className={styles.category}>News</p>
            <h1>{article.head_title}</h1>
            {returnArticleDetails()}
          </div>
        </section>
        <div className={styles.postDetails}>
          <h1 className={styles.postTitle}>{article.title}</h1>
          {/* {returnArticleDetails()} */}
          <div className={styles.postDesc}>
            <Markup content={article.description} />
            {/* <p>Ullamco proident occaecat nulla officia nostrud fugiat magna. Do ea fugiat cillum sit voluptate eiusmod laborum proident labore. Est magna officia pariatur in incididunt do.Id mollit adipisicing ea est in Lorem officia esse incididunt tempor incididunt duis. Consectetur Lorem pariatur ullamco aliqua culpa laborum fugiat id. Labore quis sint incididunt nostrud laborum incididunt ut aute occaecat. Fugiat labore ex sunt consequat anim Lorem sint laboris pariatur elit ullamco nisi. Ipsum cupidatat reprehenderit ullamco culpa quis Lorem. Magna magna id veniam laboris velit irure veniam. Enim aliqua aliqua veniam velit commodo ex nulla laborum est eiusmod in anim.</p> */}
          </div>
        </div>
        <section className={styles.leftRightContainer}>
          {article.subheadings.map((item, index) => (
            <div key={index} className={`${styles.paraLeftRight} ${(index + 1) % 2 ? styles.leftCon : styles.rightCon}`}>
              <div className={styles.imgContainer}>
                <Image src={item.image.replace("localhost", `http://${SERVER_IP}`)} width={640} height={488} layout='responsive' />
              </div>
              <div className={styles.contentContainer}>
                <h2>{item.sub_heading}</h2>
                <Markup content={item.description} />
              </div>
            </div>
          ))}
          <div className={styles.quote}>
            <Markup content={article.quote} />
          </div>
        </section>
        <section className={styles.bulletSection}>
          <Markup content={article.subheader} />
          {/* <h3>Subheader</h3>
          <p>Aute nostrud anim exercitation ea velit aliquip. Et fugiat reprehenderit reprehenderit aute dolore reprehenderit dolor. Fugiat amet ut enim duis duis sunt deserunt ea ea consectetur eu adipisicing.Et anim adipisicing quis deserunt velit proident duis amet ipsum reprehenderit. Velit qui commodo fugiat eu labore. Nostrud veniam mollit et fugiat incididunt minim sint reprehenderit.</p>
          <p>Reprehenderit ex est sit sunt id officia quis. Non voluptate non minim dolor exercitation fugiat labore adipisicing cillum non velit. In magna excepteur et ex minim qui. Aliquip aute nisi adipisicing laboris. Nulla aliquip non enim qui. Eiusmod in ad adipisicing minim deserunt nulla. Cupidatat in veniam nisi aliqua labore quis.Sunt magna qui eiusmod fugiat nisi aliquip eiusmod consectetur magna aliqua laborum eu voluptate. Esse laborum cillum occaecat exercitation Lorem non. Ipsum Lorem ex aute exercitation. Fugiat ad velit commodo labore ut nulla nostrud. Ex incididunt cillum nostrud dolore dolore est aute tempor est non et sit. Ipsum labore aute proident cupidatat in aliqua minim cupidatat id consectetur minim aliquip sit nulla.</p>
          <h4>List Subheader</h4>
          <ul>
            <li>Bullet One</li>
            <li>Bullet Two</li>
            <li>Bullet Three</li>
          </ul> */}
        </section>
      </>
    )
  }
}