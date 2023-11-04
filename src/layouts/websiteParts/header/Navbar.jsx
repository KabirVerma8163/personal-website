import HoverComponent from '../../../components/zigzag/ZigZag.jsx'
import * as styles from '../../../components/zigzag/zigzag.module.scss'

const zigZagLinks = [
  {
    name: "Resume",
    type: "page",
    link: "/resume"
  },
  {
    name: "Projects",
    type: "page",
    link: "/projects"
  },
  {
    name: "Contact",
    type: "page",
    link: "#Contact"
  }
]

export const Navbar = ({
  navbarProps,
  showContents
}) => {

  let {
    navbarRightSideItems, navbarLeftSideLogoCls, navbarRightSideItemCls, pageName,
    navbarContainerCls,
    navbarLeftSideCls,
    navbarRightSideCls,
    navbarHeaderCls,
  } = navbarProps

  return (
    <div className={navbarContainerCls}>
      <div className={navbarLeftSideCls}>
        <div style={{
          color: `#6e6ed7`
        }}
        >
          {showContents
            ? (<a className={navbarHeaderCls} href="/"> Kabir Verma </a>)
            : (<a href="/" style={{ color: `#1e1e1e` }}>
              Kabir Verma </a>
            )}
        </div>
      </div>

      <div className={navbarRightSideCls}>
        {
          showContents ? (
            <HoverComponent
              zigzagContainerCls={styles.zigzagContainer}
              zigzagItemCls={styles.zigzagItem}

              links={zigZagLinks}
            />) : (<></>)
        }
      </div>

    </div>
  )
}



