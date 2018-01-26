import Vue from 'vue'
import { mount, shallow } from '@vue/test-utils'
import Vuetable from '@/components/Vuetable.vue'

describe('Vuetable - Computed properties', () => {

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

  it('countVisibleFields', () => {
    let wrapper = mountVuetable(['code', 'description'])

    expect(wrapper.vm.countVisibleFields).toEqual(2)
    wrapper.vm.tableFields[0].visible = false
    expect(wrapper.vm.countVisibleFields).toEqual(1)
  })

  it('countTableData', () => {
    let wrapper = mountVuetable(['code'])

    expect(wrapper.vm.countTableData).toEqual(0)
    wrapper.vm.setData([
      { code: 'AAA' },
      { code: 'BBB' }
    ])
    expect(wrapper.vm.countTableData).toEqual(2)
  })

  it('displayEmptyDataRow', () => {
    let wrapper = mountVuetable(['code'])

    // where there's no data
    expect(wrapper.vm.displayEmptyDataRow).toBe(true)

    // when there are no data, but no-data-template is empty
    wrapper.vm.noDataTemplate = ''
    expect(wrapper.vm.displayEmptyDataRow).toBe(false)

    // when there are data
    wrapper.vm.setData([
      { code: 'AAA' },
      { code: 'BBB' }
    ])
    expect(wrapper.vm.displayEmptyDataRow).toBe(false)
  })

  describe('useDetailRow', () => {

    const detailRow = Vue.component('detail-row', {
      template: `<div>AAA</div>`
    })

    const mountVuetable = () => mount(Vuetable, {
      propsData: {
        apiMode: false,
        fields: ['code'],
      }
    })

    it('returns false when data is not available', () => {
      let wrapper = mountVuetable()
      wrapper.setProps({ detailRowComponent: detailRow})

      expect(wrapper.vm.useDetailRow).toBe(false)
    })

    it('returns false when data is available, but detail-row-component was not specified', () => {
      let wrapper = mountVuetable()
      wrapper.vm.setData([{ code: 'AAA' }])

      expect(wrapper.vm.useDetailRow).toBe(false)
    })

    it('returns true when both the data and detail-row-component are available', () => {
      let wrapper = mountVuetable()
      wrapper.setProps({ 
        detailRowComponent: detailRow,
        data: [ {code: 'AAA'} ]
      })

      expect(wrapper.vm.useDetailRow).toBe(true)
    })
  })

  describe('dataIsAvailable', () => {
    const mountVuetable = () => shallow(Vuetable, {
      propsData: {
        apiMode: false,
        fields: ['code'],
      }
    })

    it('return false when data is not available', () => {
      let wrapper = mountVuetable()

      expect(wrapper.vm.dataIsAvailable).toBe(false)
    })

    it('return true when data is available', () => {
      let wrapper = mountVuetable()
      wrapper.setProps({
        data: [{ code: 'AAA'}]
      })

      expect(wrapper.vm.dataIsAvailable).toBe(true)
    })
  })

  describe('hasRowIdentifier', () => {
    const mountVuetable = () => shallow(Vuetable, {
      propsData: {
        apiMode: false,
        fields: ['code'],
        data: [ {code: 'AAA'} ]
      }
    })

    it('return false when row identifier cannot be found in the given data', () => {
      let wrapper = mountVuetable()

      expect(wrapper.vm.hasRowIdentifier).toBe(false)
    })

    it('return true when row identifier can be found in the given data', () => {
      let wrapper = mountVuetable()
      wrapper.setProps({
        trackBy: 'code'
      })

      expect(wrapper.vm.hasRowIdentifier).toBe(true)
    })
  })

  describe('lessThanMinRows', () => {
    
    const mountVuetable = () => {
      return shallow(Vuetable, {
        propsData: {
          apiMode: false,
          fields: ['code'],
          minRows: 2,
          data: [
            {code: 'AAA'}
          ]
        }
      })
    }

    it('returns true when available data has less row than min-rows prop', () => {
      let wrapper = mountVuetable()

      expect(wrapper.vm.lessThanMinRows).toBe(true)
    })

    it('returns false when available data has at least the same number specified in min-rows', () => {
      let wrapper = mountVuetable()
      wrapper.setProps({
        minRows: 1
      })

      expect(wrapper.vm.lessThanMinRows).toBe(false)
    })
  })

  describe('blankRows', () => {

    const mountVuetable = (minRows, data) => {
      return shallow(Vuetable, {
        propsData: {
          apiMode: false,
          fields: ['code'],
          minRows,
          data
        }
      })
    }

    it('returns correct number of blank rows', () => {
      let wrapper = mountVuetable(0, [])
      expect(wrapper.vm.blankRows).toEqual(0)

      wrapper = mountVuetable(1, [])
      expect(wrapper.vm.blankRows).toEqual(1)

      wrapper = mountVuetable(2, [])
      expect(wrapper.vm.blankRows).toEqual(2)

      wrapper = mountVuetable(2, [{code: 'AAA'}])
      expect(wrapper.vm.blankRows).toEqual(1)
    })
  })
})