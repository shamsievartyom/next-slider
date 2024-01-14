import React, { FC, useState } from 'react'
import styles from './Button.module.css'
import Image from 'next/image'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    side: 'left' | 'Rigth'
}

const Button: FC<ButtonProps> = ({ side, ...args }) => {

    const [hover, setHover] = useState(false)

    return (
        <button onMouseLeave={() => setHover(false)} onMouseEnter={() => setHover(true)} className={`${styles.button} ${side === 'Rigth' ? styles.button_rigth : ''}`} {...args}>
            {side === 'left' ? (
                <Image src={`${hover === false ? '/button-left.svg': '/button-left-active.svg'}`} alt="Left side" height={23} width={173} />
            ) : (
                <Image src={`${hover === false ? '/button-rigth.svg': '/button-rigth-active.svg'}`} alt="Right side" height={23} width={173} />
            )}
        </button>
    )
}

export default Button