import { createUseStyles } from 'react-jss'

export default createUseStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  item: {
    width: '1rem',
    height: '1rem',
    borderRadius: '0.125rem',
    overflow: 'hidden'
  }
})
