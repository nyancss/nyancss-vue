import generate from '.'
import { NyanCSSVueElementProps } from '../types'

const h = (tag: string, props: NyanCSSVueElementProps, children: any) => [
  tag,
  props,
  children
]

describe('generate', () => {
  it('generates simple components', () => {
    const { Component } = generate({
      Component: {
        componentName: 'Component',
        tag: undefined,
        className: 'component-class',
        props: {}
      }
    })
    expect(Component.props).toEqual(['tag', 'class', 'attrs'])
    const [tag, props, children] = Component.render(h, {
      props: {},
      children: 42
    })
    expect(tag).toBe('div')
    expect(props).toEqual({ attrs: { class: 'component-class' } })
    expect(children).toEqual(42)
  })

  it('generates components with bool props', () => {
    const { Component } = generate({
      Component: {
        componentName: 'Component',
        tag: undefined,
        className: 'component-class',
        props: {
          disabled: {
            type: 'boolean',
            propName: 'disabled',
            className: 'component-disabled'
          }
        }
      }
    })
    expect(Component.props).toEqual(['tag', 'class', 'attrs', 'disabled'])
    const defaultArgs = Component.render(h, { props: {}, children: 42 })
    expect(defaultArgs).toEqual([
      'div',
      { attrs: { class: 'component-class' } },
      42
    ])
    const disabledArgs = Component.render(h, {
      props: { disabled: true },
      children: 42
    })
    expect(disabledArgs).toEqual([
      'div',
      { attrs: { class: 'component-class component-disabled' } },
      42
    ])
  })

  it('generates components with enum props', () => {
    const { Component } = generate({
      Component: {
        componentName: 'Component',
        tag: undefined,
        className: 'component-class',
        props: {
          color: {
            type: 'enum',
            propName: 'color',
            values: ['red', 'green'],
            classNames: {
              red: 'component-red',
              green: 'component-green'
            }
          }
        }
      }
    })
    expect(Component.props).toEqual(['tag', 'class', 'attrs', 'color'])
    const defaultArgs = Component.render(h, { props: {}, children: 42 })
    expect(defaultArgs).toEqual([
      'div',
      { attrs: { class: 'component-class' } },
      42
    ])
    const redArgs = Component.render(h, {
      props: { color: 'red' },
      children: 42
    })
    expect(redArgs).toEqual([
      'div',
      { attrs: { class: 'component-class component-red' } },
      42
    ])
  })

  it('allows to override the tag using props', () => {
    const { Component } = generate({
      Component: {
        componentName: 'Component',
        tag: undefined,
        className: 'component-class',
        props: {}
      }
    })
    const args = Component.render(h, { props: { tag: 'span' }, children: 42 })
    expect(args).toEqual(['span', { attrs: { class: 'component-class' } }, 42])
  })

  it('allows to mix classes with custom `class` props', () => {
    const { Component } = generate({
      Component: {
        componentName: 'Component',
        tag: undefined,
        className: 'component-class',
        props: {}
      }
    })
    expect(Component.props).toEqual(['tag', 'class', 'attrs'])
    const [, props] = Component.render(h, {
      props: { class: 'original-class' },
      children: 42
    })
    expect(props).toEqual({
      attrs: { class: 'component-class original-class' }
    })
  })

  it('passes extra props to the tag element', () => {
    const { Component } = generate({
      Component: {
        componentName: 'Component',
        tag: undefined,
        className: 'component-class',
        props: {
          test: {
            type: 'boolean',
            propName: 'test',
            className: 'component-test'
          }
        }
      }
    })
    expect(Component.props).toEqual(['tag', 'class', 'attrs', 'test'])
    const args = Component.render(h, {
      props: { attrs: { a: 1, b: 2 } },
      children: 42
    })
    expect(args).toEqual([
      'div',
      { attrs: { class: 'component-class', a: 1, b: 2 } },
      42
    ])
  })
})
