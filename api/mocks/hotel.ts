import type{ GetAllResponse, BaseResponse } from '~~/model/api';
import { type Hotel } from '~~/model/hotel';
interface getAllHotelsApiResponse<T> extends GetAllResponse<T> {
  total: number;
}

export const allHotelData: GetAllResponse<Hotel[]> = {
    "status": "success",
    "result": 15,
    "data": {
        "data": [
            {
                "locations": {
                    "type": "Point",
                    "coordinates": [
                        18.069567,
                        59.325951
                    ],
                    "address": "斯德哥爾摩"
                },
                "name": "湖邊飯店",
                "price": 6000,
                "roomType": [
                    {
                        "name": "孤獨單人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 1,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2000,
                        "roomNum": 6,
                        "remainRoom": 6,
                        "_id": "62f911b0c9bf820cab3d3e61"
                    },
                    {
                        "name": "豪華雙人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 2,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 5,
                        "remainRoom": 5,
                        "_id": "62f911b0c9bf820cab3d3e63"
                    },
                    {
                        "name": "國王三人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 3,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 8,
                        "remainRoom": 8,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "超級四人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 4,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 4,
                        "remainRoom": 4,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "高級五人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 5,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 5,
                        "remainRoom": 5,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    }
                ],
                "stars": 5,
                "country": "瑞典",
                "ratingAverage": 3,
                "ratingQuantity": 5,
                "description": "Hotel Småland環保酒店位於希靈阿呂德（Skillingaryd），距離延雪平（Jönköping）市中心有30分鐘車程。客人可免費使用停車場、無線網絡連接和桑拿浴室。\n\nHotel Småland酒店設有平面電視和休息區。每間客房均設有帶淋浴和吹風機的私人浴室，以及書桌和熨燙設施等額外設施。\n\n其他設施包括行李寄存處、雪具寄存處和兒童遊樂場。酒店隔壁設有餐廳。",
                "images": [
                    "https://media.istockphoto.com/photos/modern-luxury-house-with-private-infinity-pool-in-dusk-picture-id1319453433?k=20&m=1319453433&s=612x612&w=0&h=K0U_tRmqxYG2p1zuGtcHwdQLyhpwp9tJFXKTAXGvnmM=",
                    "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
                    "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjM3fHxob3RlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
                    "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80"
                ],
                "summary": "瑞典5星飯店",
                "service": [
                    "免費網路",
                    "提供早餐",
                    "溫泉"
                ],
                "accommodate": 5,
                "id": "623ec7f9fb2ac1e17bd06adf"
            },
            {
                "locations": {
                    "type": "Point",
                    "coordinates": [
                        -118.24631,
                        34.05455
                    ],
                    "address": "南投魚池鄉大林村989號"
                },
                "name": "魚池酒店",
                "price": 4500,
                "roomType": [
                    {
                        "name": "孤獨單人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 1,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2000,
                        "roomNum": 8,
                        "remainRoom": 8,
                        "_id": "62f911b0c9bf820cab3d3e61"
                    },
                    {
                        "name": "豪華雙人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 2,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 10,
                        "remainRoom": 9,
                        "_id": "62f911b0c9bf820cab3d3e63"
                    },
                    {
                        "name": "國王三人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 3,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 7,
                        "remainRoom": 7,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "超級四人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 4,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 8,
                        "remainRoom": 8,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "高級五人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 5,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 9,
                        "remainRoom": 9,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    }
                ],
                "stars": 3,
                "country": "台灣",
                "ratingAverage": 3.4,
                "ratingQuantity": 5,
                "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "images": [
                    "https://images.unsplash.com/photo-1614957004131-9e8f2a13123c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTF8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                    "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80",
                    "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                ],
                "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
                "service": [
                    "游泳池",
                    "機場接送",
                    "停車場"
                ],
                "accommodate": 5,
                "id": "623ec588fb2ac1e17bd06ad4"
            },
            {
                "locations": {
                    "type": "Point",
                    "coordinates": [
                        -118.24631,
                        34.05455
                    ],
                    "address": "洛杉磯海爾街20號"
                },
                "name": "天使酒店",
                "price": 4000,
                "roomType": [
                    {
                        "name": "孤獨單人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 1,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2000,
                        "roomNum": 5,
                        "remainRoom": 5,
                        "_id": "62f911b0c9bf820cab3d3e61"
                    },
                    {
                        "name": "豪華雙人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 2,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 3,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e63"
                    },
                    {
                        "name": "國王三人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 3,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 8,
                        "remainRoom": 8,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "超級四人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 4,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 6,
                        "remainRoom": 6,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "高級五人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 5,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    }
                ],
                "stars": 5,
                "country": "美國",
                "ratingAverage": 2.6,
                "ratingQuantity": 5,
                "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "images": [
                    "https://images.unsplash.com/photo-1490122417551-6ee9691429d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjEzfHxob3RlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
                    "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1586611292717-f828b167408c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                    "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                ],
                "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
                "service": [
                    "游泳池",
                    "禁菸房",
                    "酒吧",
                    "機場接送",
                    "景觀",
                    "停車場",
                    "健身房",
                    "溫泉",
                    "提供早餐",
                    "免費網路"
                ],
                "accommodate": 5,
                "id": "623ec493fb2ac1e17bd06ad1"
            },
            {
                "locations": {
                    "type": "Point",
                    "coordinates": [
                        -0.137965,
                        51.498928
                    ],
                    "address": "Ha'uke'uke Way, Kailua-Kona"
                },
                "name": "英國皇家酒店",
                "price": 3500,
                "roomType": [
                    {
                        "name": "孤獨單人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 1,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2000,
                        "roomNum": 3,
                        "remainRoom": 3,
                        "_id": "62f911b0c9bf820cab3d3e61"
                    },
                    {
                        "name": "豪華雙人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 2,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 1,
                        "remainRoom": 1,
                        "_id": "62f911b0c9bf820cab3d3e63"
                    },
                    {
                        "name": "國王三人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 3,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "超級四人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 4,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "高級五人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 5,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    }
                ],
                "stars": 4,
                "country": "英國",
                "ratingAverage": 2.6,
                "ratingQuantity": 5,
                "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "images": [
                    "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80",
                    "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjM3fHxob3RlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
                    "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                ],
                "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
                "service": [
                    "免費網路",
                    "提供早餐",
                    "溫泉",
                    "健身房",
                    "停車場"
                ],
                "accommodate": 5,
                "id": "6280b303155d913abc833e84"
            },
            {
                "locations": {
                    "type": "Point",
                    "coordinates": [
                        -80.274779,
                        25.785791
                    ],
                    "address": "Ha'uke'uke Way, Kailua-Kona"
                },
                "name": "Winston Hotel",
                "price": 3500,
                "roomType": [
                    {
                        "name": "孤獨單人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 1,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2000,
                        "roomNum": 50,
                        "remainRoom": 48,
                        "_id": "62f911b0c9bf820cab3d3e61"
                    },
                    {
                        "name": "豪華雙人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 2,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 20,
                        "remainRoom": 20,
                        "_id": "62f911b0c9bf820cab3d3e63"
                    },
                    {
                        "name": "國王三人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 3,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 10,
                        "remainRoom": 10,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "超級四人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 4,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 3,
                        "remainRoom": 3,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    }
                ],
                "stars": 5,
                "country": "美國",
                "ratingAverage": 2,
                "ratingQuantity": 5,
                "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "images": [
                    "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80",
                    "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                    "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                ],
                "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
                "service": [
                    "免費網路",
                    "提供早餐",
                    "溫泉",
                    "健身房",
                    "停車場"
                ],
                "accommodate": 4,
                "id": "6288f2132ce17ae196a16c28"
            },
            {
                "locations": {
                    "type": "Point",
                    "coordinates": [
                        -135.053559,
                        60.723656
                    ],
                    "address": "加拿大白馬鎮200號"
                },
                "name": "白馬飯店",
                "price": 3100,
                "roomType": [
                    {
                        "name": "孤獨單人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 1,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2000,
                        "roomNum": 3,
                        "remainRoom": 3,
                        "_id": "62f911b0c9bf820cab3d3e61"
                    },
                    {
                        "name": "豪華雙人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 2,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 1,
                        "remainRoom": 1,
                        "_id": "62f911b0c9bf820cab3d3e63"
                    },
                    {
                        "name": "國王三人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 3,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "超級四人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 4,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "高級五人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 5,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    }
                ],
                "stars": 0,
                "country": "加拿大",
                "ratingAverage": 2.4,
                "ratingQuantity": 5,
                "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "images": [
                    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjAyfHxob3RlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
                    "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                    "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjM3fHxob3RlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
                    "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1596436889106-be35e843f974?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                ],
                "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
                "service": [
                    "溫泉",
                    "健身房",
                    "機場接送",
                    "游泳池",
                    "酒吧"
                ],
                "accommodate": 5,
                "id": "623ec2fefb2ac1e17bd06acc"
            },
            {
                "locations": {
                    "type": "Point",
                    "coordinates": [
                        115.203852,
                        -8.812542
                    ],
                    "address": "Benoa, South Kuta, 巴東峇里省"
                },
                "name": "Malaya Hotel",
                "price": 3000,
                "freeCancel": true,
                "noPrePay": false,
                "roomType": [
                    {
                        "name": "孤獨單人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 1,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2000,
                        "roomNum": 3,
                        "remainRoom": 3,
                        "_id": "62f911b0c9bf820cab3d3e61"
                    },
                    {
                        "name": "豪華雙人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 2,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 1,
                        "remainRoom": 1,
                        "_id": "62f911b0c9bf820cab3d3e63"
                    },
                    {
                        "name": "國王三人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 3,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "超級四人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 4,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "高級五人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 5,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    }
                ],
                "description": "",
                "summary": "",
                "stars": 4,
                "country": "印尼",
                "ratingAverage": 2.2,
                "ratingQuantity": 5,
                "images": [
                    "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjM3fHxob3RlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                ],
                "priceDiscount": 0,
                "service": [
                    "免費網路",
                    "提供早餐",
                    "溫泉",
                    "停車場",
                    "景觀",
                    "酒吧"
                ],
                "accommodate": 5,
                "id": "623ec7affb2ac1e17bd06adc"
            },
            {
                "locations": {
                    "type": "Point",
                    "coordinates": [
                        106.780801,
                        -6.209095
                    ],
                    "address": "印尼雅加達 West Jakarta City, Kebonjeruk, North Sukabumi"
                },
                "name": "Cool Hotel",
                "summary": "",
                "price": 3000,
                "freeCancel": true,
                "noPrePay": false,
                "roomType": [
                    {
                        "name": "孤獨單人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 1,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2000,
                        "roomNum": 3,
                        "remainRoom": 3,
                        "_id": "62f911b0c9bf820cab3d3e61"
                    },
                    {
                        "name": "豪華雙人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 2,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 1,
                        "remainRoom": 1,
                        "_id": "62f911b0c9bf820cab3d3e63"
                    },
                    {
                        "name": "國王三人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 3,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "超級四人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 4,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "高級五人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 5,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    }
                ],
                "stars": 0,
                "country": "印尼",
                "ratingAverage": 3.4,
                "ratingQuantity": 5,
                "description": "Cool Hotel 環保酒店位於希靈阿呂德（Skillingaryd），距離延雪平（Jönköping）市中心有30分鐘車程。客人可免費使用停車場、無線網絡連接和桑拿浴室。\n\nHotel Småland酒店設有平面電視和休息區。每間客房均設有帶淋浴和吹風機的私人浴室，以及書桌和熨燙設施等額外設施。\n\n其他設施包括行李寄存處、雪具寄存處和兒童遊樂場。酒店隔壁設有餐廳。",
                "images": [
                    "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjM3fHxob3RlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
                    "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                    "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjM3fHxob3RlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
                    "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1600011689032-8b628b8a8747?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
                    "https://images.unsplash.com/photo-1468824357306-a439d58ccb1c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjM3fHxob3RlbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
                ],
                "priceDiscount": 0,
                "service": [
                    "免費網路",
                    "提供早餐",
                    "溫泉",
                    "健身房",
                    "停車場",
                    "景觀",
                    "機場接送",
                    "酒吧"
                ],
                "accommodate": 5,
                "id": "623ec8a6fb2ac1e17bd06ae2"
            },
            {
                "locations": {
                    "type": "Point",
                    "coordinates": [
                        -80.128473,
                        25.781842
                    ],
                    "address": "邁阿密"
                },
                "name": "Summer Hotel",
                "price": 3000,
                "roomType": [
                    {
                        "name": "孤獨單人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 1,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2000,
                        "roomNum": 10,
                        "remainRoom": 10,
                        "_id": "638b27b89ff94348aeabfe03"
                    },
                    {
                        "name": "豪華雙人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 2,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 9,
                        "remainRoom": 9,
                        "_id": "638b27b89ff94348aeabfe04"
                    },
                    {
                        "name": "國王三人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 3,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 8,
                        "remainRoom": 8,
                        "_id": "638b27b89ff94348aeabfe05"
                    },
                    {
                        "name": "超級四人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 4,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 7,
                        "remainRoom": 7,
                        "_id": "638b27b89ff94348aeabfe06"
                    },
                    {
                        "name": "高級五人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 5,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 6,
                        "remainRoom": 6,
                        "_id": "638b27b89ff94348aeabfe07"
                    }
                ],
                "stars": 5,
                "country": "美國",
                "ratingAverage": 3.4,
                "ratingQuantity": 5,
                "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "images": [
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80",
                    "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=821&q=80",
                    "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80"
                ],
                "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
                "service": [
                    "免費網路",
                    "提供早餐",
                    "溫泉",
                    "健身房",
                    "停車場"
                ],
                "accommodate": 5,
                "id": "6277b98ac0805ffce07f37a8"
            },
            {
                "locations": {
                    "type": "Point",
                    "coordinates": [
                        120.641114,
                        24.168119
                    ],
                    "address": "台中市台灣大道1000號"
                },
                "name": "台中某飯店",
                "price": 2000,
                "roomType": [
                    {
                        "name": "普通單人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 1,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2000,
                        "roomNum": 3,
                        "remainRoom": 3,
                        "_id": "62f911b0c9bf820cab3d3e61"
                    },
                    {
                        "name": "豪華雙人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 2,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 10,
                        "remainRoom": 10,
                        "_id": "62f911b0c9bf820cab3d3e63"
                    },
                    {
                        "name": "國王三人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 3,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    }
                ],
                "stars": 3,
                "country": "台灣",
                "ratingAverage": 2.8,
                "ratingQuantity": 5,
                "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "images": [
                    "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                ],
                "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
                "service": [
                    "免費網路",
                    "提供早餐",
                    "溫泉",
                    "健身房",
                    "停車場",
                    "景觀",
                    "機場接送",
                    "酒吧",
                    "禁菸房",
                    "游泳池"
                ],
                "accommodate": 3,
                "id": "623eb8b5fb2ac1e17bd06aba"
            },
            {
                "locations": {
                    "type": "Point",
                    "coordinates": [
                        -118.24631,
                        34.05455
                    ],
                    "address": "台北市北投區700號"
                },
                "name": "溫泉飯店",
                "price": 2000,
                "roomType": [
                    {
                        "name": "孤獨單人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 1,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2000,
                        "roomNum": 3,
                        "remainRoom": 3,
                        "_id": "62f911b0c9bf820cab3d3e61"
                    },
                    {
                        "name": "豪華雙人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 2,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 1,
                        "remainRoom": 1,
                        "_id": "62f911b0c9bf820cab3d3e63"
                    },
                    {
                        "name": "國王三人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 3,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "超級四人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 4,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "高級五人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 5,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    }
                ],
                "stars": 0,
                "country": "台灣",
                "ratingAverage": 2.6,
                "ratingQuantity": 5,
                "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "images": [
                    "https://images.unsplash.com/photo-1582490841511-81e1363fb48c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG90JTIwc3ByaW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                ],
                "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
                "service": [
                    "景觀",
                    "免費網路",
                    "停車場",
                    "提供早餐",
                    "機場接送"
                ],
                "accommodate": 5,
                "id": "623ec6f4fb2ac1e17bd06ad7"
            },
            {
                "locations": {
                    "type": "Point",
                    "coordinates": [
                        113.332946,
                        23.092431
                    ],
                    "address": "廣州酒店路1000號"
                },
                "name": "廣州某間飯店",
                "price": 2000,
                "roomType": [
                    {
                        "name": "孤獨單人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 1,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2000,
                        "roomNum": 3,
                        "remainRoom": 3,
                        "_id": "62f911b0c9bf820cab3d3e61"
                    },
                    {
                        "name": "豪華雙人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 2,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 1,
                        "remainRoom": 1,
                        "_id": "62f911b0c9bf820cab3d3e63"
                    },
                    {
                        "name": "國王三人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 3,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "超級四人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 4,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "高級五人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 5,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    }
                ],
                "stars": 0,
                "country": "中國",
                "ratingAverage": 2.8,
                "ratingQuantity": 5,
                "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "images": [
                    "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                ],
                "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
                "service": [
                    "免費網路",
                    "提供早餐",
                    "停車場"
                ],
                "accommodate": 5,
                "id": "623ebfdefb2ac1e17bd06ac4"
            },
            {
                "locations": {
                    "type": "Point",
                    "coordinates": [
                        -156.032224,
                        19.715493
                    ],
                    "address": "Ha'uke'uke Way, Kailua-Kona"
                },
                "name": "夏威夷某間酒店",
                "price": 2000,
                "roomType": [
                    {
                        "name": "孤獨單人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 1,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2000,
                        "roomNum": 3,
                        "remainRoom": 3,
                        "_id": "62f911b0c9bf820cab3d3e61"
                    },
                    {
                        "name": "豪華雙人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 2,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 1,
                        "remainRoom": 1,
                        "_id": "62f911b0c9bf820cab3d3e63"
                    },
                    {
                        "name": "國王三人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 3,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "超級四人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 4,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 2,
                        "remainRoom": 2,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    },
                    {
                        "name": "高級五人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 5,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2500,
                        "roomNum": 5,
                        "remainRoom": 5,
                        "_id": "62f911b0c9bf820cab3d3e69"
                    }
                ],
                "stars": 4,
                "country": "美國",
                "ratingAverage": 2.6,
                "ratingQuantity": 5,
                "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "images": [
                    "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60"
                ],
                "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
                "service": [
                    "健身房",
                    "免費網路",
                    "景觀",
                    "溫泉",
                    "提供早餐",
                    "游泳池"
                ],
                "accommodate": 5,
                "id": "623ec119fb2ac1e17bd06ac7"
            },
            {
                "locations": {
                    "type": "Point",
                    "coordinates": [
                        -74.033243,
                        40.740217
                    ],
                    "address": "紐約"
                },
                "name": "Sunny Hotel",
                "price": 1700,
                "roomType": [
                    {
                        "name": "孤獨單人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 1,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 1700,
                        "roomNum": 1,
                        "remainRoom": 1,
                        "_id": "638b86e5db4d6a0c89f052a0"
                    },
                    {
                        "name": "豪華雙人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 2,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2200,
                        "roomNum": 3,
                        "remainRoom": 3,
                        "_id": "638b86e5db4d6a0c89f052a1"
                    }
                ],
                "stars": 4,
                "country": "美國",
                "ratingAverage": 4.8,
                "ratingQuantity": 5,
                "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "images": [
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80",
                    "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=821&q=80",
                    "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80"
                ],
                "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
                "service": [
                    "免費網路",
                    "提供早餐",
                    "溫泉",
                    "健身房",
                    "停車場"
                ],
                "accommodate": 2,
                "id": "638b86e5db4d6a0c89f0529f"
            },
            {
                "locations": {
                    "type": "Point",
                    "coordinates": [
                        -74.036333,
                        40.741323
                    ],
                    "address": "紐約"
                },
                "name": "Sun Hotel",
                "price": 1700,
                "roomType": [
                    {
                        "name": "孤獨單人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 1,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 1700,
                        "roomNum": 1,
                        "remainRoom": 1,
                        "_id": "638b8ba2db4d6a0c89f052aa"
                    },
                    {
                        "name": "豪華雙人房",
                        "image": [
                            "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        ],
                        "person": 2,
                        "service": [
                            "免費網路",
                            "提供早餐",
                            "溫泉",
                            "健身房",
                            "停車場"
                        ],
                        "price": 2200,
                        "roomNum": 3,
                        "remainRoom": 3,
                        "_id": "638b8ba2db4d6a0c89f052ab"
                    }
                ],
                "stars": 4,
                "country": "美國",
                "ratingAverage": 3,
                "ratingQuantity": 5,
                "description": "Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                "images": [
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
                    "https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=725&q=80",
                    "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=821&q=80",
                    "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=449&q=80"
                ],
                "summary": "Exploring the jaw-dropping US east coast by foot and by boat",
                "service": [
                    "免費網路",
                    "提供早餐",
                    "溫泉",
                    "健身房",
                    "停車場"
                ],
                "accommodate": 2,
                "id": "638b8ba2db4d6a0c89f052a9"
            }
        ]
    }
}