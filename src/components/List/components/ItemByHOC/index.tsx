import React, { FC } from 'react'
import { hot } from 'react-hot-loader/root'
import withStyles from 'react-jss'

import { withStyles as customWithStyles, JSSProps } from 'utils/react-jss'
import styles from './styles'

interface OuterProps {
  isCustomHOC: boolean
}
interface Props extends OuterProps, JSSProps<typeof styles> {}

const ItemByHOC: FC<Props> = ({ classes }) => <div className={classes.container}>HOC</div>

const HOC: FC<Props> = props => {
  const WrappedComponent = props.isCustomHOC
    ? customWithStyles(styles)(ItemByHOC)
    : withStyles(styles)(ItemByHOC)

  return <WrappedComponent {...props} />
}

export default hot<(props: OuterProps) => JSX.Element>(HOC)
