import React, { useEffect, useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { motion } from 'framer-motion'

const SocialLinks = ({ 
  pageName, 
  waveRef,
  styleTags,
  displayPixelRatio}) => {
  const socialLinksRef = useRef(null)

  const [links] = useState([
    { name: 'GitHub', url: 'https://github.com/KabirVerma8163', icon: faGithub, text: 'KabirVerma8163' },
    { name: 'LinkedIn', url: 'https://linkedin.com//in/kabirv', icon: faLinkedin, text: '/in/kabirv'},
    { name: 'Discord', url: 'https://discord.com/', icon: faDiscord , text: 'jammedpancakes'},
    { name: 'Email', url: 'kabirv8163@gmail.com', icon: faEnvelope, text: 'kabirv8163@gmail.com'}
  ])

  const [heightPosition, setHeightPosition] = useState(0)
  const [leftPosition, setLeftPosition] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false);

  // console.log(`DPR in SocialLinks: ${displayPixelRatio}, ${typeof(displayPixelRatio)}`)

  useEffect(() => {
    // Only proceed if displayPixelRatio is valid
    if (displayPixelRatio > 0) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 200);
      
      const updatePosition = () => {
        const waveElement = waveRef.current;
        const socialLinksElement = socialLinksRef.current;

        if (waveElement && socialLinksElement) {
          const waveBottom = waveElement.offsetTop + waveElement.offsetHeight ;
          const waveCenterX = waveElement.offsetLeft / displayPixelRatio + (waveElement.offsetWidth / 2 / displayPixelRatio);

          const linksHeight = socialLinksElement.offsetHeight / displayPixelRatio;
          const linksWidth = socialLinksElement.offsetWidth;

          let linksTop;
          if (pageName === "home") {
            linksTop = waveBottom - (waveElement.offsetHeight * 0.25) - (linksHeight / 2);
          } else {
            linksTop = waveBottom - (waveElement.offsetHeight * 0.3) - (linksHeight / 2);
          }

          const linksLeft = waveCenterX - (linksWidth / 2);

          setHeightPosition(linksTop);
          setLeftPosition(linksLeft);
        }
      };

      updatePosition();
      window.addEventListener('resize', updatePosition);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [waveRef, displayPixelRatio]);

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert("Email copied to clipboard!");
    } catch (err) {
      // console.error('Failed to copy: ', err);
    }
  };

  let {icon, iconProperties, linkContainer, linkText, contactContainer} = styleTags
  

  return (
    <>
      <div 
        ref={socialLinksRef}
        style={{
          opacity: isLoaded ? 1 : 0, 
          top: `${heightPosition}px`, 
          left: `${leftPosition}px`
        }}
        className={`${contactContainer}`}
        
      >
        {links.map((link, index) => (
          <motion.div 
            key={index} 
            className={`${icon} ${linkContainer}`}
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
              <FontAwesomeIcon icon={link.icon} className={iconProperties} />
            </a>
            <div className={`${linkText}`} >{link.text}</div> 
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
}

export default SocialLinks
