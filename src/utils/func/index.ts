import axios from 'axios'
import React from 'react'

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
            img: string
            classify: {
                size: string
                id: string
            }
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
