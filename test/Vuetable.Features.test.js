import Vue from 'vue'
import { mount, shallow } from '@vue/test-utils'
import Vuetable from '@/components/Vuetable.vue'

describe('Vuetable - Features', () => {

  const mountVuetable = (fields) => mount(Vuetable, {
    propsData: {
      loadOnStart: false,
      fields
    }
  })

  /**
   * title
   */
  it('should render HTML in title', () => {
    let wrapper = mountVuetable([
      { name: 'code', title: 'Hi, <strong>there</strong>' }
    ])

    expect(wrapper.find('thead tr th.vuetable-th-code').element.innerHTML)
      .toEqual('Hi, <strong>there</strong>')
  })

  it('should call the function to get title value if title is a Function', () => {
    let myFunc = () => {
      return 'My Title'
    }

    let wrapper = mountVuetable([
      { name: 'code', title: myFunc }
    ])

    expect(typeof(wrapper.vm.tableFields[0].title)).toEqual('function')
    expect(wrapper.vm.tableFields[0].title).toBe(myFunc)
    expect(wrapper.find('thead tr th.vuetable-th-code').element.innerHTML)
      .toEqual('My Title')
  })

  it('should replace "." with a space if title has not been set and name has "." in it', () => {
    let wrapper = mountVuetable(['code.line'])

    expect(wrapper.find('thead tr th.vuetable-th-code_line').element.innerHTML)
      .toEqual('Code Line')
  })
})