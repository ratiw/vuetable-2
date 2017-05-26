import Vue from 'vue'
import Vuetable from 'src/components/Vuetable'
const VuetableInjector = require('!!vue?inject!../../../src/components/Vuetable')

describe('data requests', () => {
  let VuetableWithMocks
  let AxiosGetStub

  beforeEach(function() {
    AxiosGetStub = sinon.stub().resolves();
    VuetableWithMocks = VuetableInjector({
       'axios': {
         get: AxiosGetStub
       }
     })
  })

  afterEach(function() {
    AxiosGetStub.reset();
  })

  it('should loadData() to the given api when mounted', () => {
    const vm = new Vue({
      template: '<vuetable :silent="true" :fields="columns" api-url="http://example.com/api/test"></vuetable>',
      components: {'vuetable': VuetableWithMocks },
      data: {
        columns: [
          'name', 'description'
        ],
      }
    }).$mount()

    expect(AxiosGetStub).to.have.been.calledWith('http://example.com/api/test', {params: {page: 1, per_page: 10, sort: '' }})
  })

  it('should not loadData() when load-on-start set to false', () => {
    const vm = new Vue({
      template: '<vuetable ref="vuetable" :load-on-start="false" :fields="columns" api-url="http://example.com/api/test" :silent="true"></vuetable>',
      components: {'vuetable': VuetableWithMocks},
      data: {
        columns: [
          'name', 'description'
        ],
      }
    }).$mount()

    expect(vm.$refs.vuetable.loadOnStart).to.equal.false
    expect(AxiosGetStub).to.not.have.been.called
  })



})

/**
 * Properties
 */
describe('Properties', () => {

  describe('fields', () => {
    it('should create error when fields prop is not provided', () => {
      sinon.spy(console, 'error')

      const vm = new Vue({
        template: '<vuetable :silent="true"></vuetable>',
        components: { Vuetable }
      }).$mount()

      expect(console.error).to.have.been.calledWith(sinon.match('Missing required prop: "fields"'))

      console.error.restore()
    })

    it('should parse basic array of fields definition correctly', () => {
      const vm = new Vue({
        template: '<vuetable :fields="columns" :silent="true"></vuetable>',
        components: { Vuetable },
        data: {
          columns: ['code', 'description']
        }
      }).$mount()
      let comp = vm.$children[0]
      expect(comp.tableFields).to.have.lengthOf(2)
      // deep equal does not work as expected in Safari
      // as it sees only Getter/Setter functions, not the real vulue
      // but deep equal works as expected on both Chrome and Firefox
      expect(comp.tableFields).to.satisfy(function(arr) {
        return (
            arr[0].name === 'code' &&
            arr[0].title === 'Code' &&
            arr[0].titleClass === '' &&
            arr[0].dataClass === '' &&
            arr[0].callback === null &&
            arr[0].visible
          ) && (
            arr[1].name === 'description' &&
            arr[1].title === 'Description' &&
            arr[1].titleClass === '' &&
            arr[1].dataClass === '' &&
            arr[1].callback === null &&
            arr[1].visible
          )
      })
      let nodes = comp.$el.querySelectorAll('table thead tr th')
      expect(nodes[0].attributes.id.value).to.equal('_code')
      expect(nodes[1].attributes.id.value).to.equal('_description')
    })

    it('should parse array of object of fields definition correctly', () => {
      const vm = new Vue({
        template: '<vuetable :fields="columns" :silent="true"></vuetable>',
        components: { Vuetable },
        data: {
          columns: [
            { name: 'code' },
            { name: 'description' }
          ]
        }
      }).$mount()
      let comp = vm.$children[0]
      expect(comp.tableFields).to.have.lengthOf(2)
      expect(comp.tableFields[0].name).to.equal('code')
      expect(comp.tableFields[0].title).to.equal('Code')
      expect(comp.tableFields[0].titleClass).to.be.empty
      expect(comp.tableFields[0].dataClass).to.be.empty
      expect(comp.tableFields[0].callback).to.be.empty
      expect(comp.tableFields[0].visible).to.be.true

      let nodes = comp.$el.querySelectorAll('table thead tr th')
      expect(nodes[0].attributes.id.value).to.equal('_code')
      expect(nodes[1].attributes.id.value).to.equal('_description')
    })

    it('should set default field title to capitalized name', () => {
      const vm = new Vue({
        template: '<vuetable :fields="columns" :silent="true"></vuetable>',
        components: { Vuetable },
        data: {
          columns: [{
              name: 'code'
          }]
        }
      }).$mount()
      expect(vm.$children[0].tableFields[0].title).to.equal('Code')
    })

    it('should correctly override field title when specified', () => {
      const vm = new Vue({
        template: '<vuetable :silent="true" :fields="columns"></vuetable>',
        components: { Vuetable },
        data: {
          columns: [{
              name: 'code',
              title: 'My Title'
          }]
        }
      }).$mount()
      expect(vm.$children[0].tableFields[0].title).to.equal('My Title')
    })

    it('should use the given titleClass to render field title', () => {
      const vm = new Vue({
        template: '<vuetable ref="vuetable" :silent="true" :fields="columns"></vuetable>',
        components: { Vuetable },
        data: {
          columns: [{
              name: 'code',
              titleClass: 'foo-bar'
          }]
        }
      }).$mount()
      let comp = vm.$refs.vuetable
      expect(comp.tableFields[0].titleClass).to.equal('foo-bar')
      let nodes = comp.$el.querySelectorAll('table thead tr th')
      expect(nodes[0].attributes.id.value).to.equal('_code')
      expect(nodes[0].classList.contains('foo-bar')).to.be.true
    })


  })
})
