import React, { FC } from 'react'
import { hot } from 'react-hot-loader/root'

import Content from '../Content'

export interface OuterProps {}
interface Props extends OuterProps {}

const WithoutTheme: FC<Props> = () => <Content />

export default hot(WithoutTheme)
