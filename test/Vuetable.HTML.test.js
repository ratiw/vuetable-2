import Vue from 'vue'
import { mount, shallow } from '@vue/test-utils'
import Vuetable from '@/components/Vuetable.vue'

describe('Vuetable - HTML structure', () => {

  const mountVuetable = (fields) => mount(Vuetable, {
    propsData: {
      loadOnStart: false,
      fields
    }
  })

  it('renders HTML table', () => {
    let wrapper = mountVuetable([
      'code', 'description'
    ])

    expect(wrapper.element).toMatchSnapshot()
  })

})