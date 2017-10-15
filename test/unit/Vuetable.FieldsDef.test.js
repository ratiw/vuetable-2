import Vue from 'vue'
import { mount } from 'vue-test-utils'
import Vuetable from '@/components/Vuetable.vue'

Vue.config.productionTip = false

describe('Vuetable - Fields Definition', () => {
    // In order to test fields definition, we have to prevent Vuetable
    // from loading the data; otherwise, Vuetable will attempt to call
    // the API URL and result in error due to unresolved Promise.
    // By setting "loadOnStart = false" will prevent Vuetable from
    // calling loadData.
    let expectedResult = [
        {
          name: 'code',
          title: 'Code',
          titleClass: '',
          dataClass: '',
          sortField: null,
          callback: null,
          visible: true
        },
        {
          name: 'description',
          title: 'Description',
          titleClass: '',
          dataClass: '',
          sortField: null,
          callback: null,
          visible: true
        }
      ]

    it('should parse basic array of fields definition correctly', () => {
      let cmp = mount(Vuetable, {
        propsData: {
          fields: ['code', 'description'],
          loadOnStart: false,
        }
      })

      expect(cmp.vm.tableFields).toEqual(expectedResult)
    })

    it('should parse array of object of fields definition correctly', () => {
      let cmp = mount(Vuetable, {
        propsData: {
          loadOnStart: false,
          fields: [
            { name: 'code' },
            { name: 'description' }
          ]
        }
      })

      expect(cmp.vm.tableFields).toEqual(expectedResult)
    })

    // title
    it('should set default field title to capitalized name', () => {
      let cmp = mount(Vuetable, {
        propsData: {
          loadOnStart: false,
          fields: ['code'],
        }
      })

      expect(cmp.vm.tableFields[0].title).toEqual('Code')
    })

    // title
    it('should correctly override field title when specified value', () => {
      let columns = [
        {
          name: 'code',
          title: 'My Title'
        },
      ]
      let cmp = mount(Vuetable, {
        propsData: {
          loadOnStart: false,
          fields: columns,
        }
      })

      expect(cmp.vm.tableFields[0].title).toEqual('My Title')
    })

    // titleClass
    it('should use the given titleClass to render field title', (done) => {
      let cmp = mount(Vuetable, {
        propsData: {
          loadOnStart: false,
          fields: [
            {
              name: 'code',
              titleClass: 'foo-bar'
            }
          ],
        }
      })
      expect(cmp.vm.tableFields[0].titleClass).toEqual('foo-bar')
      cmp.vm.$nextTick( () => {
        let nodes = cmp.vm.$el.querySelectorAll('table thead tr th')
        expect(nodes[0].attributes.id.value).toEqual('_code')
        expect(nodes[0].classList.contains('foo-bar')).toEqual(true)
        expect(nodes[0].classList.contains('vuetable-th-code')).toEqual(true)
        done()
      })
    })

    // dataClass
    it('should use the given dataClass to render field data', (done) => {
      let cmp = mount(Vuetable, {
        // attachToDocument: true,
        propsData: {
          // simulate data mode to allow passing data in for testing
          apiMode: false,
          fields: [
            {
              name: 'code',
              dataClass: 'foo-baz'
            }
          ],
          // data: [
          //   { code: 'MYCODE' }
          // ]
        }
      })

      expect(cmp.vm.tableFields[0].dataClass).toEqual('foo-baz')
      cmp.vm.setData([{code: 'MYCODE'}])
      cmp.vm.$nextTick( () => {
        let nodes = cmp.vm.$el.querySelectorAll('table tbody tr td')
        console.log('%%%%%%% ', cmp.html(), nodes)
        expect(nodes[0].classList.contains('foo-baz')).toEqual(true)
        done()
      })
    })

    // sortField - given
    it('should set sortField to the given value if specified', () => {
      let cmp = mount(Vuetable, {
        propsData: {
          loadOnStart: false,
          fields: [
            { name: 'code', sortField: 'aaa' }
          ]
        }
      })

      expect(cmp.vm.tableFields[0].sortField).toEqual('aaa')
    })

    // visible
    it('should set visible to the given value when specified', () => {
      let cmp = mount(Vuetable, {
        propsData: {
          loadOnStart: false,
          fields: [
            { name: 'code', visible: false }
          ]
        }
      })

      expect(cmp.vm.tableFields[0].visible).toEqual(false)
    })

    // define callback
    it('should set callback to the given value when specified', () => {
      let cmp = mount(Vuetable, {
        propsData: {
          loadOnStart: false,
          fields: [
            { name: 'code', callback: 'myCallback' }
          ]
        }
      })

      expect(cmp.vm.tableFields[0].callback).toEqual('myCallback')
    })

    // callback as a Function
    it('should call the callback function to format the column value', (done) => {
      let myCallback = (value) => {
        return value.toUpperCase()
      }
      let cmp = mount(Vuetable, {
        propsData: {
          fields: [
            {
              name: 'code',
              callback: myCallback
            }
          ],
          // simulate data mode to allow passing data in for testing
          apiMode: false,
          // data: [
          //   { code: 'mycode' }
          // ]
        }
      })

      expect(cmp.vm.tableFields[0].callback).toEqual(myCallback)
      cmp.vm.setData([{code: 'mycode'}])
      cmp.vm.$nextTick( () => {
        let nodes = cmp.vm.$el.querySelectorAll('table tbody tr td')
        expect(nodes[0].textContent).toEqual('MYCODE')
        done()
      })
    })

    // callback not found in parent
    it('should return null if the specified callback name does not exist in the parent', (done) => {
      const vm = new Vue({
        template: `<vuetable ref="vuetable" :fields="columns" :api-mode="false"></vuetable>`,
        components: { Vuetable },
        data: {
          columns: [
            {
              name: 'code',
              callback: 'callbackInParent'
            }
          ],
          // data: [
          //   { code: 'mycode' }
          // ]
        },
      }).$mount()

      let cmp = vm.$refs.vuetable
      expect(cmp.tableFields[0].callback).toEqual('callbackInParent')
      cmp.vm.setData([{code: 'mycode'}])
      vm.$nextTick( () => {
        let nodes = cmp.$el.querySelectorAll('table tbody tr td')
        expect(nodes[0].textContent).toEqual('null')
        done()
      })
    })

    // callback as a method in parent
    it('should call the callback in the parent instance if specified and available', (done) => {
      const vm = new Vue({
        template: `<vuetable ref="vuetable" :fields="columns" :api-mode="false"></vuetable>`,
        components: { Vuetable },
        data: {
          columns: [
            {
              name: 'code',
              callback: 'callbackInParent'
            }
          ],
          // data: [
          //   { code: 'mycode' }
          // ]
        },
        methods: {
          callbackInParent (value) {
            return value.toUpperCase()
          }
        }
      }).$mount()

      let cmp = vm.$refs.vuetable
      expect(cmp.tableFields[0].callback).toEqual('callbackInParent')
      cmp.vm.setData([{code: 'mycode'}])
      vm.$nextTick( () => {
        let nodes = cmp.$el.querySelectorAll('table tbody tr td')
        expect(nodes[0].textContent).toEqual('MYCODE')
        done()
      })
    })

    // callback with additional param
    it('should call the callback in the parent instance with additional param if specified', (done) => {
      const vm = new Vue({
        template: `<vuetable ref="vuetable" :fields="columns" :api-mode="false"></vuetable>`,
        components: { Vuetable },
        data: {
          columns: [
            {
              name: 'code',
              callback: 'callbackInParent|1234'
            }
          ],
          // data: [
          //   { code: 'mycode' }
          // ]
        },
        methods: {
          callbackInParent (value, param) {
            return value.toUpperCase()+param
          }
        }
      }).$mount()

      let cmp = vm.$refs.vuetable
      expect(cmp.tableFields[0].callback).toEqual('callbackInParent|1234')
      cmp.vm.setData([{code: 'mycode'}])
      vm.$nextTick( () => {
        let nodes = cmp.$el.querySelectorAll('table tbody tr td')
        expect(nodes[0].textContent).toEqual('MYCODE1234')
        done()
      })
    })
})
