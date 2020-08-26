import React, { useMemo, FC, ForwardRefExoticComponent, ComponentType } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { StyleSheetFactoryOptions, Styles, Classes, Jss } from 'jss'
import { createUseStyles, JssContext } from 'react-jss'
import { Theming, ThemeContext as DefaultThemeContext } from 'theming'

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
) => (component?: ComponentType<any>) => ForwardRefExoticComponent<any>
type HOCProps<Theme, Props> = Props & {
  theme: Theme
  jssContext: any
  innerRef: any
}
export interface JSSProps<S> {
  classes: JSSClasses<S>
}

function mergeClasses(baseClasses: Classes, additionalClasses: Classes) {
  const combinedClasses = { ...baseClasses }

  for (const name in additionalClasses) {
    combinedClasses[name] =
      name in combinedClasses
        ? `${combinedClasses[name]} ${additionalClasses[name]}`
        : additionalClasses[name]
  }

  return combinedClasses
}

const getDisplayName = (Component: ComponentType<{}>) =>
  Component.displayName || Component.name || 'Component'

const NoRenderer: FC<any & { children?: JSX.Element }> = props => props.children || null

const withStylesHOC: WithStylesHOC = (styles, options = {}) => {
  const { injectTheme = false, theming, ...restOptions } = options
  const ThemeContext = (theming && theming.context) || DefaultThemeContext

  return (InnerComponent = NoRenderer) => {
    const displayName = getDisplayName(InnerComponent)
    // @ts-ignore
    const useStyles = createUseStyles(styles, {
      ...restOptions,
      name: name || displayName,
      theming
    })

    const WithStyles: ForwardRefExoticComponent<HOCProps<any, any>> = React.forwardRef(
      ({ classes: propClasses, theme: propTheme, ...restProps }, ref) => {
        const contextTheme = React.useContext(ThemeContext)
        const theme = propTheme || contextTheme
        const generatedClasses = useStyles({ theme, ...restProps })
        const classes = React.useMemo(
          () => (propClasses ? mergeClasses(generatedClasses, propClasses) : generatedClasses),
          [propClasses, generatedClasses]
        )

        const props = { ref, classes, ...restProps }

        if (injectTheme) {
          props.theme = theme
        }

        return <InnerComponent {...props} />
      }
    )

    WithStyles.defaultProps = { ...InnerComponent.defaultProps }
    WithStyles.displayName = `WithStyles(${displayName})`
    // @ts-ignore
    WithStyles.InnerComponent = InnerComponent

    return WithStyles
  }
}

export default withStylesHOC
