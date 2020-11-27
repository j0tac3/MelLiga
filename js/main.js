class Equipo{
    constructor(equipo){
        this.id = equipo.id;
        this.escudo = equipo.escudo;
        this.nombre = equipo.nombre;
        this.estadio = equipo.estadio;
        this.fundacion = equipo.fundacion;
        this.presidente = equipo.presidente;
        this.jugadores = [];
    }
    insertarJugador(jugador){
        this.jugadores.push(jugador);
    }
    insertarJugadores(jugadores){
        jugadores.forEach(jugador => {
            this.jugadores.push(jugador);
        });
    }
}
class Jugador{
    constructor(jugador){
        this.nombre = jugador.nombre;
        this.apellidos = jugador.apellidos;
        this.equipo_id = jugador.equipo_id;
        this.nacionalidad = jugador.nacionalidad;
    }
}
let equipos = [];
let jugadores = [];
let url = '../media/img-not-found.png';

const menuEquipos = document.getElementById('menu-equipos');
const playersContainer = document.getElementById('tarjetas-jugador');
const tarjetaJugador = document.getElementById('tarjeta-jugador');
const jugadoresCampo = document.getElementById('jugadores-campo');

/**************************** Equipos **************************/
const getAllEquipos = async () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: 'https://immense-mountain-28279.herokuapp.com/api/equipos',
            //url: 'http://127.0.0.1:8000/api/equipos',
        }).then(res=> {
            resolve(res.data);
        }).catch(error =>  console.error(error));
    })
}
const rellenarMenuEquipos = (equipos) => {
    let fragment = document.createDocumentFragment();
    for (const equipo of equipos){
        let elemento = document.createElement('LI');
        let escudo = document.createElement('IMG');
        let nombreEquipoNormalizado = getNombreEquipoNormalizado(equipo.id);
        escudo.src = `media/equipos/${nombreEquipoNormalizado}.png`;
        escudo.alt = equipo.nombre;
        escudo.classList.add('icono-menu-equipo');
        elemento.appendChild(escudo);
        fragment.appendChild(elemento);
    }
    menuEquipos.appendChild(fragment);
}
const cargarEquipos = async () => {
    let equiposData = await getAllEquipos();
    for (equipo of equiposData){
        equipos.push(new Equipo(equipo));
    }
    rellenarMenuEquipos(equipos);
    //rellenarSelectEquipos(equipos);
    return 'Todos los equipos han sido agregados.';
}
const getNombreEquipo = (equipo_id) => {
    for (let equipo of equipos){
        if (equipo.id == equipo_id){
            return equipo.nombre;
        }
    }
}
const getNombreEquipoNormalizado = (equipo_id) => {
    let equipoFind;
    for (let equipo of equipos){
        if (equipo.id == equipo_id){
            equipoFind = equipo;
            break;
        }
    }
    let nombreNormalizado = (equipoFind.nombre).normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    nombreNormalizado = nombreNormalizado.toLocaleLowerCase().replace(/ /g,'');
    return nombreNormalizado.replace('.','');
}
/**************************** Jugadores **************************/
const getAllJugadores = async () => {
    return new Promise((resolve, reject) => {
        axios({
            method : 'GET',
            url : 'https://immense-mountain-28279.herokuapp.com/api/jugadores'
            //url: 'http://127.0.0.1:8000/api/jugadores',
        }).then(res => {
            resolve(res.data);
        }).catch(error => console.log(error));
    })
}
const rellenarPlayersContainer = (jugadores) => {
    let nuevosJugadores = document.createDocumentFragment()
    let jugadoresEquipo = document.createDocumentFragment()
    let tarjetaJugadorCopia = tarjetaJugador.cloneNode(true);
    for (let equipo of equipos){
        for (let jugador of jugadores){
            if (jugador.equipo_id == equipo.id){
                let nuevoJugador = tarjetaJugadorCopia.cloneNode(true);
                nuevoJugador.appendChild(crearFrontalTarjeta(jugador, nuevoJugador.childNodes[1]));
                nuevosJugadores.appendChild(nuevoJugador);
            }
        }
        console.log(nuevosJugadores.childNodes.length)
        if (nuevosJugadores.childNodes.length > 0){
            let divEquipo = document.createElement('DIV');
            divEquipo.appendChild(nuevosJugadores);
            jugadoresEquipo.appendChild(divEquipo);
        }
    }
    playersContainer.removeChild(tarjetaJugador);
    playersContainer.appendChild(jugadoresEquipo);
    const imagenesJugadores = document.getElementsByClassName('imagen-jugador');
}
const crearFrontalTarjeta = (jugador, nuevoJugador) => {
    let nombreImagen = (`${jugador.nombre}-${jugador.apellidos}`).toLocaleLowerCase();
    nuevoJugador.childNodes[1].childNodes[1].src = `../media/jugadores/${nombreImagen}.jpg`;
    nuevoJugador.childNodes[1].childNodes[1].alt = `${jugador.nombre} ${jugador.apellidos}`;
    nuevoJugador.childNodes[1].childNodes[1].onerror = obtenerSrcImagen;
    let nombreEquipoNormalizado = getNombreEquipoNormalizado(jugador.equipo_id);
    nuevoJugador.childNodes[1].childNodes[3].textContent  = `${jugador.nombre} ${jugador.apellidos}`;
    nuevoJugador.childNodes[1].childNodes[5].src = `../media/${nombreEquipoNormalizado}.png`;
    nuevoJugador.classList.add(`nombre__jugador--${nombreEquipoNormalizado}`);
    return nuevoJugador;
}
const crearTraseraTarjeta = (jugador, tarjetaJugador) => {
    let traseraTarjeta = document.createElement('DIV');
    traseraTarjeta.classList.add('atras');

    tarjetaJugador.appendChild(traseraTarjeta);
}
const obtenerSrcImagen = (e) => {
    e.target.src = '../media/img-not-found.png';
}
const cargarJugadores = async () => {
    jugadores = await getAllJugadores();
    //rellenarPlayersContainer(jugadores);
    return 'Todos los jugadores han sido agregados.';
}
rellenarEquipoJugadores = (jugadores, equipo) => {
    let jugadoresEquipo = [];
    for (let jugador of jugadores) {
        if (equipo.id === jugador.equipo_id){
            equipo.jugadores.push(jugador);
            jugadoresEquipo.push(jugador);
        }
    }
    return jugadoresEquipo;
}
const cargarEquiposJugadores = async () => {
    for (let equipo of equipos) {
        rellenarEquipoJugadores(jugadores, equipo);
    }
}
const rellenarJugadoresCampo = (jugadoresToAdd) => {
    let fragment = document.createDocumentFragment();
    for (let jugador of jugadoresToAdd){
        if (jugador.seccion === 'Base'){
            let contenedorTarjeta = document.createElement('DIV');
            contenedorTarjeta.classList.add('contenedor-tarjeta');
            let jugadorCard = document.createElement('DIV');
            jugadorCard.classList.add('jugador-card');
            let imgCard = document.createElement('IMG');
            imgCard.classList.add('img-card-jugador');
            imgCard.src = `../media/jugador_perfil/${jugador.nombre}.png`;
            imgCard.onerror = obtenerSrcImagenCampo;
            let nombreJugador = document.createElement('SPAN');
            nombreJugador.textContent = `${jugador.apodo}`;
            nombreJugador.classList.add('nombre-jugador');
            jugadorCard.appendChild(imgCard);
            contenedorTarjeta.appendChild(jugadorCard);
            contenedorTarjeta.appendChild(nombreJugador);
            fragment.appendChild(contenedorTarjeta);
        }
    }
    jugadoresCampo.appendChild(fragment);
}
const obtenerSrcImagenCampo = (e) => {
    e.target.src = '../media/img-not-found.png';
}
const cargaInicial = async () => {
    cargarEquipos().then(res=>console.log(res));
    cargarJugadores().then(res => cargarEquiposJugadores())
}
const prepararAlineacion = (e) => {
    console.log(e.target.alt);
    let nombreEquipo = e.target.alt;
    for (let equipo of equipos){
        if (equipo.nombre === nombreEquipo){
            let nodos = jugadoresCampo.childNodes.length;
            for (let i = 0; i < nodos; i++){
                jugadoresCampo.removeChild(jugadoresCampo.firstChild);
            }
            rellenarJugadoresCampo(equipo.jugadores);
            rellenarTablaJugadores(equipo.jugadores);
            break;
        }
    }
    let elementsSelected = document.getElementsByClassName('icono-menu-equipo__selected');
    if (elementsSelected.length > 0) {
        elementsSelected[0].classList.remove('icono-menu-equipo__selected');
    }
    e.target.classList.add('icono-menu-equipo__selected');
}
const rellenarTablaJugadores = (jugadores) => {
    const tablaJugadores = document.getElementById('table-jugadores');
    let nodos = tablaJugadores.childNodes[3].childNodes.length;
    for (let i = 0; i < nodos; i++){
        tablaJugadores.childNodes[3].removeChild(tablaJugadores.childNodes[3].firstChild);
    }
    let fragment = document.createDocumentFragment();
    for (let jugador of jugadores) {
        if (jugador.seccion == 'Base'){
            let fila = document.createElement('TR');
            let columnNum = document.createElement('TD');
            columnNum.textContent = `${jugador.numero}`;
            let columnNombre = document.createElement('TD');
            columnNombre.textContent = `${jugador.apodo}`;
            let columnEdicion = document.createElement('TD');
            columnEdicion.textContent = `${jugador.edicion}ª`;
            let columnSeccion = document.createElement('TD');
            columnSeccion.textContent = `${jugador.seccion}`;
            let columnFalta = document.createElement('TD');
            let checkJugsdor = document.createElement('INPUT');
            checkJugsdor.type = 'checkbox';
            columnFalta.appendChild(checkJugsdor)
            fila.appendChild(columnNum);
            fila.appendChild(columnNombre);
            fila.appendChild(columnSeccion);
            fila.appendChild(columnEdicion);
            fila.appendChild(columnFalta);
            fragment.appendChild(fila)
        }
    }
    tablaJugadores.childNodes[3].appendChild(fragment)
}

cargaInicial();
menuEquipos.addEventListener("click", prepararAlineacion);