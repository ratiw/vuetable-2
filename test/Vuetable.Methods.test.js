import Vue from 'vue'
import { mount, shallow } from '@vue/test-utils'
import Vuetable from '@/components/Vuetable.vue'

describe('Vuetable - Methods', () => {

  const mountVuetable = (fields) => mount(Vuetable, {
    propsData: {
      loadOnStart: false,
      fields
    }
  })

  const shallowVuetable = (fields) => shallow(Vuetable, {
    propsData: {
      loadOnStart: false,
      fields
    }
  })

  describe('normalizeFields', () => {

    it('copies additional options to fields definition as well', () => {
      let wrapper = shallowVuetable([
        { name: 'code', title: 'Product Code', options: {} },
        { name: 'description', foo: 'bar', baz: () => 'bee' }
      ])

      let fields = wrapper.vm.tableFields
      expect(fields.length).toEqual(2)
      expect(fields[0].name).toEqual('code')
      expect(fields[0].title).toEqual('Product Code')
      expect(typeof(fields[0].options)).toBe('object')

      expect(fields[1].name).toEqual('description')
      expect(fields[1].title).toEqual('Description')
      expect(fields[1].foo).toEqual('bar')
      expect(typeof(fields[1].baz)).toBe('function')
      expect(fields[1].baz()).toEqual('bee')
    })

  })
})