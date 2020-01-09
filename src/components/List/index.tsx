import React, { FC } from 'react'
import { hot } from 'react-hot-loader/root'

import useStyles from './styles'

interface OuterProps {}
interface Props extends OuterProps {}

const items = [...new Array(1000)]

const List: FC<Props> = () => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      {items.map((_, index) => (
        <div key={index} className={classes.item} />
      ))}
    </div>
  )
}

export default hot(List)
