import { NyanCSSComponent, NyanCSSMap } from '@nyancss/types'
import { getClassName } from '@nyancss/utils/stringify'
import {
  NyanCSSVueAttrs,
  NyanCSSVueComponent,
  NyanCSSVueContext,
  NyanCSSVueCreateElement,
  NyanCSSVueExports
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
      const className = getClassName(
        component,
        context.props,
        context.props.class
      )
      const attrs: NyanCSSVueAttrs = Object.assign(
        { class: className },
        context.props.attrs || {}
      )
      return createElement(tag, { attrs }, context.children)
    }
  }
}
