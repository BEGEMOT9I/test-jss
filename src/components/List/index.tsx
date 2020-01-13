import React, { FC } from 'react'
import { hot } from 'react-hot-loader/root'

import { ThemeEnablingContext } from 'containers/App'
import ItemByHook from './components/ItemByHook'
import ItemByHOC from './components/ItemByHOC'
import useStyles from './styles'

interface OuterProps {
  isRenderByHook: boolean
  isRenderByHOC: boolean
  isCustomHOC: boolean
}
interface Props extends OuterProps {}

const items = [...new Array(1000)]

const List: FC<Props> = ({ isRenderByHOC, isRenderByHook, isCustomHOC }) => {
  const classes = useStyles()

  return (
    <ThemeEnablingContext.Consumer>
      {withTheming => (
        <div className={classes.container}>
          {isRenderByHook &&
            items.map((_, index) => <ItemByHook key={`hook-${index}`} withTheming={withTheming} />)}
          <br />
          {isRenderByHOC &&
            items.map((_, index) => (
              <ItemByHOC key={`HOC-${index}`} isCustomHOC={isCustomHOC} withTheming={withTheming} />
            ))}
        </div>
      )}
    </ThemeEnablingContext.Consumer>
  )
}

export default hot(List)
