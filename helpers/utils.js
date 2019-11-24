exports.get_date_mysql = function(date){
    return date.replace('T', ' ').substr(0, date.length - 5);
}
