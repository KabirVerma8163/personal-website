import React, { useEffect, useLayoutEffect, useRef, useState } from "react"
import { waveProperties } from "../../../constants.js"
import SocialLinks from "./SocialLinks.jsx"

const getCanvasHeight = (stageHeight, pixelRatio, pageName) => {
  if (pageName === "home") {
    return stageHeight * pixelRatio
  } else {
    return stageHeight * pixelRatio * 0.8
  }
}

const WaveComponent = ({
  heightFactor = 0.5,
  pageName,
  children,
  setParentHeight,
  canvasRef,
  styleTags,
}) => {
  if (canvasRef === undefined){
    canvasRef = useRef(null)
  }

  let canvasHeightFactor = 0.8
  if (pageName === "home" ){
    heightFactor = 1
    canvasHeightFactor = 1
  } else {
    heightFactor = 0.8
    canvasHeightFactor = 1
  }

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const parent = () => {return canvas.parentNode.parentNode}
    
    const ctx = canvas.getContext("2d")
    const pixelRatio = window.devicePixelRatio > 1 ? 2 : 1

    let stageWidth = document.body.clientWidth
    let stageHeight = parent().clientHeight * heightFactor
    // console.log(parent())
    // console.log(parent().clientHeight)
    // parent().style.height = getCanvasHeight(stageHeight, pixelRatio, pageName)
    // console.log(parent().clientHeight)

    canvas.width = (stageWidth * pixelRatio) / 2 
    canvas.height = stageHeight * pixelRatio
    canvas.height = getCanvasHeight(stageHeight, pixelRatio, pageName)

    // console.log(canvas.height)
    // console.log(canvas.style.height)

    ctx.scale(pixelRatio, pixelRatio)

    const waveGroup = new WaveGroup(pageName)
    waveGroup.resize(stageWidth, stageHeight)

    const resize = () => {
      // console.log(parent())
      // console.log(parent().clientHeight)
      // console.log(getCanvasHeight(stageHeight, pixelRatio, pageName))
      // parent().style.height = getCanvasHeight(stageHeight, pixelRatio, pageName)
      // console.log(parent().clientHeight)
      // setParentHeight(getCanvasHeight(stageHeight, pixelRatio, pageName))

      stageWidth = document.body.clientWidth
      stageHeight = parent().clientHeight * heightFactor
      canvas.width = (stageWidth * pixelRatio) / 2 
      canvas.height = getCanvasHeight(stageHeight, pixelRatio, pageName)

      ctx.scale(pixelRatio, pixelRatio)
      waveGroup.resize(stageWidth, stageHeight)
    }

    const animate = () => {
      ctx.clearRect(0, 0, stageWidth, stageHeight)
      waveGroup.draw(ctx)
      requestAnimationFrame(animate)
    }
    
    const footer = document.getElementById("ReactFooter")
    const layoutDiv = document.getElementById("Layout")

    const footerTop = footer.getBoundingClientRect().top
    canvas.style.position = "absolute"
    canvas.style.top = `${footerTop + window.scrollY}px`

    window.addEventListener("resize", () => {
      resize()
      const layoutBottom = layoutDiv.getBoundingClientRect().bottom
      const footerTop = footer.getBoundingClientRect().top
      canvas.style.position = "absolute"
      canvas.style.top = `${footerTop + window.scrollY}px`

    })
    animate()

    return () => {
      window.removeEventListener("resize", () => {
        resize()
      })
    }
  }, [])

  return (
    <>
      <canvas
        className={"wave"}
        id={"wave"}
        ref={canvasRef}
        style={{
          // position: "absolute",
          // bottom: pageName === "home" ? "0px" : "50px" // or whatever value you prefer
        }}
      />

      <SocialLinks styleTags={styleTags} waveRef={canvasRef} pageName={pageName}></SocialLinks>
    </>
  )
}

export default WaveComponent

class Point{
  constructor(index, x, y, speed = 0.02, max = 15) {
    this.x = x
    this.y = y
    this.fixedY = y
    this.speed = speed
    this.cur = index
    this.max = Math.random() * 100 + max
  }

  update() {
    this.cur += this.speed
    this.y = this.fixedY + Math.sin(this.cur) * this.max
  }
}

class Wave {
  constructor(index, totalPoints, color, pageName) {
    this.index = index
    this.totalPoints = totalPoints
    this.color = color
    this.points = []
    this.pageName = pageName
  }
  resize(stageWidth, stageHegiht) {
    this.stageWidth = stageWidth
    this.stageHegiht = stageHegiht
    this.centerX = stageWidth / 2
    this.centerY = stageHegiht / 2

    this.pointGap = this.stageWidth / (this.totalPoints - 1)

    this.init()
  }

  init() {
    this.points = []
    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(this.index + i, this.pointGap * i, this.centerY)
      this.points[i] = point
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color

    let prevX = this.points[0].x
    let prevY = this.points[0].y

    ctx.moveTo(prevX, prevY)

    for (let i = 0; i < this.totalPoints; i++) {
      this.points[i].update()

      const cx = (prevX + this.points[i].x) / 2
      const cy = (prevY + this.points[i].y) / 2
      ctx.quadraticCurveTo(prevX, prevY, cx, cy)
      prevX = this.points[i].x
      prevY = this.points[i].y
    }

    ctx.lineTo(prevX, prevY)
    ctx.lineTo(this.stageWidth, this.stageHegiht)
    ctx.lineTo(this.points[0].x, this.stageHegiht)
    ctx.fill()
    ctx.closePath()
  }
}

class WaveGroup {
  constructor(pageName) {
    this.totalWaves = 3
    this.totalPoints = 6

    this.color = waveProperties.colors.length === 3 ? waveProperties.colors : ["rgba(0,199,235,0.4)", "rgba(0,146,199,0.4)", "rgba(0,87,185,0.4)"]
    this.waves = []

    for (let i = 0; i < this.totalWaves; i++) {
      const wave = new Wave(i, this.totalPoints, this.color[i], pageName)
      this.waves[i] = wave
    }
  }
  resize(stageWidth, stageHegiht) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i]
      wave.resize(stageWidth, stageHegiht)
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i]
      wave.draw(ctx)
    }
  }
}



