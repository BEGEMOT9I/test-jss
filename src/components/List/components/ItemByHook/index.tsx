import React, { FC } from 'react'
import { hot } from 'react-hot-loader/root'

import { useWithThemeStyles, useWithoutThemeStyles } from './styles'

interface OuterProps {
  withTheming: boolean
}
interface Props extends OuterProps {}

const ItemByHook: FC<Props> = ({ withTheming }) => {
  const classesWithTheme = useWithThemeStyles()
  const classesWithoutTheme = useWithoutThemeStyles()
  const classes = withTheming ? classesWithTheme : classesWithoutTheme

  return <div className={classes.container}>Hook{withTheming && ' (with theme)'}</div>
}

export default hot(ItemByHook)
