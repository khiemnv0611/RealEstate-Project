import clsx from 'clsx'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const Button = ({children, className, onClick, type = 'button'}) => {
  return ( <button
    type={type}
    onClick={onClick}
    className={twMerge(
      clsx('px-4 py-3 text-white bg-main-700 rounded-md', className)
    )}
  >
    {children}
    </button>
  )
}

export default Button