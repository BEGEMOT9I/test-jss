import React, { FC, useState, useCallback, InputHTMLAttributes } from 'react'
import { hot } from 'react-hot-loader/root'

import Toggler from 'components/Toggler'
import List from 'components/List'

export interface OuterProps {}
interface Props extends OuterProps {}

const App: FC<Props> = () => {
  const [renderState, setRenderState] = useState<{
    isRenderByHook: boolean
    isRenderByHOC: boolean
  }>({
    isRenderByHOC: false,
    isRenderByHook: true
  })
  const [isCustomHOC, setIsCustomHOC] = useState(false)
  const { isRenderByHook, isRenderByHOC } = renderState
  const onChangeHookState = useCallback<InputHTMLAttributes<HTMLInputElement>['onChange']>(
    event => {
      event.persist()
      setRenderState(prevState => ({ ...prevState, isRenderByHook: event.target.checked }))
    },
    []
  )
  const onChangeHOCState = useCallback<InputHTMLAttributes<HTMLInputElement>['onChange']>(event => {
    event.persist()
    setRenderState(prevState => ({ ...prevState, isRenderByHOC: event.target.checked }))
  }, [])
  const onChangeHookAndHOCState = useCallback<InputHTMLAttributes<HTMLInputElement>['onChange']>(
    event => {
      event.persist()

      const { checked } = event.target

      setRenderState({ isRenderByHOC: checked, isRenderByHook: checked })
    },
    []
  )
  const onChangeHOCType = useCallback<InputHTMLAttributes<HTMLInputElement>['onChange']>(event => {
    event.persist()

    setIsCustomHOC(event.target.checked)
  }, [])

  return (
    <div>
      <Toggler
        id="by-hook"
        checked={isRenderByHook}
        text="Elements, created by hook"
        onChange={onChangeHookState}
      />
      <Toggler
        id="by-HOC"
        checked={isRenderByHOC}
        text="Elements, created by HOC"
        onChange={onChangeHOCState}
      />
      <Toggler
        id="by-hook-and-HOC"
        checked={isRenderByHOC && isRenderByHook}
        text="Elements, created by hook and HOC"
        onChange={onChangeHookAndHOCState}
      />
      <br />
      <Toggler
        id="is-custom-HOC"
        checked={isCustomHOC}
        text="Custom HOC (with HMR supporting and based on hook)"
        onChange={onChangeHOCType}
      />
      <List {...renderState} isCustomHOC={isCustomHOC} />
    </div>
  )
}

export default hot(App)
