const getAllJugadoresCampo = async () => {
    return new Promise((resolve, reject) => {
        axios({
            method : 'GET',
            url : 'http://127.0.0.1:8000/api/jugadores'
        }).then(res => {
            resolve(res.data);
        }).catch(error => console.log(error));
    })
}
const rellenarJugadoresCampo = (jugadoresToAdd) => {
    let jugadoresCampo = document.getElementById('jugadores-campo');
    let fragment = document.createDocumentFragment();
    for (let jugador of jugadoresToAdd){
        let contenedorTarjeta = document.createElement('DIV');
        contenedorTarjeta.classList.add('contenedor-tarjeta');
        let jugadorCard = document.createElement('DIV');
        jugadorCard.classList.add('jugador-card');
        let imgCard = document.createElement('IMG');
        imgCard.classList.add('img-card-jugador');
        imgCard.src = `../media/jugador_perfil/${jugador.nombre}.png`;
        imgCard.onerror = obtenerSrcImagenCampo;
        jugadorCard.appendChild(imgCard);
        contenedorTarjeta.appendChild(jugadorCard);
        fragment.appendChild(contenedorTarjeta);
    }
    jugadoresCampo.appendChild(fragment);
}
const obtenerSrcImagenCampo = (e) => {
    e.target.src = '../media/img-not-found.png';
}
const cargarJugadoresCampo = async () => {
    let jugadoresCampo = await getAllJugadoresCampo();
    rellenarJugadoresCampo(jugadoresCampo);
}
cargarJugadoresCampo().then(res=>console.log('Jugadores cargados'));