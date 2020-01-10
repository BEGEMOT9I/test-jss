import React, { FC } from 'react'
import { hot } from 'react-hot-loader/root'

import useStyles from './styles'

interface OuterProps {}
interface Props extends OuterProps {}

const ItemByHook: FC<Props> = () => {
  const classes = useStyles()

  return <div className={classes.container}>Hook</div>
}

export default hot(ItemByHook)
