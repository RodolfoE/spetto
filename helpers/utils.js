exports.get_date_mysql = function (date) {
    return date.replace('T', ' ').substr(0, date.length - 5);
}

exports.firstOrDefault = function (arr) {
    return arr ? arr[0] ? arr[0] : null : null;
}

/**
 * dependendo da quantidade que o front-end manda, repetir o objeto no array de retorno.
 */
exports.quantificarArray = (array) => {
    let arrayRetorno = [];
    array.forEach(x => {
        for (let i = 0; i < x.qtd; i++) {            
            arrayRetorno.push(x);
        }
    });
    return arrayRetorno;
}