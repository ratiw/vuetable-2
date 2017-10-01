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
        let cmp = mount(Vuetable, {
          propsData: {
            fields: [
              {
                name: 'code',
                title: 'My Title'
              }
            ],
          }
        })

        expect(cmp.vm.tableFields[0].title).toEqual('My Title')
      })

      it('should use the given titleClass to render field title', () => {
        let cmp = mount(Vuetable, {
          propsData: {
            fields: [
              {
                name: 'code',
                titleClass: 'foo-bar'
              }
            ],
          }
        })
        console.log(cmp.html())
        expect(cmp.vm.tableFields[0].titleClass).toEqual('foo-bar')
        let nodes = cmp.vm.$el.querySelectorAll('table thead tr th')
        // expect(nodes[0].attributes.id.value).toEqual('_code')
      })
    })

  })

})
