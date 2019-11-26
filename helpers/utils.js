exports.get_date_mysql = function (date) {
    return date.replace('T', ' ').substr(0, date.length - 5);
}

exports.firstOrDefault = function (arr) {
    return arr ? arr[0] ? arr[0] : null : null;
}