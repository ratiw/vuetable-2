import axios from 'axios'
import moxios from 'moxios'
import { mount, shallow } from '@vue/test-utils'
import Vuetable from '@/components/Vuetable.vue'

describe('AJAX functionality', () => {
  let apiUrl, response

  beforeEach( () => {
    moxios.install()
    apiUrl = 'api.example.com/hello'
  })

  afterEach( () => {
    moxios.uninstall()
    apiUrl = ''
    response = null
  })

  describe('load-on-start', () => {

    it('calls API endpoint when load: load-on-start', (done) => {
      let wrapper = shallow(Vuetable, {
        propsData: {
          apiUrl: apiUrl,
          fields: ['id', 'code'],
          paginationPath: ''
        }
      })

      moxios.wait( () => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: [
            {id: 1, code: 'AAA'},
            {id: 2, code: 'BBB'}
          ]
        }).then( (res) => {
          expect(res.request.url).toContain('api.example.com/hello')
          expect(res.data[0].code).toEqual('AAA')
          done()
        })
      })
    })
  })

  describe('http-method', () => {
    let stubResponse = [
      {id: 1, code: 'AAA'},
      {id: 2, code: 'BBB'}
    ]

    const shallowVuetable = (httpMethod) => shallow(Vuetable, {
      propsData: {
        apiUrl: apiUrl,
        fields: ['id', 'code'],
        paginationPath: '',
        httpMethod
      }
    })

    it('calls API endpoint using "get" verb', (done) => {
      let wrapper = shallowVuetable('get')
      expect(wrapper.vm.httpMethod).toEqual('get')
      expect(wrapper.vm.$options.props.httpMethod.validator('get')).toBeTruthy()

      moxios.wait( () => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: stubResponse
        }).then( (res) => {
          expect(res.request.url).toContain('api.example.com/hello')
          expect(res.data[0].code).toEqual('AAA')
          done()
        })
      })
    })

    it('calls API endpoint using "post" verb', (done) => {
      let wrapper = shallowVuetable('post')
      expect(wrapper.vm.httpMethod).toEqual('post')
      expect(wrapper.vm.$options.props.httpMethod.validator('post')).toBeTruthy()

      moxios.wait( () => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: stubResponse
        }).then( (res) => {
          expect(res.request.url).toContain('api.example.com/hello')
          expect(res.data[0].code).toEqual('AAA')
          done()
        })
      })
    })

    it('fails prop validation when using verb other than "get" and "post"', () => {
      let wrapper = shallowVuetable('put')
      expect(wrapper.vm.httpMethod).toEqual('put')
      expect(wrapper.vm.$options.props.httpMethod.validator('put')).toBeFalsy()
    })
  
  })

  describe('reactive-api-url', () => {

    it('makes a new request to API endpoint when api-url changes if reactive-api-url is true', () => {
      let newUrl = 'api.example.com/anotherEndpoint'
      let mockLoadData = jest.fn()
      let mockWatch = jest.fn()
      let wrapper = shallow(Vuetable, {
        propsData: {
          apiUrl: apiUrl,
          fields: ['id', 'code'],
          paginationPath: '',
          reactiveApiUrl: true,
        },
        methods: {
          loadData: mockLoadData
        },
        watch: {
          apiUrl: mockWatch
        }
      })

      expect(mockLoadData).toBeCalled()
      expect(mockWatch).not.toBeCalled()
      
      mockLoadData.mockClear()
      mockWatch.mockClear()

      wrapper.setProps({
        apiUrl: newUrl
      })
      
      expect(mockWatch).toBeCalledWith(newUrl, apiUrl)
      expect(mockLoadData).toBeCalled()
    })
  })

  describe('query-params', () => {

    it('returns correct default', (done) => {
      let wrapper = shallow(Vuetable, {
        propsData: {
          apiUrl: apiUrl,
          fields: ['id', 'code'],
          paginationPath: '',
        }
      })

      expect(wrapper.vm.queryParams).toEqual({
        sort: 'sort',
        page: 'page',
        perPage: 'per_page'
      })

      moxios.wait( () => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: 'foo'
        }).then( (payload) => {
          expect(payload.request.url).toEqual(
            `${apiUrl}?sort=&page=1&per_page=10`
          )
          done()
        })
      })
    })

    it('uses the given query params object to make a call to API endpoint', (done) => {
      let params = {
        sort: 'sss',
        page: 'ppp',
        perPage: 'ggg'
      }
      let wrapper = shallow(Vuetable, {
        propsData: {
          apiUrl: apiUrl,
          fields: ['id', 'code'],
          paginationPath: '',
          queryParams: params
        }
      })

      expect(wrapper.vm.queryParams).toEqual(params)
    
      moxios.wait( () => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: 'foo'
        }).then( (payload) => {
          expect(payload.request.url).toEqual(
            `${apiUrl}?${params.sort}=&${params.page}=1&${params.perPage}=10`
          )
          done()
        })
      })
    })

    it('uses the given callback to construct query params', (done) => {
      let params = (sort, page, perPage) => {
        return {
          aaa: 111,
          bbb: 222,
          ccc: 333
        }
      }
      let wrapper = shallow(Vuetable, {
        propsData: {
          apiUrl: apiUrl,
          fields: ['id', 'code'],
          paginationPath: '',
          queryParams: params
        }
      })

      expect(wrapper.vm.queryParams).toEqual(params)

      moxios.wait( () => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: 'foo'
        }).then( (payload) => {
          expect(payload.request.url).toEqual(
            `${apiUrl}?aaa=111&bbb=222&ccc=333`
          )
          done()
        })
      })
    })

    it('defaults to empty object when the given queryParams function does not return Object', (done) => {
      let params = (sort, page, perPage) => 'bar'
      let wrapper = shallow(Vuetable, {
        propsData: {
          apiUrl: apiUrl,
          fields: ['id', 'code'],
          paginationPath: '',
          queryParams: params
        }
      })

      expect(wrapper.vm.queryParams).toEqual(params)

      moxios.wait( () => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: 'foo'
        }).then( (payload) => {
          expect(payload.request.config.params).toEqual({})
          expect(payload.request.url).toEqual(apiUrl)
          done()
        })
      })
    })
  })

  describe('append-params', () => {
    let appends = {
      'aaa': 111,
      'bbb': 222
    }

    it('appends additional parameters to the API request', (done) => {
      let wrapper = shallow(Vuetable, {
        propsData: {
          apiUrl,
          fields: ['id', 'code'],
          paginationPath: '',
          appendParams: appends
        }
      })

      moxios.wait( () => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: 'foo'
        }).then( (payload) => {
          expect(payload.request.config.params).toEqual(expect.objectContaining(appends))
          expect(payload.request.url).toEqual(expect.stringContaining(`aaa=111&bbb=222`))
          done()
        })
      })
    })
  })

  describe('http-options', () => {
    let options = {
      headers: {
        'Authorization': 'my-token'
      }
    }

    it('attaches other options to the API request', (done) => {
      let wrapper = shallow(Vuetable, {
        propsData: {
          apiUrl,
          fields: ['id', 'code'],
          paginationPath: '',
          httpOptions: options
        }
      })

      moxios.wait( () => {
        let request = moxios.requests.mostRecent()
        request.respondWith({
          status: 200,
          response: 'foo'
        }).then( (payload) => {
          expect(payload.request.headers).toEqual(expect.objectContaining(options.headers))
          done()
        })
      })
    })
  })

  describe('http-fetch', () => {
    it('uses the given http-fetch function when specified', (done) => {
      
      const myFetch = jest.fn( () => {
        return axios.get(apiUrl)
      })

      let wrapper = shallow(Vuetable, {
        propsData: {
          apiUrl,
          fields: ['id', 'code'],
          paginationPath: '',
          httpFetch: myFetch
        }
      })

      moxios.wait( () => {
        expect(myFetch).toBeCalledWith(
          apiUrl,
          {
            params: {
              page: 1, per_page: 10, sort: ''
            }
          }
        )
        done()
      })
    })
  })
})