import { mount, shallow } from 'vue-test-utils'
import Vuetable from '../../src/components/Vuetable.vue'

describe('Vuetable', () => {
  // let cmp

  // beforeEach( () => {
  //   cmp = shallow(Vuetable)
  // })

  describe('Properties', () => {

    describe('fields definition', () => {
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
          }
        })

        expect(cmp.vm.tableFields).toEqual(expectedResult)
      })

      it('should parse array of object of fields definition correctly', () => {
        let cmp = mount(Vuetable, {
          propsData: {
            fields: [
              { name: 'code' },
              { name: 'description' }
            ]
          }
        })

        expect(cmp.vm.tableFields).toEqual(expectedResult)
      })

      it('should set default field title to capitalized name', () => {
        let cmp = mount(Vuetable, {
          propsData: {
            fields: ['code'],
          }
        })

        expect(cmp.vm.tableFields[0].title).toEqual('Code')
      })

      it('should correctly override field title when specified', () => {
        let columns = [
          {
            name: 'code',
            title: 'My Title'
          },
        ]
        let cmp = mount(Vuetable, {
          propsData: {
            fields: columns,
          }
        })

        expect(cmp.vm.tableFields[0].title).toEqual('My Title')
      })

      it('should use the given titleClass to render field title', () => {
        let cmp = mount(Vuetable, {
          attachToDocument: true,
          propsData: {
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
        })
      })

      it('should use the given dataClass to render field data', () => {
        let cmp = mount(Vuetable, {
          attachToDocument: true,
          propsData: {
            fields: [
              {
                name: 'code',
                dataClass: 'foo-baz'
              }
            ],
            // simulate data mode to allow passing data in for testing
            apiMode: false,
            data: [
              { code: 'MYCODE' }
            ]
          }
        })

        expect(cmp.vm.tableFields[0].dataClass).toEqual('foo-baz')
        cmp.vm.$nextTick( () => {
          let nodes = cmp.vm.$el.querySelectorAll('table tbody tr td')
          console.log(cmp.html(), nodes)
          expect(nodes[0].classList.contains('foo-baz')).toEqual(true)
        })
      })

    })

  })

})
