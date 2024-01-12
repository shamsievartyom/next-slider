import React, { FC } from 'react'
import styles from './Button.module.css'
import Image from 'next/image'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    side: 'left' | 'Rigth'
}

const Button: FC<ButtonProps> = ({ side, ...args }) => {
    return (
        <button className={`${styles.button} ${side === 'Rigth' ? styles.button_rigth : ''}`} {...args}>
            {side === 'left' ? (
                <Image src='/button-left.svg' alt="Left side" height={23} width={173} />
            ) : (
                <Image src='/button-rigth.svg' alt="Right side" height={23} width={173} />
            )}
        </button>
    )
}

export default Button