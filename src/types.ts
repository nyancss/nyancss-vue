export type NyanCSSVueProps = {
  [prop: string]: any
}

export type NyanCSSVueAttrs = {
  [attr: string]: string
}

export type NyanCSSVueElementProps = {
  attrs: NyanCSSVueAttrs
}

export type NyanCSSVueCreateElement<Element> = (
  tag: string,
  props: NyanCSSVueElementProps,
  children: any
) => Element

export type NyanCSSVueContext = {
  props: NyanCSSVueProps
  children: any
}

export type NyanCSSVueComponent = {
  functional: true
  props: string[]
  render<Element>(
    h: NyanCSSVueCreateElement<Element>,
    context: NyanCSSVueContext
  ): Element
}

export type NyanCSSVueExports = {
  [componentName: string]: NyanCSSVueComponent
}
