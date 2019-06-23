import { NyanCSSComponent, NyanCSSMap, NyanCSSProp } from '@nyancss/types'
import {
  NyanCSSVueAttrs,
  NyanCSSVueComponent,
  NyanCSSVueContext,
  NyanCSSVueCreateElement,
  NyanCSSVueExports,
  NyanCSSVueProps
} from '../types'

export default function generate(map: NyanCSSMap) {
  return Object.keys(map).reduce(
    (acc, componentName) => {
      acc[componentName] = createComponent(map[componentName])
      return acc
    },
    {} as NyanCSSVueExports
  )
}

function createComponent(component: NyanCSSComponent): NyanCSSVueComponent {
  return {
    functional: true,
    props: ['tag', 'class', 'attrs'].concat(Object.keys(component.props)),
    render<Element>(
      createElement: NyanCSSVueCreateElement<Element>,
      context: NyanCSSVueContext
    ): Element {
      const tag = context.props.tag || 'div'
      const className = getClassName(component, context.props)
      const attrs: NyanCSSVueAttrs = Object.assign(
        { class: className },
        context.props.attrs || {}
      )
      return createElement(tag, { attrs }, context.children)
    }
  }
}

function getClassName(component: NyanCSSComponent, props: NyanCSSVueProps) {
  const componentPropsClassNames =
    props &&
    Object.keys(component.props).reduce(
      (acc, componentPropName) => {
        const componentProp = component.props[componentPropName]
        const propValue = props[componentPropName]
        return acc.concat(findModifierClassName(componentProp, propValue) || [])
      },
      [] as string[]
    )
  return classesToString(
    [props.class, component.className].concat(componentPropsClassNames)
  )
}

function findModifierClassName(componentProp: NyanCSSProp, propValue: any) {
  switch (componentProp.type) {
    case 'boolean':
      if (propValue) return componentProp.className
      break
    case 'enum':
      return componentProp.classNames[propValue]
  }
}

function classesToString(classes: Array<string | undefined>) {
  return classes
    .filter(c => !!c)
    .sort()
    .join(' ')
}
