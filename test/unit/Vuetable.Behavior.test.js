import Vue from 'vue'
import { mount } from 'vue-test-utils'
import Vuetable from '@/components/Vuetable.vue'

Vue.config.productionTip = false

describe('Vuetable - Behaviors', () => {
  let cmp

  beforeEach( () => {
    cmp = mount(Vuetable, {
      propsData: {
        fields: ['code'],
        apiMode: false
      }
    })
  })

  test('render nothing when fields is undefined')
  test('$http is default to axios if it is undefined')
})
