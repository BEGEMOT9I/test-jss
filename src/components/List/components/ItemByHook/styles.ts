import { createUseStyles } from 'react-jss'

import { Theme } from 'containers/App'

const styles = {
  container: {
    margin: '0.125rem',
    padding: '0.5rem',
    fontSize: '0.75rem',
    color: '#fff',
    backgroundColor: 'green',
    borderRadius: '0.25rem'
  }
}
const useWithoutThemeStyles = createUseStyles(styles)
const useWithThemeStyles = createUseStyles((theme: Theme) => ({
  ...styles,
  container: {
    ...styles.container,
    backgroundColor: theme.hookColor
  }
}))

export { useWithoutThemeStyles, useWithThemeStyles }
