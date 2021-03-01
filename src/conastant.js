const Categories = [
    {
        productType: "Processors",
        categories:[
            {categoryId: "1" ,category: 'Manufacturer', filters: ['AMD', 'Intel']},
            {categoryId: "2" ,category: 'Cores', filters: ['2', '4', '6', '8', '16']}
        ]
    },
    {
        productType: "Laptops",
        categories: [
            {key:'1',categoryId: "1",category: 'Manufacturer', filters: ['Asus','Dell','HP','MSI']},
            {key:'2',categoryId: "2",category: 'CPU', filters: ['Core i3',"Core i5",'Core i7']},
            {key:'3',categoryId: "3",category: 'Graphics', filters: ['RTX 2070', 'RTX 2080 Super']}
        ]
    }

];

const ProductTypes = [
    'Laptops',
    'Desktop Work Stations',
    'Gaming Desktops',
    'Budget Desktops',
    'Processors',
    'Motherboards',
    'Memory (RAM)',
    'Graphic Cards',
    'Power supply, UPS',
    'Cooling & Lighting',
    'Storage',
    'Casings',
    'Optical Drives',
    'Monitors',
    'Keyboards, Mice. Gamepads',
    'Gaming Chairs',
    'Cables & Connectors',
    'External Storage',
    'Software',
    'Expansion Cards & Networking'
]


const Stocks = [
    {
        key: 1,
        productId: '10001C',
        productName: 'ASUS – X515JP',
        productPrice: 98000,
        availableStocks: 2,
        outOfStocks: true
    },
    {
        key: 2,
        productId: '10002B',
        productName: 'ASUS ExpertBook',
        productPrice: 333000,
        availableStocks: 25,
        outOfStocks: false
    },
    {
        key: 3,
        productId: '10003X',
        productName: 'Asus Pro P2540fa – i3',
        productPrice: 88000,
        availableStocks: 12,
        outOfStocks: false
    },
    {
        key: 4,
        productId: '10004D',
        productName: 'Asus ROG Strix G15',
        productPrice: 288000,
        availableStocks: 0,
        outOfStocks: true
    },
    {
        key: 5,
        productId: '10015A',
        productName: 'Asus ROG Zephyrus S15',
        productPrice: 658000,
        availableStocks: 34,
        outOfStocks: false
    },
    {
        key: 6,
        productId: '10056N',
        productName: 'Asus S532',
        productPrice: 185000,
        availableStocks: 10,
        outOfStocks: false
    },
]

const newOrders = [
    {
        orderId: 'or12224',
        customerName: 'John',
        loading: '',
        orderItems: ['ASUS – X515JP', 'Cooler'],
        dateOfOrder: Date('2020/12/05')
    },
    {
        orderId: 'or22354',
        customerName: 'Akila',
        loading: '',
        orderItems: ['Asus S532', 'Mouse', 'Keyboard'],
        dateOfOrder: Date('2020/12/05')
    },
    {
        orderId: 'or53423',
        customerName: 'J Amarasinge',
        loading: '',
        orderItems: ['Headset', 'Asus S532'],
        dateOfOrder: Date('2020/12/05')
    },
    {
        orderId: 'or43422',
        customerName: 'Kasun',
        loading: '',
        orderItems: ['ROG Zephyrus S15', 'Gaming mouse'],
        dateOfOrder: Date('2020/12/05')
    },
    {
        orderId: 'or86575',
        customerName: 'Janith',
        loading: '',
        orderItems: ['ASUS ExpertBook'],
        dateOfOrder: Date('2020/12/05')
    }
]

const completedOrders = [
    {
        orderId: 'or12224',
        customerName: 'John',
        loading: '',
        orderItems: ['ASUS – X515JP', 'Cooler'],
        dateOfOrder: Date('2020/12/05'),
        state: 'completed',
        reviewedBy: 'Asanka',
        reviewedDate: Date('2020/12/07'),
        completedBy: 'Asanka',
        completedDate: Date('2020/12/12')
    },
    {
        orderId: 'or12222',
        customerName: 'John',
        loading: '',
        orderItems: ['ASUS – X515JP', 'Cooler'],
        dateOfOrder: Date('2020/12/05'),
        state: 'canceled',
        reviewedBy: 'Asanka',
        reviewedDate: Date('2020/12/07'),
        completedBy: 'Asanka',
        completedDate: Date('2020/12/12')
    },
    {
        orderId: 'or12226',
        customerName: 'John',
        loading: '',
        orderItems: ['ASUS – X515JP', 'Cooler'],
        dateOfOrder: Date('2020/12/05'),
        state: 'completed',
        reviewedBy: 'Asanka',
        reviewedDate: Date('2020/12/07'),
        completedBy: 'Asanka',
        completedDate: Date('2020/12/12')
    },
    {
        orderId: 'or12227',
        customerName: 'John',
        loading: '',
        orderItems: ['ASUS – X515JP', 'Cooler'],
        dateOfOrder: Date('2020/12/05'),
        state: 'completed',
        reviewedBy: 'Asanka',
        reviewedDate: Date('2020/12/07'),
        completedBy: 'Asanka',
        completedDate: Date('2020/12/12')
    },
    {
        orderId: 'or12229',
        customerName: 'John',
        loading: '',
        orderItems: ['ASUS – X515JP', 'Cooler'],
        dateOfOrder: Date('2020/12/05'),
        state: 'canceled',
        reviewedBy: 'Asanka',
        reviewedDate: Date('2020/12/07'),
        completedBy: 'Asanka',
        completedDate: Date('2020/12/12')
    },
    {
        orderId: 'or12212',
        customerName: 'John',
        loading: '',
        orderItems: ['ASUS – X515JP', 'Cooler'],
        dateOfOrder: Date('2020/12/05'),
        state: 'completed',
        reviewedBy: 'Asanka',
        reviewedDate: Date('2020/12/07'),
        completedBy: 'Asanka',
        completedDate: Date('2020/12/12')
    },
]

const reviewedOrders = [
    {
        orderId: 'or22354',
        customerId: 'c1234',
        customerName: 'Akila',
        loading: '',
        orderItems: ['Asus S532', 'Mouse', 'Keyboard'],
        dateOfOrder: Date('2020/12/05'),
        reviewedBy: 'Asanka',
        reviewedDate: Date('2020/12/07'),
        completedBy: null,
        completedDate: Date(null)
    },
    {
        orderId: 'or22354',
        customerId: 'c1235',
        customerName: 'Janith',
        loading: '',
        orderItems: ['Asus S532', 'Mouse', 'Keyboard'],
        dateOfOrder: Date('2020/12/05'),
        reviewedBy: 'Asanka',
        reviewedDate: Date('2020/12/07'),
        completedBy: null,
        completedDate: Date(null)
    },
    {
        orderId: 'or22354',
        customerId: 'c1236',
        customerName: 'John',
        loading: '',
        orderItems: ['Asus S532', 'Mouse', 'Keyboard'],
        dateOfOrder: Date('2020/12/05'),
        reviewedBy: 'Asanka',
        reviewedDate: Date('2020/12/07'),
        completedBy: null,
        completedDate: Date(null)
    },
    {
        orderId: 'or22354',
        customerId: 'c1234',
        customerName: 'Akila',
        loading: '',
        orderItems: ['Asus S532', 'Mouse', 'Keyboard'],
        dateOfOrder: Date('2020/12/05'),
        reviewedBy: 'Asanka',
        reviewedDate: Date('2020/12/07'),
        completedBy: null,
        completedDate: Date(null)
    },
    {
        orderId: 'or22354',
        customerId: 'c1237',
        customerName: 'Chris',
        loading: '',
        orderItems: ['Asus S532', 'Mouse', 'Keyboard'],
        dateOfOrder: Date('2020/12/05'),
        reviewedBy: 'Asanka',
        reviewedDate: Date('2020/12/07'),
        completedBy: null,
        completedDate: Date(null)
    },
    {
        orderId: 'or22354',
        customerId: 'c1236',
        customerName: 'John',
        loading: '',
        orderItems: ['Asus S532', 'Mouse', 'Keyboard'],
        dateOfOrder: Date('2020/12/05'),
        reviewedBy: 'Asanka',
        reviewedDate: Date('2020/12/07'),
        completedBy: null,
        completedDate: Date(null)
    },
]

const customers = [
    {
        customerId: 'c1234',
        customerName: 'Akila',
        address: '21/A, Park rd., Colombo',
        email: 'akila@gmail.com',
        mobile: '0771234567'
    },
    {
        customerId: 'c1235',
        customerName: 'Janith',
        address: '22/A, Park rd., Colombo',
        email: 'Janith@gmail.com',
        mobile: '0771234567'
    },
    {
        customerId: 'c1236',
        customerName: 'John',
        address: '23/A, Park rd., Colombo',
        email: 'John@gmail.com',
        mobile: '0771234567'
    },
    {
        customerId: 'c1237',
        customerName: 'Chris',
        address: '25/A, Park rd., Colombo',
        email: 'chris@gmail.com',
        mobile: '0771234567'
    }
]

const lowStockList = [
    {productId: '10001C', productName: 'Asus S532', availableStocks: 2},
    {productId: '100012C', productName: 'Mouse', availableStocks: 3},
    {productId: '10005C', productName: 'Keyboard', availableStocks: 5},
    {productId: '100067C', productName: 'Cooler', availableStocks: 1},
    {productId: '100078C', productName: 'Samsung G5 24" Display', availableStocks: 8}
]

const outOfStockList = [
    {productId: '10001C', productName: 'Asus S532'},
    {productId: '100012C', productName: 'Mouse'},
    {productId: '10005C', productName: 'Keyboard'},
    {productId: '100067C', productName: 'Cooler'},
    {productId: '100078C', productName: 'Samsung G5 24" Display'}
]

const productList = [
    {
        productId: '10001C',
        productName: 'ASUS – X515JP',
        productType: 'Laptops',
        productWarranty: {years: 3, months: 0},
        productPrice: 100000,
        filters: [{category: 'Manufacturer', selectedFilters: ['Asus']}],
        description: 'Powerfully versatile for serious work and play.',
        newArrival:false,
        bestSeller:true
    },
    {
        productId: '10002B',
        productName: 'ASUS ExpertBook',
        productType: 'Laptops',
        productWarranty: {years: 1, months: 6},
        productPrice: 100000,
        filters: [{category: 'Manufacturer', selectedFilters: ['Asus']}],
        description: 'Powerfully versatile for serious work and play.',
        newArrival:false,
        bestSeller:true
    },
    {
        productId: '10003C',
        productName: 'Asus Pro P2540fa – i3',
        productType: 'Laptops',
        productWarranty: {years: 1, months: 6},
        productPrice: 100000,
        filters: [
            {category: 'Manufacturer', selectedFilters: ['Asus']},
            {category: 'CPU', selectedFilters: ['Core i3','Core i5', "Core i7"]}
        ],
        description: 'Powerfully versatile for serious work and play.',
        newArrival:false,
        bestSeller:true
    },
    {
        productId: '10005A',
        productName: 'Asus ROG Strix G15',
        productType: 'Laptops',
        productWarranty: {years: 3, months: 2},
        productPrice: 100000,
        filters: [{category: 'Manufacturer', selectedFilters: ['Asus']}, {
            category: 'CPU',
            selectedFilters: ['Core i7']
        }],
        description: 'Powerfully versatile for serious work and play.',
        newArrival:false,
        bestSeller:true
    },
    {
        productId: '10007L',
        productName: 'Dell Inspiron 15',
        productType: 'Laptops',
        productWarranty: {years: 2, months: 6},
        productPrice: 100000,
        filters: [{category: 'Manufacturer', selectedFilters: ['Dell']}],
        description: 'Powerfully versatile for serious work and play.',
        newArrival:false,
        bestSeller:true
    },
    {
        productId: '100012K',
        productName: 'MSI GP 65 leopard',
        productType: 'Laptops',
        productWarranty: {years: 2, months: 6},
        productPrice: 100000,
        filters: [
            {category: 'Manufacturer', selectedFilters: ['MSI']},
            {category: 'CPU', selectedFilters: ['Core i7']},
            {category: 'Graphics', selectedFilters: ['RTX 2070', 'RTX 2080 Super']}
        ],
        description: 'Powerfully versatile for serious work and play.',
        newArrival:false,
        bestSeller:true
    },
    {
        productId: '200041X',
        productName: 'AMD Ryzen 9 5950X',
        productType: 'Processors',
        productWarranty: {years: 2, months: 0},
        productPrice: 100000,
        filters: [
            {category: 'Manufacturer', selectedFilters: ['AMD']},
            {category: 'Cores', selectedFilters: ['16']}
        ],
        description: 'Powerfully versatile for serious work and play.',
        newArrival:false,
        bestSeller:true
    },
    {
        productId: '200089X',
        productName: 'Intel core i7 10700k',
        productType: 'Processors',
        productWarranty: {years: 2, months: 0},
        productPrice: 100000,
        filters: [
            {category: 'Manufacturer', selectedFilters: ['Intel']},
            {category: 'Cores', selectedFilters: ['8']}],
        description: 'Powerfully versatile for serious work and play.',
        newArrival:false,
        bestSeller:true
    },
]

const deviceTypes = []
const DeviceType = []
const languageCodes = []

export {
    Categories,
    ProductTypes,
    Stocks,
    deviceTypes, DeviceType, languageCodes,
    newOrders, completedOrders, reviewedOrders,
    customers,
    outOfStockList, lowStockList,
    productList
}