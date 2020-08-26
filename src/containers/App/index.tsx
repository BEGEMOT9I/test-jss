import React, { FC, createContext, useState, useCallback, InputHTMLAttributes } from 'react'
import { hot } from 'react-hot-loader/root'

import Test from '../Test'
import Toggler from 'components/Toggler'
import WithTheme from './components/WithTheme'
import WithoutTheme from './components/WithoutTheme'

export interface OuterProps {}
interface Props extends OuterProps {}

export const theme = {
  hookColor: 'green',
  HOCColor: 'red',
  breakpoint: {
    xl: 800
  }
}
export type Theme = typeof theme

const ThemeEnablingContext = createContext(true)

const App: FC<Props> = () => {
  const [withTheming, setWithTheming] = useState<boolean>(true)
  const onChange = useCallback<InputHTMLAttributes<HTMLInputElement>['onChange']>(event => {
    event.persist()
    setWithTheming(event.target.checked)
  }, [])

  return (
    <ThemeEnablingContext.Provider value={withTheming}>
      <div>
        <Toggler id="with-theme" checked={withTheming} text="With theme" onChange={onChange} />
        <br />
        {withTheming ? <WithTheme /> : <WithoutTheme />}
      </div>
    </ThemeEnablingContext.Provider>
  )
}

export { ThemeEnablingContext }
export default hot(App)
// export default hot(Test)
