import React, { FC, createContext, useState, useCallback, InputHTMLAttributes } from 'react'
import { hot } from 'react-hot-loader/root'
import { JssProvider, SheetsRegistry } from 'react-jss'

import { withStyles } from 'lib/utils/react-jss'

const createGenerateId = () => {
  let counter = 0
  return rule => `${rule.key}-${counter++}`
}

const TestInner = () => null

TestInner.defaultProps = { classes: { button: 'default-button' } }

const Test: FC<{}> = () => {
  const styles = {
    button: { color: 'red' }
  }
  const StyledComponent = withStyles(styles)()

  return (
    <JssProvider generateId={createGenerateId()}>
      <StyledComponent />
    </JssProvider>
  )
}

export default hot(Test)
