import React, { ComponentType } from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App, { OuterProps as AppOuterProps } from 'containers/App'

const renderApp = ({ AppComponent }: { AppComponent: ComponentType<AppOuterProps> }) => {
  render(
    <AppContainer>
      <AppComponent />
    </AppContainer>,
    document.getElementById('root')
  )
}

function startupApp() {
  renderApp({
    AppComponent: App
  })
}

startupApp()
