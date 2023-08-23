import axios from 'axios'

export const capitalizeWords = (str: string) => {
    var words = str.split(' ')
    for (var i = 0; i < words.length; i++) {
        var firstLetter = words[i].charAt(0)
        words[i] = firstLetter.toUpperCase() + words[i].slice(1)
    }
    return words.join(' ')
}
export const formatVietnameseDong = (number: number) => {
    number = Number(number)
    if (isNaN(number)) {
        return 'NaN'
    }
    let formattedNumber = number.toLocaleString('vi-VN')
    formattedNumber += '₫'
    return formattedNumber
}

export const isTokenExpired = (expiresIn: number) => {
    const currentTime = Date.now() / 1000
    return currentTime >= expiresIn
}
export const objectURL = (data: File) => {
    return URL.createObjectURL(data)
}
export const uploadImgCloudinary = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string,
    )
    const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        formData,
    )

    return data
}
export const removeDiacritics = (text: string) => {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
export const convertToSlug = (text: string) => {
    return removeDiacritics(text)
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
}

export const totalMoneyCart = (
    cart: {
        product: {
            id: string
            name: string
            image: string
            size: string
            price: number
        }
        quantity: number
    }[],
) => {
    if (cart) {
        return cart.reduce((pre, cur) => {
            return pre + cur.product.price * cur.quantity
        }, 0)
    }
    return 0
}

export const convertTimeStamp = (time_stamp: number) => {
    let date = new Date(time_stamp * 1000)

    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    // let second = date.getSeconds()

    return { minute, hour, day, month, year }
}

export const formatDate = (inputDate: string) => {
    const date = new Date(inputDate)

    const hours = date.getHours()
    const minutes = date.getMinutes()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const formattedHours = hours.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedDay = day.toString().padStart(2, '0')
    const formattedMonth = month.toString().padStart(2, '0')

    return `${formattedHours}:${formattedMinutes} ${formattedDay}/${formattedMonth}/${year}`
}

export const convertVNDToUSD = (amountInVND: number, exchangeRate: number) => {
    if (exchangeRate <= 0 || amountInVND <= 0) {
        throw new Error('Invalid exchange rate or amount.')
    }

    const amountInUSD = amountInVND / exchangeRate
    return parseFloat(amountInUSD.toFixed(2))
}

export const getAllCity = async () => {
    const citys = await axios.get('https://provinces.open-api.vn/api/p')
    return citys.data
}
export const getAllDistrictByCityCode = async (code: number) => {
    const districts = await axios.get(
        `https://provinces.open-api.vn/api/p/${code}?depth=2`,
    )
    return districts.data.districts
}

export const getAllWardByDistrictCode = async (code: number) => {
    const wards = await axios.get(
        `https://provinces.open-api.vn/api/d/${code}?depth=2`,
    )
    return wards.data.wards
}
export const generateId = (length: number) => {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let id = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        id += characters.charAt(randomIndex)
    }

    return id
}
