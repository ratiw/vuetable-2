import Vue from 'vue'
import { mount, shallow } from 'vue-test-utils'
import Vuetable from '@/components/Vuetable.vue'

Vue.config.productionTip = false

describe('Vuetable', () => {
  // let cmp

  // beforeEach( () => {
  //   cmp = shallow(Vuetable)
  // })

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
