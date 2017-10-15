import Vue from 'vue'
import { mount } from 'vue-test-utils'
import Vuetable from '@/components/Vuetable.vue'

Vue.config.productionTip = false

describe('Vuetable - Methods', () => {

  describe('normalizeFields', () => {
    let cmp

    beforeEach( () => {
      cmp = mount(Vuetable, {
        propsData: {
          fields: ['code'],
          apiMode: false
        }
      })
    })

    it('parses basic array of fields definition correctly', () => {
      expect(cmp.vm.tableFields.length).toEqual(1)
      expect(cmp.vm.tableFields[0]).toEqual({
        name: 'code',
        title: 'Code',
        titleClass: '',
        dataClass: '',
        sortField: null,
        callback: null,
        visible: true,
      })
    })

  })

  describe('setTitle', () => {
    let cmp

    beforeEach( () => {
      cmp = mount(Vuetable, {
        propsData: {
          fields: ['code'],
          apiMode: false
        }
      })
    })

    it('should capitalize the first character of a given string', () => {
      expect(cmp.vm.setTitle('hello world')).toEqual('Hello World')
      expect(cmp.vm.setTitle('hello_world')).toEqual('Hello_world')
    })

    it('should return empty string if the given string starts with "__"', () => {
      expect(cmp.vm.setTitle('__handle')).toEqual('')
    })
  })

  describe('getTitle', () => {
    let cmp

    beforeEach( () => {
      cmp = mount(Vuetable, {
        propsData: {
          fields: [
            { name: 'code', title: () => 'ABCD' },
            { name: 'description', title: 'Foo'},
            'dummy',
            'address.line1'
          ],
          apiMode: false
        }
      })
    })

    it('should call the given function if field.title is of type "function"', () => {
      expect(cmp.vm.getTitle(cmp.vm.tableFields[0])).toEqual('ABCD')
    })

    it('should return the given title if it is defined', () => {
      expect(cmp.vm.getTitle(cmp.vm.tableFields[1])).toEqual('Foo')
    })

    it('should return capitalized field name if the title is not defined', () => {
      expect(cmp.vm.getTitle(cmp.vm.tableFields[2])).toEqual('Dummy')
    })

    it('should return field name without a dot (.) if title is not defined', () => {
      expect(cmp.vm.getTitle(cmp.vm.tableFields[3])).toEqual('Address Line1')
    })
  })

  describe('isSpecialField', () => {
    let cmp

    beforeEach( () => {
      cmp = mount(Vuetable, {
        propsData: {
          fields: [
            '__handle',
            'dummy',
          ],
          apiMode: false
        }
      })
    })

    it('should return true when the given name begins with __', () => {
      expect(cmp.vm.isSpecialField(cmp.vm.tableFields[0].name)).toBe(true)
    })

    it('should return false when the given name does not starts with __', () => {
      expect(cmp.vm.isSpecialField(cmp.vm.tableFields[1].name)).toBe(false)
    })
  })

  describe('titleCase', () => {
    let cmp

    beforeEach( () => {
      cmp = mount(Vuetable, {
        propsData: {
          fields: ['code'],
          apiMode: false
        }
      })
    })

    it('should return capitalized words', () => {
      expect(cmp.vm.titleCase('hello')).toEqual('Hello')
      expect(cmp.vm.titleCase('hello world')).toEqual('Hello World')
      expect(cmp.vm.titleCase('hello_world')).toEqual('Hello_world')
      expect(cmp.vm.titleCase('hello.world')).toEqual('Hello.World')
    })
  })
})
