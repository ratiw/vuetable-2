import Vue from 'vue'
import { mount, shallow } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vuetable from '@/components/Vuetable.vue'

Vue.config.productionTip = false

describe('Vuetable - Special Fields - Basic HTML structure', () => {
  it('has same basic HTML structure', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Vuetable, {
      propsData: {
        fields: ['code', 'description'],
        loadOnStart: false
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('has same HTML structure for __sequence special field', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Vuetable, {
      propsData: {
        fields: ['__sequence', 'code'],
        apiMode: false,
        data: [
          { code: 'foo' }
        ]
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('has same HTML structure for __handle special field', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Vuetable, {
      propsData: {
        fields: ['__handle', 'code'],
        apiMode: false,
        data: [
          { code: 'foo' }
        ]
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('has same HTML structure for __checkbox special field', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Vuetable, {
      propsData: {
        fields: ['__checkbox', 'code'],
        apiMode: false,
        data: [
          { code: 'foo' }
        ]
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('has same HTML structure for __component special field', () => {
    Vue.component('sample-component', {
      template: `<div>Sample</div>`
    })
    const renderer = createRenderer()
    const wrapper = shallow(Vuetable, {
      propsData: {
        fields: ['__component:sample-component', 'code'],
        apiMode: false,
        data: [
          { code: 'foo' }
        ]
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

  it('has same HTML structure for __slot special fields', () => {
    const renderer = createRenderer()
    const wrapper = shallow(Vuetable, {
      propsData: {
        fields: ['__slot:sample-slot', 'code'],
        apiMode: false,
        data: [
          { code: 'foo' }
        ]
      },
      slots: {
        'sample-slot': `<div />`
      }
    })
    renderer.renderToString(wrapper.vm, (err, str) => {
      if (err) throw new Error(err)
      expect(str).toMatchSnapshot()
    })
  })

})
