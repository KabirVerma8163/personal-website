import React, { useEffect, useRef, useState } from 'react'
import ScrollingComponent from './DoubleColumn.jsx'

const ProjectsComponent = ({projects}) => {
  const [isMobile, setIsMobile] = useState(false)
  const [hasDeterminedScreenSize, setHasDeterminedScreenSize] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    setHasDeterminedScreenSize(true)
    
    // console.log(`window.innerWidth: ${window.innerWidth}`)
    // console.log(`setIsMobile: ${isMobile}`)
    // console.log(`hasDeterminedScreenSize: ${hasDeterminedScreenSize}`)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Render for larger screens
  if (hasDeterminedScreenSize) {
    return ( <ScrollingComponent isMobile={isMobile} projects={projects}> </ScrollingComponent>)
  }
  return null
}

export default ProjectsComponent
