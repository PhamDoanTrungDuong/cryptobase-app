// @ts-nocheck
import React, { useContext } from 'react'
import  {HiSun, HiMoon} from 'react-icons/hi'
import { ThemeContext } from '../context/ThemeContext'

const ThemeToggle: React.FC = () => {
      const {theme, setTheme} = useContext(ThemeContext);
      const toogleTheme = () => {
            setTheme(theme === 'dark' ? 'light' : 'dark')
      }
  return (
    <div className='p-2'>
      {theme === 'dark' ? (
            <div onClick={toogleTheme} className='cursor-pointer flex items-center'>
                  <HiSun className='text-primary text-2xl mr-2' /> Light Mode
            </div>
      ) : (
            <div onClick={toogleTheme} className='cursor-pointer flex items-center'>
                  <HiMoon className='text-primary text-2xl mr-2' /> Dark Mode
            </div>
      )}
    </div>
  )
}

export default ThemeToggle