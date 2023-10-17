import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from './Navbar.jsx'
import { Minibar } from './Minibar.jsx'


const ScrollBasedComponent = ({
  navbarProps,
  minibarProps
}) => {
  const [showFirstComponent, setShowFirstComponent] = useState(true)

  const checkScroll = () => {
    const position = window.scrollY
    position > 50 ? setShowFirstComponent(false) : setShowFirstComponent(true)
  }

  useEffect(() => {
    window.addEventListener('scroll', checkScroll)
    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [])

  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }
  
  return (
    <AnimatePresence wait>
      {showFirstComponent ? (
        <motion.div
          key="one"
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
          variants={variants}
        >
          <Navbar 
            navbarProps={navbarProps}
          />
        </motion.div>
      ) : (
        <motion.div
          key="two"
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
          variants={variants}
        >
          <Minibar 
            minibarProps={minibarProps}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ScrollBasedComponent



// import React, { useState, useEffect } from 'react'

// const Navbar = ({
//   children,
//   navbar,
//   minibar
// }) => {
//   const [scrollPosition, setScrollPosition] = useState(0)
//   const [minimize, setMinimize] = useState(false)

//   const handleScroll = () => {
//     const position = window.pageYOffset
//     setScrollPosition(position)
//   }

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll, { passive: true })

//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [])

//   useEffect(() => {
//     if (scrollPosition > 100) {
//       setMinimize(true)
//     } else {
//       setMinimize(false)
//     }
//   }, [scrollPosition])

//   const modifiedChildren = []
//   let navbarElem = null
//   let minibarElem = null

//   React.Children.forEach(children, child => {
//     if (React.isValidElement(child)) {
//       if (child.props.id === 'Navbar') {
//         modifiedChildren.push(child)
//         // navbarElem = child
//       } else if (child.props.id === 'Minibar') {
//         // minibarElem = child
//         modifiedChildren.push(React.cloneElement(child, { }))
//       }
//     }
//   })

//   console.clear()
//   let astroSlot = null
//   React.Children.forEach(children, child => {
//     // console.log(child)
//     astroSlot = child
//   })
//   // console.log(astroSlot)

//   React.Children.forEach(children, child => {
//     React.Children.forEach(child, child1 => {
//       React.Children.forEach(child1, child2 => {
//         console.log(child2) 
//       })
//     })
//   })

//   console.log(modifiedChildren)
//   console.log(navbarElem)
//   console.log(minibarElem)

//   return (
//     <div>
//       {modifiedChildren}
//       {navbar}
//       {children}
//     </div>
//   )
// }

// export default Navbar
