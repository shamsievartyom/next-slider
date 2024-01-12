import Image from 'next/image'
import styles from './page.module.css'
import Slider from '../components/Slider/Slider'
import data from '../utils/mockData'

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.section}>
        <div className={styles.section_text_container}>
          <h1 className={styles.section_text_title}>Полезные материалы</h1>
          <p className={styles.section_text_description}>Собрали для вас полезные исследования схемы кормления и другие материалы, которые пригодятся для лучших результатов на вашем хозяйстве</p>
        </div>
        <Slider data={data} />
      </section>
    </main>
  )
}
