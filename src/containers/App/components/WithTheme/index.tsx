import React, { FC } from 'react'
import { hot } from 'react-hot-loader/root'
import { ThemeProvider } from 'react-jss'

import Content from '../Content'
import { theme } from '../../'

export interface OuterProps {}
interface Props extends OuterProps {}

const WithTheme: FC<Props> = () => (
  <ThemeProvider theme={theme}>
    <Content />
  </ThemeProvider>
)

export default hot(WithTheme)
