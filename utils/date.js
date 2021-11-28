export function getIndexByCurrentDay(array) {
    let day = new Date().getDay()
    day = day === 0  ? 7 : day
    return day - 1 < array.length ? day - 1 : array.length - 1
}