function Fetch_UF() {
    const apiKey = 'd6de0b53a079216792c02b5ddb80dc55ab2c142b'
    const api_url = `https://api.cmfchile.cl/api-sbifv3/recursos_api/uf?apikey=${apiKey}&formato=json`

    return fetch(api_url)
        .then(res => res.json())
        .then(data => {
            const uf_value = data.UFs[0].Valor;
            const uf_time_stamp = data.UFs[0].Fecha;
            return {uf_value, uf_time_stamp}
        });
}
