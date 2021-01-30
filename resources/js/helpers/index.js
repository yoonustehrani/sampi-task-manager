export const setPriority = (id) => {
    switch(parseInt(id)) {
        case 1:
            return 'ضروری و مهم'
            break
        case 2:
            return 'ضروری و غیر مهم'
            break
        case 3:
            return 'غیر ضروری و مهم'
            break
        case 4:
            return 'غیر ضروری و غیر مهم'
            break
        default:
            break
    }
}

export const redirectTo = (url) => {
    window.location.href = url
}

export const getUser = (userId) => {
    return USER_ROUTE.replace('userId', userId);
}