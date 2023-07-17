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
    formattedNumber += ' ₫'
    return formattedNumber
}
