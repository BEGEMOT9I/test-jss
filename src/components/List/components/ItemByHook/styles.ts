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
  },
  'media (max-width: 800px)': {
    container: {
      margin: '1.125rem'
    }
  }
}
const themedStyles = (theme: Theme) => ({
  ...styles,
  container: {
    ...styles.container,
    backgroundColor: theme.hookColor
  },
  [theme.breakpoint.xl]: {
    container: {
      margin: '1.125rem'
    }
  }
})
const useWithoutThemeStyles = createUseStyles(styles)
const useWithThemeStyles = createUseStyles(themedStyles)

export { useWithoutThemeStyles, useWithThemeStyles }
