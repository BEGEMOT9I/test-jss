import React, { FC } from 'react'
import { hot } from 'react-hot-loader/root'

import List from 'components/List'

export interface OuterProps {}
interface Props extends OuterProps {}

const App: FC<Props> = () => (
  <div>
    <List />
  </div>
)

export default hot(App)
