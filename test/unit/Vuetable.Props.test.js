import Vue from 'vue'
import { mount } from 'vue-test-utils'
import Vuetable from '@/components/Vuetable.vue'

Vue.config.productionTip = false

describe('Vuetable - Properties (default value)', () => {
  let cmp

  beforeEach( () => {
    cmp = mount(Vuetable, {
      propsData: {
        fields: ['code'],
        apiMode: false
      }
    })
  })

  test('loadOnStart defaults to true', () => {
    expect(cmp.vm.loadOnStart).toEqual(true)
  })

  test('apiUrl defaults to empty string', () => {
    expect(cmp.vm.apiUrl).toEqual('')
  })

  test('httpMethod defaults to "get"', () => {
    expect(cmp.vm.httpMethod).toEqual('get')
  })

  test('reactiveApiUrl defaults to true', () => {
    expect(cmp.vm.reactiveApiUrl).toEqual(true)
  })

  test('apiMode defaults to true', () => {
    let cmp = mount(Vuetable, {
      propsData: {
        fields: ['code'],
        loadOnStart: false
      }
    })
    expect(cmp.vm.apiMode).toEqual(true)
  })

  test('data defaults to null', () => {
    expect(cmp.vm.data).toEqual(null)
  })

  test('dataManager defaults to null', () => {
    expect(cmp.vm.dataManager).toEqual(null)
  })

  test('dataPath defaults to "data"', () => {
    expect(cmp.vm.dataPath).toEqual('data')
  })

  test('paginationPath defaults to "links.pagination"', () => {
    expect(cmp.vm.paginationPath).toEqual('links.pagination')
  })

  test('queryParams defaults to "sort", "page", and "per_page" keys', () => {
    expect(cmp.vm.queryParams).toEqual({
      sort: 'sort',
      page: 'page',
      perPage: 'per_page'
    })
  })

  test('appendParams defaults to empty object', () => {
    expect(cmp.vm.appendParams).toEqual({})
  })

  test('httpOptions defaults to empty object', () => {
    expect(cmp.vm.httpOptions).toEqual({})
  })

  test('httpFetch defaults to null', () => {
    expect(cmp.vm.httpFetch).toEqual(null)
  })

  test('perPage defaults to 10', () => {
    expect(cmp.vm.perPage).toEqual(10)
  })

  test('initialPage defaults to 1', () => {
    expect(cmp.vm.initialPage).toEqual(1)
  })

  test('sortOrder defaults to empty array', () => {
    expect(cmp.vm.sortOrder).toEqual([])
  })

  test('multiSort defaults to false', () => {
    expect(cmp.vm.multiSort).toEqual(false)
  })

  test('multiSortKey defaults to "alt"', () => {
    expect(cmp.vm.multiSortKey).toEqual('alt')
  })

  test('rowClass defaults to empty string', () => {
    expect(cmp.vm.rowClass).toEqual('')
  })

  test('detailRowComponent defaults to empty string', () => {
    expect(cmp.vm.detailRowComponent).toEqual('')
  })

  test('detailRowTransition defaults to empty string', () => {
    expect(cmp.vm.detailRowTransition).toEqual('')
  })

  test('trackBy defaults to "id" key', () => {
    expect(cmp.vm.trackBy).toEqual('id')
  })

  test('css defaults to predefined key-value object', () => {
    expect(cmp.vm.css).toEqual({
      tableClass: 'ui blue selectable celled stackable attached table',
      loadingClass: 'loading',
      ascendingIcon: 'blue chevron up icon',
      descendingIcon: 'blue chevron down icon',
      sortableIcon: '',
      detailRowClass: 'vuetable-detail-row',
      handleIcon: 'grey sidebar icon',
    })
  })

  test('minRows defaults to 0', () => {
    expect(cmp.vm.minRows).toEqual(0)
  })

  test('noDataTemplate defaults to "No Data Available"', () => {
    expect(cmp.vm.noDataTemplate).toEqual('No Data Available')
  })
})
