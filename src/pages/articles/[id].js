import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Markup } from 'interweave';
import styles from '@/styles/Articles.module.css'
import { FALLBACK_BG, SERVER_URL, fakeArticles } from '@/utils/const';
import Image from 'next/legacy/image';
import articleImg from "../../../public/assets/article-img.png";

export default function Article() {
  const [article, setArticle] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await axios.get(SERVER_URL)
        setArticle(articles.data.find(item => item.id == router.query.id))
      }
      catch (err) {
        console.log(err)
      }
    }
    fetchArticles()
  }, [router])

  const returnArticleDetails = () => <p className={styles.postInfo}>By <span>The Big House</span> | Posted in: NEWSLETTER | 1st June 2023</p>

  // console.log(articles)
  if (article) {
    return (
      <>
        <section className={styles.hero}>
          <Image src={article.image.startsWith("localhost") ? FALLBACK_BG : article.image} width={800} height={484} layout='responsive' alt="hero-image" />
          <div className={styles.heroContent}>
            <h1>{article.head_title}</h1>
          </div>
        </section>
        <div className={styles.postDetails}>
          <h1 className={styles.postTitle}>{article.title}</h1>
          {returnArticleDetails()}
          <div className={styles.postDesc}>
            <Markup content={article.description} />
          </div>
        </div>
        {/* <p className={styles.head}>Article ID: {router.query.id}</p> */}
        <div className={styles.contentContainer}>
          <Markup content={article?.page_desc} />
        </div>
      </>
    );
  } else return (
    <>
      <section className={styles.hero}>
        <Image src={FALLBACK_BG} width={800} height={484} layout='responsive' alt="hero-image" />
        <div className={styles.heroContent}>
          <p className={styles.category}>News</p>
          <h1>JUNE NEWS LETTER LONG!!</h1>
          {returnArticleDetails()}
        </div>
      </section>
      <div className={styles.postDetails}>
        <h1 className={styles.postTitle}>This is a title</h1>
        {returnArticleDetails()}
        <div className={styles.postDesc}>
          <p>Ullamco proident occaecat nulla officia nostrud fugiat magna. Do ea fugiat cillum sit voluptate eiusmod laborum proident labore. Est magna officia pariatur in incididunt do.Id mollit adipisicing ea est in Lorem officia esse incididunt tempor incididunt duis. Consectetur Lorem pariatur ullamco aliqua culpa laborum fugiat id. Labore quis sint incididunt nostrud laborum incididunt ut aute occaecat. Fugiat labore ex sunt consequat anim Lorem sint laboris pariatur elit ullamco nisi. Ipsum cupidatat reprehenderit ullamco culpa quis Lorem. Magna magna id veniam laboris velit irure veniam. Enim aliqua aliqua veniam velit commodo ex nulla laborum est eiusmod in anim.</p>
        </div>
      </div>
      <section className={styles.leftRightContainer}>
        {fakeArticles.map(item => (
          <div className={`${styles.paraLeftRight} ${item.id % 2 && styles.inverse}`}>
            <div className={styles.imgContainer}>
              <Image src={item.image} layout='responsive' />
            </div>
            <div className={styles.contentContainer}>
              <h2>{item.heading}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
        <div className={styles.quote}>
          <p>'Aliqua labore cupidatat culpa sint cillum enim tempor. Anim esse aute mollit labore aliqua occaecat et laborum ex commodo et duis.'<span className={styles.author}>Workshop Participant</span></p>
        </div>
      </section>
      <section className={styles.bulletSection}>
        <h3>Subheader</h3>
        <p>Aute nostrud anim exercitation ea velit aliquip. Et fugiat reprehenderit reprehenderit aute dolore reprehenderit dolor. Fugiat amet ut enim duis duis sunt deserunt ea ea consectetur eu adipisicing.Et anim adipisicing quis deserunt velit proident duis amet ipsum reprehenderit. Velit qui commodo fugiat eu labore. Nostrud veniam mollit et fugiat incididunt minim sint reprehenderit.</p>
        <p>Reprehenderit ex est sit sunt id officia quis. Non voluptate non minim dolor exercitation fugiat labore adipisicing cillum non velit. In magna excepteur et ex minim qui. Aliquip aute nisi adipisicing laboris. Nulla aliquip non enim qui. Eiusmod in ad adipisicing minim deserunt nulla. Cupidatat in veniam nisi aliqua labore quis.Sunt magna qui eiusmod fugiat nisi aliquip eiusmod consectetur magna aliqua laborum eu voluptate. Esse laborum cillum occaecat exercitation Lorem non. Ipsum Lorem ex aute exercitation. Fugiat ad velit commodo labore ut nulla nostrud. Ex incididunt cillum nostrud dolore dolore est aute tempor est non et sit. Ipsum labore aute proident cupidatat in aliqua minim cupidatat id consectetur minim aliquip sit nulla.</p>
        <h4>List Subheader</h4>
        <ul>
          <li>Bullet One</li>
          <li>Bullet Two</li>
          <li>Bullet Three</li>
        </ul>
      </section>
    </>
  )
}