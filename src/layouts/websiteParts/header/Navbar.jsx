import React, { useState, useEffect } from 'react'
import { navbar } from '../../../constants.js'

export const Navbar = ({
  navbarProps
}) => {

  let {
    navbarRightSideItems,
    navbarContainerCls,
    navbarLeftSideCls,
    navbarLeftSideLogoCls,
    navbarRightSideCls,
    navbarRightSideItemCls,
    pageName
  } = navbarProps

  return(
    <div className={navbarContainerCls} style={{
      backgroundColor: `${navbar.bgColor};`,
    }}>
      <div 
        className={navbarLeftSideCls}
        style={{
          color: `${navbar.textColor};`
        }}
        >
        <a href="/">
          <img 
            className={navbarLeftSideLogoCls}
            src={navbar.sourceImage}
            alt="logo" 
          />
        </a>
        <a href="/" style={{
          marginLeft: "2em",
        }}>
          Kabir Verma
        </a>
        
      </div>

      <div className={navbarRightSideCls}>
        {navbarRightSideItems.map((item) => {
          if (item.name !== pageName) {
            return (
              <a href={item.link} className={navbarRightSideItemCls}>
                <div 
                  
                  key={item.name}
                  style={{
                    color: `${navbar.textColor};`
                  }}
                >
                  {item.name}
                </div>
              </a>
            )
          }
          return null; // Do not render if current page matches
        })}
      </div>
    </div>
  )
}