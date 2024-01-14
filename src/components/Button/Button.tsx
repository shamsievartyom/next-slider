import React, { FC, useEffect, useState } from 'react'
import styles from './Button.module.css'
import Image from 'next/image'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    side: 'left' | 'Rigth'
}

const Button: FC<ButtonProps> = ({ side, ...args }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [hover, setHover] = useState(false)

    return (
        <button onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)} className={`${styles.button} ${side === 'Rigth' ? styles.button_rigth : ''}`} {...args}>
            {side === 'left' ? (
                windowWidth > 650 ?
                    <Image src={`${hover === false ? '/button-left.svg' : '/button-left-active.svg'}`} alt="Left side" height={23} width={173} />
                    : <Image src={`${hover === false ? '/button-left-small.svg' : '/button-left-small-active.svg'}`} alt="Left side" height={24} width={48} />
            ) : (
                windowWidth > 650 ?
                <Image src={`${hover === false ? '/button-rigth.svg' : '/button-rigth-active.svg'}`} alt="Right side" height={23} width={173} />
            : <Image src={`${hover === false ? '/button-rigth-small.svg' : '/button-rigth-small-active.svg'}`} alt="Rigth side" height={24} width={48} />
                )}
        </button>
    )
}

export default Button