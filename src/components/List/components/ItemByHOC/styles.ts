import { Theme } from 'containers/App'

const withoutThemeStyles = {
  container: {
    margin: '0.125rem',
    padding: '0.5rem',
    fontSize: '0.75rem',
    color: '#fff',
    backgroundColor: 'red',
    borderRadius: '0.25rem'
  }
}
const withThemeStyles = (theme: Theme) => ({
  ...withoutThemeStyles,
  container: {
    ...withoutThemeStyles.container,
    backgroundColor: theme.HOCColor
  }
})

export { withThemeStyles, withoutThemeStyles }
