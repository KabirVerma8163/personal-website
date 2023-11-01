import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Card from '../card/Card.jsx'

const ScrollingComponent = ({ projects, isMobile }) => {
  
  const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.1 } }, // Added delay here
    exit: { opacity: 0, x: 100 }
  }
  
  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { delay: 0.1 } }, // Added delay here
    exit: { opacity: 0, x: -100 }
  }

  if (!isMobile){
    return (
      <div className="projectCardsContainer flex justify-between" style={{ height: '100%', display: '' }}>
        
        <div style={{ width: "50%", height: '100%'}}>
          {projects.map((project, index) => index % 2 === 0 && (
            <ScrollingCard key={index} information={project} animationVariant={slideInFromLeft} />
          ))}
        </div>
  
        <div style={{ width: "50%", height: '100%'}} >
          {projects.map((project, index) => index % 2 !== 0 && (
            <ScrollingCard key={index} information={project} animationVariant={slideInFromRight} />
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div className="projectCardsContainer flex justify-between" style={{ height: '100%', display: '' }}>

      <div style={{ width: "100%", height: '100%'}} >
        {projects.map((project, index) => index % 1 === 0 && (
          <ScrollingCard key={index} information={project} animationVariant={slideInFromLeft} />
        ))}
      </div>
    </div>
    )
  }

}

const ScrollingCard = ({ information, animationVariant }) => {
  const controls = useAnimation()
  const cardRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          controls.start("visible")
        } else {
          controls.start("exit") 
        }
      })
    }, {
      rootMargin: '-2.5% 0px -2.5% 0px',  // Shrink the height of the effective viewport
      threshold: 0.5  // Trigger the callback when 50% of the card is visible
    })

    if (cardRef.current) observer.observe(cardRef.current)

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current)
    }
  }, [controls])

  return (
    <motion.div 
      ref={cardRef}
      initial="hidden"
      animate={controls}
      exit="exit"  // Set the exit property for framer-motion
      variants={animationVariant}
    >
      <Card information={information} />
    </motion.div>
  )
}

export default ScrollingComponent



// import { debounce } from 'lodash'  // If lodash isn't in your project, you can create a simple debounce function

// const ScrollingComponent = () => {
//   const controls = useAnimation()
//   const controlsReverse = useAnimation()
//   const containerRef = useRef(null)
//   const containerRefReverse = useRef(null)
//   const [isMobile, setIsMobile] = useState(true)
//   const [hasDeterminedScreenSize, setHasDeterminedScreenSize] = useState(false)

//   useEffect(() => {
//     const handleResize = debounce(() => {
//       setIsMobile(window.innerWidth <= 768)
//     }, 250)

//     setIsMobile(window.innerWidth <= 768)
//     setHasDeterminedScreenSize(true)

//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   useEffect(() => {
//     // Uncomment and modify if animations are needed
//     // ... existing animation logic ...
//   }, [controls, controlsReverse, isMobile])

//   const leftProjects = []
//   const rightProjects = []
//   projects.forEach((project, index) => {
//     if (index % 2 === 0) leftProjects.push(<Card key={index} information={project} />)
//     else rightProjects.push(<Card key={index} information={project} />)
//   })

//   if (hasDeterminedScreenSize && !isMobile) {
//     return (
//       <div className="projectCardsContainer" style={{ height: '100%' }}>
//         <div style={{ width: "50%", height: '100%', position: 'relative', backgroundColor: 'red' }}>
//           <div style={{ color: 'white' }}>
//             {leftProjects}
//           </div>
//         </div>

//         <div style={{ width: "50%", height: '100%', position: 'relative', backgroundColor: 'green' }}>
//           <div style={{ color: 'white' }}>
//             {rightProjects}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return null // Render nothing for mobile or before determining screen size
// }

// export default ScrollingComponent



// const ScrollingComponent = () => {
//   const controls = useAnimation()
//   const controlsReverse = useAnimation()
//   const containerRef = useRef(null)
//   const containerRefReverse = useRef(null)
//   const [isMobile, setIsMobile] = useState(true)
//   const [hasDeterminedScreenSize, setHasDeterminedScreenSize] = useState(true)

//   // Detect screen size
//   useEffect(() => {
//     setIsMobile(window.innerWidth <= 768)
//     setHasDeterminedScreenSize(true)
//     const handleResize = () => setIsMobile(window.innerWidth <= 768)

//     window.addEventListener('resize', handleResize)
//     return () => {window.removeEventListener('resize', handleResize)}
//   }, [])

//   useEffect(() => {
//     // if (containerRef.current) {
//     //   const scrollHeight = containerRef.current.scrollHeight
//     //   controls.start({ y: [-scrollHeight, 0], transition: { duration: 1, ease: "linear" } })
//     // }
//     // if (containerRefReverse.current) {
//     //   const scrollHeightReverse = containerRefReverse.current.scrollHeight
//     //   controlsReverse.start({ y: [scrollHeightReverse, 0], transition: { duration: 1, ease: "linear" } })
//     // }
//   }, [controls, controlsReverse, isMobile])

//   if (true || (hasDeterminedScreenSize && !isMobile)){
//     return (
//       <div className="projectCardsContainer"
//       style={{ height: '100%',}}>
//         <div style={{width: "50%", height: '100%', position: 'relative', backgroundColor: 'red'}}>
//           <div style={{color: 'white'}}>
//             {projects.map((project, index) => index % 2 === 0 && <Card key={index} information={project} />)}
//           </div>
//         </div>

//         <div style={{width: "50%", height: '100%', position: 'relative', transform: 'translateY(-0%)', backgroundColor: 'green'}}>
//           <div style={{color: 'white'}}>
//             {projects.map((project, index) => index % 2 !== 0 && <Card key={index} information={project} />)}
//           </div>
//         </div>
//       </div>
//     )
//   }  
//   if (hasDeterminedScreenSize && isMobile) {
//     return (
//       <div className="projectCardsContainer"
//       style={{ height: '100%',}}>
//         {/* <div style={{width: "90%", height: '100%', }}>
//           <motion.div ref={containerRef} initial={{ y: 0 }} animate={controls} style={{color: 'white' }}>
//             {projects.map((project, index) => <Card key={index} information={project} />)}
//           </motion.div>
//         </div> */}
//       </div>
//     )
//   } return null
// }

// export default ScrollingComponent
