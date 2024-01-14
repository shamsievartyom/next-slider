'use client'
import React, { FC } from 'react'
import styles from './Slide.module.css'
import Image from 'next/image'

interface SlideProps {
    type: number,
    title: string,
    img: string,
    date: string,
}

const Slide: FC<SlideProps> = ({ type, title, img, date }) => {
    return (
        <div className={`${styles.container} ${type === 4 ? styles.container_wide : ''}`} >
            <Image
                className={`${styles.image} ${type === 1 ? styles.image_type_1 : ''} ${type === 2 ? styles.image_type_2 : ''} ${type === 3 ? styles.image_type_3 : ''}`}
                src={img}
                alt='Slider image'
                width={`${type === 4 ? 688 : 344}`}
                height={344}
            />
            <div className={styles.text_container}>
                <p className={styles.title}>{title}</p>
                <p className={styles.date}>{date}</p>
            </div>
        </div>
    )
}

export default Slide