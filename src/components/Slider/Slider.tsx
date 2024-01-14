'use client'
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './Slider.module.css'
import Slide from './Slide/Slide'
import Button from '../Button/Button'

interface mockData {
    id: number,
    types: number,
    img: string,
    title: string,
    date: string,
}

interface SliderProps {
    data: mockData[]
}

const Slider: FC<SliderProps> = ({ data }) => {

    const sliderRef = useRef<HTMLDivElement>(null)

    //create array of start point (coordinate) for slide in slider 
    const slidesPositionList = [0]
    useLayoutEffect(() => {
        let currentSum = 0;
        if (sliderRef.current) {
            Array.prototype.slice.call(sliderRef.current.children).forEach((el) => {
                console.log(el.clientWidth)
                currentSum += el.clientWidth
                slidesPositionList.push(currentSum)
                console.log(slidesPositionList)
            });
        }
    }, [])



    //find closest value from number array for x. Return value between x and finded value
    function findClosestValue(numbers: number[], x: number, comparison: 'more' | 'less'): number {
        if (comparison === 'more') {//add + 1 for fix browser pixel rendering
            return numbers.reduce((prev, curr) => (curr > x + 1 && (prev === x || curr < prev) ? curr : prev), x) - x;
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

    return (
        <div className={styles.main_container}>
            <div ref={sliderRef} className={styles.slider_container}>
                {data.map((el) => {
                    if (el.title.length > 35) {
                        return (<Slide key={el.id} date={el.date} img={el.img} title={el.title} type={4} />)
                    }
                    else {
                        return < Slide key={el.id} date={el.date} img={el.img} title={el.title} type={el.types} />
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