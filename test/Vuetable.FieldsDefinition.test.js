import Vue from 'vue'
import { shallow, mount } from '@vue/test-utils'
import Vuetable from '@/components/Vuetable.vue'
import SampleComponent from '@/components/VuetableFieldHandle.vue'

describe('Vuetable - Fields Definition', () => {

  beforeAll( () => {
    global.console.error = jest.fn( msg => {
      return msg
    })
    global.console.warn = jest.fn( msg => {
      return msg
    })
  })
  
  afterAll( () => {
    global.console.error.mockReset()
    global.console.error.mockRestore()
    global.console.warn.mockReset()
    global.console.warn.mockRestore()
  })
  
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
      $_index: 0
    },
    {
      name: 'description',
      title: 'Description',
      titleClass: '',
      dataClass: '',
      sortField: null,
      formatter: null,
      visible: true,
      width: null,
      $_index: 1
    }
  ]

  const shallowVuetable = (fields) => shallow(Vuetable, {
    propsData: {
      loadOnStart: false,
      fields
    }
  })

  // Setting `loadOnStart` to `false` will prevent Vuetable from
  // loading data from API endpoint, so we can test for functionalities
  // that do not relate to AJAX request
  it('should parse basic array correctly', () => {
    let wrapper = shallowVuetable(['code', 'description'])

    expect(wrapper.vm.tableFields).toEqual(expectedResult)
  })

  it('should parse array of object correctly', () => {
    let wrapper = shallowVuetable([
      { name: 'code' },
      { name: 'description' }
    ])

    expect(wrapper.vm.tableFields).toEqual(expectedResult)
  })

  it('should parse mix declaration of string and object correctly', () => {
    let wrapper = shallowVuetable([
      'code',
      { name: 'description' }
    ])

    expect(wrapper.vm.tableFields).toEqual(expectedResult)
  })

  it('should accept (VueComponent) Object in "name" option', () => {
    let wrapper = shallowVuetable([
      { name: SampleComponent }
    ])

    expect(wrapper.vm.tableFields[0].name instanceof Object).toBe(true)
  })

  /**
   *  title option 
   */
  it('should set field title to capitalized field name if title is not provided', () => {
    let wrapper = shallowVuetable(['full name'])

    expect(wrapper.vm.tableFields[0].title).toEqual('Full Name')
  })

  it('should override field title with given value', () => {
    let wrapper = shallowVuetable([
      { name: 'code', title: 'My Title' }
    ])

    expect(wrapper.vm.tableFields[0].title).toEqual('My Title')
  })

  /** 
   * titleClass option
   */
  it('should use the given titleClass to render field title', () => {
    let wrapper = mount(Vuetable, {
      propsData: {
        apiMode: false,
        fields: [
          { name: 'code', titleClass: 'foo-bar' }
        ]
      }
    })

    expect(wrapper.vm.tableFields[0].titleClass).toEqual('foo-bar')

    let el = wrapper.findAll('th').at(0)
    expect(el.attributes().id).toEqual('_code')
    expect(el.classes()).toContain('foo-bar')
    expect(el.classes()).toContain('vuetable-th-code')
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

    Vue.config.errorHandler = done
    Vue.nextTick( () => {
      let el = wrapper.findAll('tbody tr td').at(0)
      expect(el.classes()).toContain('vuetable-td-code')
      expect(el.classes()).toContain('foo-baz')
      done()
    })
  })

  /**
   * sortField option - given
   */
  it('should set sortField to the given value when specified', () => {
    let wrapper = shallowVuetable([
      { name: 'code', sortField: 'aaa' }
    ])

    expect(wrapper.vm.tableFields[0].sortField).toEqual('aaa')
  })

  /**
   * visible option
   */
  it('should set visible to the given value when specified', () => {
    let wrapper = shallowVuetable([
      { name: 'code', visible: false }
    ])

    expect(wrapper.vm.tableFields[0].visible).toEqual(false)
  })

  /**
   * formatter option
   */
  it('should give warning when the formatter is not a function', () => {
    let wrapper = shallowVuetable([
      { name: 'code', formatter: 'myFormatter' }
    ])
    
    expect(wrapper.vm.tableFields[0].formatter).toBe(null)
    expect(console.error).toBeCalledWith('code field formatter must be a function')
  })

  it('should call the formatter function to format the column value', (done) => {
    let myFormatter = (value) => {
      return value.toUpperCase()
    }

    let wrapper = shallow(Vuetable, {
      propsData: {
        apiMode: false,
        fields: [
          { name: 'code', formatter: myFormatter }
        ],
        data: [
          { code: 'mycode' }
        ]
      }
    })

    expect(wrapper.vm.tableFields[0].formatter).toEqual(myFormatter)
    
    Vue.config.errorHandler = done
    Vue.nextTick( () => {
      expect(wrapper.find('tbody tr td.vuetable-td-code').text()).toBe('MYCODE')
      done()
    })
  })

  /**
   * width option
   */
  it('should set width to the given value when specified', () => {
    let wrapper = shallowVuetable([
      { name: 'code', width: '100px' }
    ])
    
    expect(wrapper.vm.tableFields[0].width).toEqual('100px')
  })
})