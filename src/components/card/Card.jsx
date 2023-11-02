import React, { useState, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Card.module.scss'

const Card = ({ information }) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = () => setIsOpen(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';  // Disable scrolling
    } else {
      document.body.style.overflow = '';        // Re-enable scrolling
    }
  
    // Cleanup function to ensure that scrolling is re-enabled when the component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  return (
  <div className="">
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}     // Initial state
        whileHover={{ scale: 1.15 }}
        // className={`${styles.card} shadow-md hover:shadow-xl transition-shadow duration-300`}
        className={`${styles.card}`}
        onClick={() => setIsOpen(true)}
      >
        <a
          href={information.Link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.cardHeader}`}
        >
          {information.Name}
        </a>
        <p className="mt-2 text-gray-300">{information.MiniDescription}</p>
        <div className="mt-4 text-sm text-gray-500 font-semibold">
          Languages:
          {information.Languages.map(lang =>
            <span key={lang} className={`${styles.cardLanguages} ${lang.toLowerCase().replace('.', '-').replace(' ', '-')}`}>
              {lang}
            </span>)}
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`${styles.modalBackground}`}
            onClick={closeModal}
          >
            <motion.div
              className={`${styles.modal} bg-white p-6 rounded-lg shadow-xl`}
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "100vh" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex justify-between items-center mb-4">
                <a href={information.Link || information.RepoLink} target="_blank" rel="noopener noreferrer"
                 className={`${styles.cardHeaderMain} font-semibold`}
                >
                  {information.Name}
                </a>

                <span>
                {information.Field && information.Field.map(field => (
                    <span key={field} className={`${styles.cardField} ${field.toLowerCase().replace('.', '-').replace(' ', '-')}`}>
                      {field}
                    </span>
                ))}
                </span>
              </div>

              <div className="flex mb-4 text-sm text-gray-500 font-semibold">
                <div className="mr-2 ">
                  Languages:
                  {information.Languages.map(lang => (
                    <span key={lang} className={`${styles.cardLanguages} ${lang.toLowerCase().replace('.', '-').replace(' ', '-')}`}>
                      {lang}
                    </span>
                  ))}
                </div>
                <div>
                  Technologies:
                  {information.Technologies.map(tech => (
                    <span key={tech} className={`${styles.cardTechnologies} ${tech.toLowerCase().replace('.', '-').replace(' ', '-')}`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`${styles.cardTextMain}`}>
                <p className="mb-4">{information.MiniDescription}</p>
                <p className="mb-4">{information.FullDescription}</p>
              </div>


              {information.Link && (
                <a href={information.RepoLink} target="_blank" rel="noopener noreferrer" className={`${styles.cardLink} hover:underline mb-2`}>
                  Repo 
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  </div>
  )
}

export default Card
