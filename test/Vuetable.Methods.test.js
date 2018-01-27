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

    it('emits loading and loaded events when argument is Array', () => {
      let wrapper = shallowVuetable(['code'])
      let data = [{code: 'AAA'}]
      wrapper.vm.setData(data)

      let emitted = wrapper.emitted()
      expect(emitted).toHaveProperty('vuetable:loading')
      expect(emitted).toHaveProperty('vuetable:loaded')
      expect(wrapper.vm.tableData).toBe(data)
    })
  })

  describe('getAllQueryParams', () => {

    const q1 = (sortOrder, currentPage, perPage) => {
      // return object
      return { sortOrder, currentPage, perPage }
    }

    const q2 = (sortOrder, currentPage, perPage) => {
      // return something else which is not an object
      return 'dummy'
    }

    const mountVuetable = (queryParams) => shallow(Vuetable, {
      propsData: {
        apiMode: false,
        fields: ['code'],
        queryParams
      }
    })

    it('calls `query-params` if it is a Function', () => {
      let wrapper = mountVuetable(q1)

      expect(wrapper.vm.getAllQueryParams()).toEqual({
        sortOrder: [], currentPage: 1, perPage: 10
      })
    })

    it('returns empty object if the given Function does not return an Object', () => {
      let wrapper = mountVuetable(q2)

      expect(wrapper.vm.getAllQueryParams()).toEqual({})
    })
  })

  describe('isSortable', () => {
    
    it('returns false if the given field did not define "sortField" option', () => {
      let wrapper = shallowVuetable(['code'])
      let field = wrapper.vm.tableFields[0]

      expect(wrapper.vm.isSortable(field)).toEqual(false)
    })

    it('returns true if the given field defined "sortField" option', () => {
      let wrapper = shallowVuetable([
        { name: 'code', sortField: 'code' }
      ])
      let field = wrapper.vm.tableFields[0]

      expect(wrapper.vm.isSortable(field)).toBe(true)
    })    
  })

  describe('getObjectValue', () => {
    let obj = { code: 'aaa' }
    let cmp = shallowVuetable(['code']).vm

    it('returns value inside the given object', () => {
      expect(
        cmp.getObjectValue(obj, 'code')
      ).toEqual('aaa')
    })

    it('returns null when given path does not exist and no default value is given', () => {
      expect(
        cmp.getObjectValue(obj, 'foo')
      ).toEqual(null)
    })

    it('returns default value when the given path does not exist and default value is given', () => {
      expect(
        cmp.getObjectValue(obj, 'foo', 'bar')
      ).toEqual('bar')
    })

    it('returns the object when an empty path is given without default value', () => {
      expect(
        cmp.getObjectValue(obj, '')
      ).toEqual(obj)
    })

    it('returns the object when an empty path is given eventhough the default value is given', () => {
      expect(
        cmp.getObjectValue(obj, '', 'foo')
      ).toEqual(obj)
    })

    it('returns null when given object is null and no default value is given', () => {
      expect(
        cmp.getObjectValue(null, 'foo')
      ).toEqual(null)

      expect(
        cmp.getObjectValue(null, '')
      ).toEqual(null)
    })

    it('returns default value when given object is null and default value is given', () => {
      expect(
        cmp.getObjectValue(null, 'foo', 'baz')
      ).toEqual('baz')
    })
  })
})