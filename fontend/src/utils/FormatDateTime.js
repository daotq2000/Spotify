export const getSecondsToMinutesAndSeconds = time => {
    if (time === 0) {
        return '0 : 00';
    }
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    if (seconds < 10) {
        return `${minutes}:0${seconds}`;
    } else {
        return `${minutes}:${seconds}`;
    }
};

export const formatDateTime = (date) => {
    if (date == null || date == undefined) {
        return '';
    }
    let temp = new Date(date);
    let hours = temp.getHours();
    let minutes = temp.getMinutes();
    let day = temp.getDate();
    let month = temp.getMonth();
    let year = temp.getFullYear();
    let result = '';
    if (hours < 10) {
        result += "0" + hours + ":"
    }
    else {
        result += hours + ":"
    }
    if (minutes < 10) {
        result += "0" + minutes + " "
    }
    else {
        result += minutes + " "
    }
    if (day < 10) {
        result += "0" + day + "/"
    }
    else {
        result += day + "/"
    }
    if (month + 1 < 10) {
        result += "0" + (month + 1) + "/"
    }
    else {
        result += (month + 1) + "/"
    }
    result += year
    return result;
}
export const formatDate = (date) => {
    if (date == null || date == undefined) {
        return '';
    }
    let temp = new Date(date);
    let day = temp.getDate();
    let month = temp.getMonth();
    let year = temp.getFullYear();
    let result = day+"/"+month+"/"+year;
    return result;
}