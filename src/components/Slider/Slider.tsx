'use client'
import React, { FC, useRef } from 'react'
import styles from './Slider.module.css'
import Slide from './Slide/Slide'
import Button from '../Button/Button'

interface mockData {
    id: number,
    types: string,
    img: string,
    title: string,
    date: string,
}

interface SliderProps {
    data: mockData[]
}

const Slider: FC<SliderProps> = ({ data }) => {

    //create array of start point (coordinate) for slide in slider 
    let currentSum = 0;
    const slidesPositionList: number[] = [0]
    data.forEach((el) => {
        currentSum += el.title.length <= 35 ? 344 : 688;
        slidesPositionList.push(currentSum);
    });

    const sliderRef = useRef<HTMLDivElement>(null)

    //find closest value from number array for x. Return value between x and finded value
    function findClosestValue(numbers: number[], x: number, comparison: 'more' | 'less'): number {
        if (comparison === 'more') {
            return numbers.reduce((prev, curr) => (curr > x && (prev === x || curr < prev) ? curr : prev), x) - x;
        } else {
            return x - numbers.reduce((prev, curr) => (curr < x && (prev === x || curr > prev) ? curr : prev), x);
        }
    }

    //scroll to closest left slide
    const handlePrev = () => {
        const sliderCur = sliderRef.current
        if (sliderCur)
            sliderCur.scroll({
                left: sliderCur.scrollLeft - findClosestValue(slidesPositionList, sliderCur.scrollLeft, "less"),
                behavior: 'smooth'
            });
    }

    //scroll to closest rigth slide
    const handleNext = () => {
        const sliderCur = sliderRef.current
        if (sliderCur)
            sliderCur.scroll({
                left: sliderCur.scrollLeft + findClosestValue(slidesPositionList, sliderCur.clientWidth + sliderCur.scrollLeft, "more"),
                behavior: 'smooth'
            });
    }

    let lastNumber: number | null = null;

    //select random slide type exclude double type 0 in a row 
    const getRandomNonRepeating = (): 0 | 1 | 2 | 3 => {
        let randomNumber: number;
        do {
            randomNumber = Math.floor(Math.random() * 4);
        } while (lastNumber === 0 && randomNumber === 0);

        lastNumber = randomNumber;
        return randomNumber as 0 | 1 | 2 | 3;
    }
    return (
        <div className={styles.main_container}>
            <div ref={sliderRef} className={styles.slider_container}>
                {data.map((el) => {
                    if (el.title.length > 35) {
                        return (<Slide key={el.id} date={el.date} img={el.img} title={el.title} type={4} />)
                    }
                    else {
                        return < Slide key={el.id} date={el.date} img={el.img} title={el.title} type={getRandomNonRepeating()} />
                    }
                })}
            </div>
            <div className={styles.buttons}>
                <Button side='left' onClick={handlePrev} />
                <Button side='Rigth' onClick={handleNext} />
            </div>
        </div>
    );
}

export default Slider