import React, { ComponentType } from 'react'
import { StyleSheetFactoryOptions, Styles, Classes, Jss } from 'jss'
import { createUseStyles } from 'react-jss'
import { Theming } from 'theming'

type JSSClasses<S> = S extends (theme: any) => Styles<string>
  ? Classes<keyof ReturnType<S>>
  : Classes<string>
interface WithStylesOptions extends StyleSheetFactoryOptions {
  index?: number
  injectTheme?: boolean
  jss?: Jss
  theming?: Theming<object>
}
type WithStylesHOC = <
  ClassNames extends string | number | symbol,
  S extends Styles<ClassNames> | ((theme: any) => Styles<ClassNames>)
>(
  styles: S,
  options?: WithStylesOptions
) => <
  Props extends {
    classes: JSSClasses<S>
  }
>(
  component: ComponentType<Props>
) => (props: Props) => JSX.Element
export interface JSSProps<S> {
  classes: JSSClasses<S>
}

const withStylesHOC: WithStylesHOC = (styles, options) => {
  // @ts-ignore
  const useStyles = createUseStyles(styles, options)

  return WrappedComponent => props => {
    const classes = useStyles(props)

    return <WrappedComponent {...props} classes={classes} />
  }
}

export default withStylesHOC
