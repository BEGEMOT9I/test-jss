import React, { FC } from 'react'
import { hot } from 'react-hot-loader/root'
import withStyles from 'react-jss'

import { withStyles as customWithStyles, JSSProps } from 'utils/react-jss'
import { withThemeStyles, withoutThemeStyles } from './styles'

interface OuterProps {
  isCustomHOC: boolean
  withTheming: boolean
}
interface Props extends OuterProps, JSSProps<typeof withThemeStyles> {}

const ItemByHOC: FC<Props> = ({ classes, withTheming }) => (
  <div className={classes.container}>HOC{withTheming && ' (with theme)'}</div>
)

const HOC: FC<Props> = props => {
  const styles = props.withTheming ? withThemeStyles : withoutThemeStyles
  const WrappedComponent = props.isCustomHOC
    ? customWithStyles(styles)(ItemByHOC)
    : withStyles(styles)(ItemByHOC)
  // @ts-ignore
  WrappedComponent.displayName = 'SwitcherHOC'

  return <WrappedComponent {...props} />
}

export default hot<(props: OuterProps) => JSX.Element>(HOC)
