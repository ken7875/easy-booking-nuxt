import { defineStore, _GettersTree } from "pinia";

interface Locations {
  coordinates: number[],
  address: string
}

interface ViewPorts {
    locations: Locations,
    address: string,
    coordinates: number[],
    name: '',
    product: Hotel | string,
    productCooradinates: number[],
    distance: number,
    id: string
}

interface roomType {
    remainRoom: number,
    name: string,
    image: string[],
    person: number,
    service: string[],
    price: number,
    roomNum: number
}

interface Hotel {
  locations: Locations,
  name: string,
  price: number,
  country: string,
  ratingAverage: number,
  ratingQuantity: string,
  description: string,
  images: string[],
  summary: string,
  viewPorts: ViewPorts[],
  accommodate: number,
  roomType: roomType[]
}

interface State {
  allHotels: Hotel[],
  hotel: Hotel,
  hotHotels: Hotel[],
  filterData: string,
  baseUrl: string
}

export const useStore =  defineStore('hotelStore', {
  state: (): State => {
    const runtimeConfig = useRuntimeConfig()
    const { baseUrl } = runtimeConfig.public
    return {
        allHotels: [],
        hotel: {
          locations: {
            coordinates: [],
            address: ''
          },
          name: '',
          price: 0,
          country: '',
          ratingAverage: 0,
          ratingQuantity: '',
          description: '',
          images: [],
          summary: '',
          viewPorts: [],
          accommodate: 0,
          roomType: []
        },
        hotHotels: [],
        filterData: '',
        baseUrl
      }
  },
  actions: {
    getAllHotels(query: string) {
        const path = query ? `products?${query}` : 'products'
        const apiUrl = `${this.baseUrl}/${path}`
        const {data} = useAsyncData('hello world', () => $fetch(apiUrl))
        console.log(data)
    },
    getHotHotels() {
        const apiUrl = `${this.baseUrl}/products/hotProducts`
        const {data} = useAsyncData('hello world', () => $fetch(apiUrl))
        console.log(data)
    }
  }
})