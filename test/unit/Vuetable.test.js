jest.mock('axios', () => ({
  get: jest.fn()
}))
import Vue from 'vue'
import axios from 'axios'
import { mount, shallow } from 'vue-test-utils'
import { createRenderer } from 'vue-server-renderer'
import Vuetable from '@/components/Vuetable.vue'

Vue.config.productionTip = false

describe('Vuetable', () => {
  let wrapper

  // beforeEach( async () => {
  //   wrapper = shallow(Vuetable, {
  //     propsData: {
  //       fields: ['code', 'description'],
  //       apiUrl: 'http://example.com/api/users',
  //     }
  //   })
  //   jest.resetModules()
  //   jest.clearAllMocks()
  // })
  let mockData = [
    { code: '1111', description: 'zzzzz' },
    { code: '5555', description: 'xxxxx' },
    { code: '3333', description: 'yyyyy' }
  ]

  it('should call loadData by default', (done) => {
    let mockedLoadData = jest.fn()
    Vuetable.methods.loadData = mockedLoadData

    wrapper = mount(Vuetable, {
      propsData: {
        fields: ['code', 'description'],
      }
    })
    jest.resetModules()
    jest.clearAllMocks()

    wrapper.vm.$nextTick( () => {
      expect(mockedLoadData).toHaveBeenCalled()
      done()
     })
  })

  it('should call user-defined httpFetch if defined', (done) => {
    let mockedHttpFetch = jest.fn()
    // Vuetable.vm.httpFetch = mockedHttpFetch

    wrapper = mount(Vuetable, {
      propsData: {
        fields: ['code', 'description'],
        apiUrl: 'http://example.com/api/users',
        httpFetch: mockedHttpFetch
      },
    })
    jest.resetModules()
    jest.clearAllMocks()

    wrapper.vm.$nextTick( () => {
      // expect(wrapper.vm.apiUrl).toEqual('http://example.com/api/users')
      expect(mockedHttpFetch).toBeCalled()
      done()
    })
  })

  describe('Properties', () => {
    it('should have set the apiUrl correctly', () => {
      let cmp = mount(Vuetable, {
        propsData: {
          fields: ['code'],
          loadOnStart: false,
          apiUrl: 'http:aa.com/api'
        }
      })

      expect(cmp.vm.apiUrl).toEqual('http:aa.com/api')
    })
  })

})
