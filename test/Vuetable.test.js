import Vue from 'vue'
import { shallow } from '@vue/test-utils'
import Vuetable from '../src/components/Vuetable.vue'

describe('Vuetable - Fields Definition', () => {

  const expectedResult = [
    {
      name: 'code',
      title: 'Code',
      titleClass: '',
      dataClass: '',
      sortField: null,
      formatter: null,
      visible: true,
      width: null,
    },
    {
      name: 'description',
      title: 'Description',
      titleClass: '',
      dataClass: '',
      sortField: null,
      formatter: null,
      visible: true,
      width: null
    }
  ]

  // Setting `loadOnStart` to `false` will prevent Vuetable from
  // loading data from API endpoint, so we can test for functionalities
  // that do not relate to AJAX request
  it('should parse basic array correctly', () => {
    let wrapper = shallow(Vuetable, {
      propsData: {
        loadOnStart: false,
        fields: ['code', 'description'],
      }
    })

    expect(wrapper.vm.tableFields).toEqual(expectedResult)
  })

  it('should parse array of object correctly', () => {
    let wrapper = shallow(Vuetable, {
      propsData: {
        loadOnStart: false,
        fields: [
          { name: 'code' },
          { name: 'description' }
        ]
      }
    })

    expect(wrapper.vm.tableFields).toEqual(expectedResult)
  })

  it('should parse mix declaration of string and object correctly', () => {
    let wrapper = shallow(Vuetable, {
      propsData: {
        loadOnStart: false,
        fields: [
          'code',
          { name: 'description' }
        ]
      }
    })

    expect(wrapper.vm.tableFields).toEqual(expectedResult)
  })

  /**
   *  title option 
   */
  it('should set field title to capitalized field name if title is not provided', () => {
    let wrapper = shallow(Vuetable, {
      propsData: {
        loadOnStart: false,
        fields: ['full name']
      }
    })

    expect(wrapper.vm.tableFields[0].title).toEqual('Full Name')
  })

  it('should override field title with given value', () => {
    let wrapper = shallow(Vuetable, {
      propsData: {
        loadOnStart: false,
        fields: [
          {
            name: 'code',
            title: 'My Title'
          }
        ]
      }
    })

    expect(wrapper.vm.tableFields[0].title).toEqual('My Title')
  })

  /** 
   * titleClass option
   */
  it('should use the given titleClass to render field title', () => {
    let wrapper = shallow(Vuetable, {
      propsData: {
        loadOnStart: false,
        fields: [
          {
            name: 'code', 
            titleClass: 'foo-bar'
          }
        ]
      }
    })

    expect(wrapper.vm.tableFields[0].titleClass).toEqual('foo-bar')
    let nodes = wrapper.vm.$el.querySelectorAll('col')
    expect(nodes[0].attributes.id.value).toEqual('_col_code')
    expect(nodes[0].classList.contains('foo-bar')).toBe(true)
    expect(nodes[0].classList.contains('vuetable-th-code')).toBe(true)
  })

  /**
   * dataClass option
   * 
   * `apiMode` needs to be set to false to manually set the data for the test
   */
  it('should use the given dataClass to render field title', (done) => {
    let wrapper = shallow(Vuetable, {
      propsData: {
        apiMode: false,
        fields: [
          {
            name: 'code', 
            dataClass: 'foo-baz'
          }
        ],
        data: [
          { code: 'MYCODEDATA' }
        ]
      }
    })

    expect(wrapper.vm.tableFields[0].dataClass).toEqual('foo-baz')
    expect(wrapper.vm.tableData.length).toEqual(1)
    console.log(wrapper.vm.tableData)

    Vue.config.errorHandler = done
    Vue.nextTick( () => {
      let nodes = wrapper.vm.$el.querySelectorAll('tbody tr td')
      expect(nodes[0].classList.contains('vuetable-td-code')).toBe(true)
      expect(nodes[0].classList.contains('foo-baz')).toBe(true)
      done()
    })
  })

  /**
   * sortField option - given
   */
  it('should set sortField to the given value when specified', () => {
    let wrapper = shallow(Vuetable, {
      propsData: {
        loadOnStart: false,
        fields: [
          { name: 'code', sortField: 'aaa' }
        ]
      }
    })

    expect(wrapper.vm.tableFields[0].sortField).toEqual('aaa')
  })

  /**
   * visible option
   */
  it('should set visible to the given value when specified', () => {
    let wrapper = shallow(Vuetable, {
      propsData: {
        loadOnStart: false,
        fields: [
          { name: 'code', visible: false }
        ]
      }
    })

    expect(wrapper.vm.tableFields[0].visible).toEqual(false)
  })

  /**
   * formatter option
   */
  it('should give warning when the formatter is not a function', () => {
    let wrapper = shallow(Vuetable, {
      propsData: {
        loadOnStart: false,
        fields: [
          { name: 'code', formatter: 'myFormatter' }
        ]
      }
    })
    
  })
})