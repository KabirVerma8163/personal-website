import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { zigZag } from '../../constants'
import { useIsTouchDevice } from '../isTouchDevice.jsx'

const zzItemOffset = 1 // em
const scale = 1.3
const evenVariant = {
  initial: { opacity: 1, color: `#6e6ed7`},
  hover: { scale: scale, y: `+${zzItemOffset}em`, color: '#fff'},
  unhover: { scale: 0.75},
}

const oddVariant = evenVariant
// {
//   initial: { opacity: 1,  color: `#6e6ed7`},
//   hover: { 
//     scale: scale, 
//     y: `+${zzItemOffset}em`, 
//     color: `${zigZag.hoverColor !== "" ? zigZag.hoverColor : ""}`
//   },
//   unhover: { scale: 0.75, opacity: 1, x: 0},
// }


const ReactZigZag = (props) => {
  const {
    zigzagItemCls, 
    zigzagContainerCls,
    links
  } = props
  
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const isTouchDevice = useIsTouchDevice()
  if (isTouchDevice){
    evenVariant.hover = { }  
  }
  return (
  <div className={zigzagContainerCls}>
    {
    links.map((item, index) => {
      const itemVariant = (index % 2 === 0 ? evenVariant : oddVariant)
      let initial = () => {
        if (hoveredIndex === null) return ""
        if (hoveredIndex === index) return "hover"
        return "unhover"
      }

      const myComponentStyle = index + 1 === links.length ? { marginRight: '0'} : { };

      return (
        <motion.div 
          className={zigzagItemCls}
          key={index}
         >
          <motion.div
            className="m-3 mt-0 relative"
            style={myComponentStyle}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <a href={item["link"]}>
              <motion.p 
                transition={{ type: "spring"}}
                initial="initial"
                animate={initial()}
                variants={itemVariant}
              >
                {item.name}
              </motion.p>
            </a>
          </motion.div>
        </motion.div>
      )
    })
    }
  </div>
  );
};

export default ReactZigZag;
