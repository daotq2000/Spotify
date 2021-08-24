export const renderArtist = (artist) => {
    if (artist == undefined) {
        return 'N/A';
    }
    let value = ''
    if (artist != null || artist != undefined) {
        if (artist.length > 0) {
            artist.forEach((e, i) => {
                value += e.artists.fullName + ' & ';
            })
            if (value.length > 1) {
                return value.substring(0, value.length - 2);
            }
        }
    }

    return 'N/A';
}
export const isObject = (obj) => {
    return obj === Object(obj);
}
export const isString = (obj) => {
    return obj === String(obj);
}
 