import { Route, Routes } from 'react-router-dom'
import NavBar from './Components/Navbar'
import './App.css'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import HomePage from './Components/HomePage'
import Curriculum from './Components/Curriculum'
import LoadingScreen from './Components/LoadingScreen'
import Projects from './Components/Projects'
import Fotography from './Components/Fotography'
import ProjectDetail from './Components/ProjectDetail'


function App() {

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    const handleMouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }

  }, [])


  const variantsLagged = {
    default: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30
    },
    text: {
      height: 0,
      width: 0,
      x: mousePosition.x,
      y: mousePosition.y
    },
    click: {
      height: 3000,
      width: 3000,
      x: mousePosition.x - 1500,
      y: mousePosition.y - 1500
    }
  }

  const textEnter = useCallback(() => setCursorVariant("text"), [])
  const textLeave = useCallback(() => setCursorVariant("default"), [])

  // const textClick = () => {
  //   setCursorVariant("click")
  //   return  setTimeout(()=>setCursorVariant("default"), 700);
  // }

  return (
    <>
      <LoadingScreen />
      <div className="cursor" style={{ left: mousePosition.x - 2.5, top: mousePosition.y - 2.5 }}></div>
      <motion.div
        className='laggedCursor'
        variants={variantsLagged}
        animate={cursorVariant}
        transition={{
          // type: "spring",
          stiffness: 60,
          restDelta: 0.001
        }}
      />
      <main className='container'>
        <NavBar textEnter={textEnter} textLeave={textLeave} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<Projects textEnter={textEnter} textLeave={textLeave} />} />
          <Route path="/projects/:projectId" element={<ProjectDetail textEnter={textEnter} textLeave={textLeave} />} />
          <Route path="/fotography" element={<Fotography />} />
          <Route path="/curriculum" element={<Curriculum />} />
        </Routes>

      </main>
    </>
  )
}

export default App
