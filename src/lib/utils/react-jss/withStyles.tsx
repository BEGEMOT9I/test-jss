import React, { ComponentType } from 'react'
import { StyleSheetFactoryOptions, Styles, Classes } from 'jss'
import withStyles, { createUseStyles, useTheme } from 'react-jss'

type JSSClasses<S> = { [K in keyof S]: string }
interface WithStylesOptions extends StyleSheetFactoryOptions {
  name?: string
}
type WithStylesHOC = <ClassNames extends string | number | symbol, S extends Styles<ClassNames>>(
  styles: S,
  options?: WithStylesOptions
) => <
  Props extends {
    classes: S extends (theme: any) => Styles<ClassNames>
      ? Classes<keyof ReturnType<S>>
      : Classes<ClassNames>
  }
>(
  component: ComponentType<Props>
) => (props: Props) => JSX.Element
export interface JSSProps<S> {
  classes: JSSClasses<S>
}

const withStylesHOC: WithStylesHOC = (styles, options) => {
  const useStyles = createUseStyles(styles, options)

  return WrappedComponent => props => {
    // const theme = useTheme()
    const classes = useStyles(props)

    return <WrappedComponent {...props} classes={classes} />
  }
}

export default withStylesHOC
