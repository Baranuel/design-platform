'use client'

export const Button = (onCLick: () => void) => {
    return <button onClick={() => onCLick}>click me</button>
}