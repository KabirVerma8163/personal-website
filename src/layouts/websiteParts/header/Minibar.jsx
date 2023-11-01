import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
              <a key={item.name} href={item.link} className={minibarItemCls}>
                <FontAwesomeIcon 
                icon={item.icon}
                />
              </a>
            )
          }
          return null
        })
      }
    </div>
  )
}
