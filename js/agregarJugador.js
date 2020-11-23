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
}
let equipos = [];

const btnAgregarJugador = document.getElementById('nuevo-jugador');
const selectEquipos = document.getElementById('select-equipos');
const formularioJugadores = document.getElementById('form-jugador');
const addEquipos = document.getElementById('addEquipo');

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

const cargarEquipos = async () => {
    let equiposData = await getAllEquipos();
    for (equipo of equiposData){
        equipos.push(new Equipo(equipo));
    }
    rellenarSelectEquipos(equipos);
    return 'Todos los equipos han sido agregados.';
}

const rellenarSelectEquipos = (equipos) => {
    let fragmento = document.createDocumentFragment();
    for (const equipo of equipos){
        let option = document.createElement('OPTION');
        option.value = equipo.id;
        option.textContent = equipo.nombre;
        fragmento.appendChild(option);
    }
    selectEquipos.appendChild(fragmento);
}

const cargaInicial = async () => {
    cargarEquipos().then(res=>console.log(res));
}

const guardarJugador = () => {
    console.log("Jugador guardado en la base de datos")
    let data = `
    {
        "numero" : "${formularioJugadores.numero.value}",
        "seccion" : "${formularioJugadores.seccion.value}",
        "edicion" : "${formularioJugadores.edicion.value}",
        "nombre" : "${formularioJugadores.nombre.value}",
        "apellidos" : "${formularioJugadores.apellidos.value}",
        "apodo" : "${formularioJugadores.apodo.value}",
        "fecha_ nacimiento" : "${formularioJugadores.nacimiento.value}",
        "altura" : "${formularioJugadores.altura.value}",
        "nacionalidad" : "${formularioJugadores.lugarNacimiento.value}",
        "equipo_id" : "${formularioJugadores.selectEquipos.value}"
    }`;
    console.log(data);
}

const agregarEquipo = (equipoSend) => {
    axios({
        method : 'POST',
        url : 'https://immense-mountain-28279.herokuapp.com/api/equipos',
        data : equipoSend
    })
}
let equipoToAdd = []
const prepararEquiposToAdd = () => {
    for (let equipo of equipoToAdd){
        agregarEquipo(equipo);
    }
}

cargaInicial();
btnAgregarJugador.addEventListener('click', guardarJugador);
//addEquipos.addEventListener('click', prepararEquiposToAdd);