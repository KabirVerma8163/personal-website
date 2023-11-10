import React, { useEffect, useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

const SocialLinks = ({ 
  pageName, 
  waveRef }) => {
  const socialLinksRef = useRef(null)

  const [links] = useState([
    { name: 'GitHub', url: 'https://github.com/KabirVerma8163', icon: faGithub, text: 'KabirVerma8163' },
    { name: 'LinkedIn', url: 'https://linkedin.com//in/kabirv', icon: faLinkedin, text: '/in/kabirv'},
    { name: 'Discord', url: 'https://discord.com/', icon: faDiscord , text: 'jammedpancakes'},
    { name: 'Email', url: 'mailto:kabirv8163@gmail.com', icon: faEnvelope, text: 'kabirv8163@gmail.com'}
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

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Email copied to clipboard!");
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  

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
            className="icon"
            style={styles.linkContainer}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.1 }}
          >
            <a
              href={link.url}
              onClick={(e) => {
                if (link.name === "Email") {
                  e.preventDefault()
                  copyToClipboard(link.url)
                }
              }}
            >
              <FontAwesomeIcon icon={link.icon} size="3x" />
            </a>
            <div style={styles.linkText}>{link.text}</div> 
          </motion.div>
        ))}
      </div>
    </>
  )
}

var glassCard = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '2em',
  padding: '1em 2.5em', 
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
    minWidth: '7em', // Fixed width for each icon's container
    minHeight: '3em', // Fixed height for each icon's container
    borderRadius: '10%', // Rounded corners
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.1s ease-in-out', // Transition effect
    backgroundColor: "#1e1e1e99",
    flexDirection: 'column',
    padding: '0.5em',
  },
  linkText: {
    marginTop: '0.5em', // Space between icon and text
    padding: '0 1.25em', // Padding around text
    textAlign: 'center', // Center the text below the icon
    fontSize: '0.55em', // Text size
    textShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)', // Text shadow for readability
  },
  link: {
    textDecoration: 'none',
  }
}

export default SocialLinks
