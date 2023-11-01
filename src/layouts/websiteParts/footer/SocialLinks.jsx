import React, { useEffect, useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { motion } from 'framer-motion'

const SocialLinks = ({ 
  pageName, 
  waveRef }) => {
  const socialLinksRef = useRef(null)

  const [links] = useState([
    { name: 'GitHub', url: 'https://github.com/', icon: faGithub },
    { name: 'LinkedIn', url: 'https://linkedin.com/', icon: faLinkedin },
    { name: 'Discord', url: 'https://discord.com/', icon: faDiscord },
  ])

  const [heightPosition, setHeightPosition] = useState(0)
  const [leftPosition, setLeftPosition] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 200)
    
    const updatePosition = () => {
      const waveElement = waveRef.current
      const socialLinksElement = socialLinksRef.current

      if (waveElement && socialLinksElement) {
        // console.log(waveElement)
        // var waveRect = waveElement.getBoundingClientRect()
        // var socialLinksRect = socialLinksElement.getBoundingClientRect()
        // // console.log(waveRect)
        // // console.log("SocialLinksRect")
        // // console.log(socialLinksRect)

        // var waveBottom = waveRect.bottom
        // // waveBottom += window.scrollY
        // var linksTop = waveRect.bottom - socialLinksRect.height 
        // if (pageName === "home") {
        //   linksTop -= waveRect.height * 0.075
        // } else {
        //   linksTop -= (waveRect.height * 0.1)
        // }
        // var socialLinksCenter = socialLinksRect.top + (socialLinksRect.height / 2)
        // var screenCenter = window.innerHeight / 2

        // var offset = waveElement.offsetHeight 
        // var updatedTop = waveBottom - offset - (socialLinksRect.height / 2)
        // var updatedLeft = waveRect.left + (waveRect.width / 2) - (socialLinksRect.width / 2)


        // console.log(`waveRect: bottom - ${waveRect.bottom}, top - ${waveRect.top},  height - ${waveRect.height} | updatedPosition: ${linksTop}`)

        var waveBottom = waveElement.offsetTop + waveElement.offsetHeight;
        var waveCenterX = waveElement.offsetLeft + (waveElement.offsetWidth / 2);

        var linksHeight = socialLinksElement.offsetHeight;
        var linksWidth = socialLinksElement.offsetWidth;

        var linksTop;
        if (pageName === "home") {
          linksTop = waveBottom - (waveElement.offsetHeight * 0.2) - (linksHeight / 2);
        } else {
          linksTop = waveBottom - (waveElement.offsetHeight * 0.3) - (linksHeight / 2);
        }

        var linksLeft = waveCenterX - (linksWidth / 2);

        setHeightPosition(linksTop)
        setLeftPosition(linksLeft)
      }
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updatePosition)
    }
  }, [waveRef])

  return (
    <>
      <div 
        ref={socialLinksRef}
        style={{ ...styles.container, 
          opacity: isLoaded ? 1 : 0, 
          top: `${heightPosition}px`, 
          left: `${leftPosition}px`
        }}
      >
        {links.map((link, index) => (
          <motion.div 
            key={index} 
            className="icon-container"
            style={styles.linkContainer}
            whileHover={{ scale: 1.2 }} // Framer Motion hover effect
            transition={{ duration: 0.1 }} // Framer Motion transition
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="icon"
            >
              <FontAwesomeIcon styles = {styles.link} className="icon" icon={link.icon} size="2x" />
            </a>
          </motion.div>
        ))}
      </div>
    </>
  )
}

var glassCard = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '2em',
  padding: '1em 4em', 
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
  backdropFilter: 'blur(10px)', 
}

const styles = {
  container: {
    ...glassCard,
    display: 'flex',
    gap: '1rem',
    zIndex: 1000,
    position: 'absolute',
  },
  linkContainer: {
    width: '3em', // Fixed width for each icon's container
    height: '3em', // Fixed height for each icon's container
    borderRadius: '25%', // Rounded corners
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.1s ease-in-out', // Transition effect
    backgroundColor: "#1e1e1e99",
  },
  link: {
    textDecoration: 'none',
  }
}

export default SocialLinks
