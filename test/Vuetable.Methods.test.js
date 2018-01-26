import Vue from 'vue'
import { mount, shallow } from '@vue/test-utils'
import Vuetable from '@/components/Vuetable.vue'

describe('Vuetable - Methods', () => {

  beforeAll( () => {
    global.console.warn = jest.fn( msg => {
      return msg
    })
  })

  afterAll( () => {
    global.console.warn.mockReset()
    global.console.warn.mockRestore()
  })

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

  describe('checkIfRowIdentifierExists', () => {

    const mountVuetable = (trackBy = 'id') => shallow(Vuetable, {
      propsData: {
        apiMode: false,
        fields: ['code'],
        data: [{ code: 'AAA'}],
        trackBy
      }
    })

    it('gives warning when row identifier is invalid', () => {
      let wrapper = mountVuetable()

      expect(wrapper.vm.checkIfRowIdentifierExists()).toBe(false)
      expect(console.warn).toHaveBeenCalledTimes(2)
    })

    it('returns true when row identifier is valid', (done) => {
      let wrapper = mountVuetable('code')

      expect(wrapper.vm.trackBy).toEqual('code')

      Vue.config.errorHandler = done
      Vue.nextTick( () => {
          expect(wrapper.vm.checkIfRowIdentifierExists()).toBe(true)
          done()
      })
    })
  })

  describe('fireEvent', () => {

    it('emits given event with prefix', () => {
      let wrapper = shallowVuetable(['code'])

      wrapper.vm.fireEvent('dummy', 'abcd')
      expect(wrapper.emitted()['vuetable:dummy']).toEqual([['abcd']])
    })

  })

  describe('setData', () => {

    it('emits loading and loaded events', () => {
      let wrapper = shallowVuetable(['code'])
      wrapper.vm.setData([{code: 'AAA'}])

      let emitted = wrapper.emitted()
      expect(emitted).toHaveProperty('vuetable:loading')
      expect(emitted).toHaveProperty('vuetable:loaded')
    })
  })
})