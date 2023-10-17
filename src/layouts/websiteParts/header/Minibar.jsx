import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { navbar } from '../../../constants.js'

export const Minibar = ({
  minibarProps
}) => {

  let {
    minibarContainerCls,
    minibarItems,
    minibarItemCls,
    pageName
  } = minibarProps


  return(
    <div className={minibarContainerCls}>
      {
        minibarItems.map((item) => {
          if (item.name !== pageName) {
            return (
              <div 
                key={item.name}
                className={minibarItemCls}
                style={{
                  color: `${navbar.textColor}`
                }}>
                <a href={item.link}>
                  <FontAwesomeIcon 
                  icon={item.icon}
                  style={{
                    fontSize: '0.8em'
                  }}
                  />
                </a>
              </div>
            )
          }
          return null
        })
      }
    </div>
  )
}
