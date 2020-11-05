class Equipo{
    constructor(id, escudo, nombre, estadio, fundacion, presidente){
        this.id = id;
        this.escudo = escudo;
        this.nombre = nombre;
        this.estadio = estadio;
        this.fundacion = fundacion;
        this.presidente = presidente;
    }
}
let equipos = new Array
let equipo = new Equipo;

const menuEquipos = document.getElementById('menu-equipos');
const selectEquipos = document.getElementById('selectEquipos');

const getAllEquipos = async () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:8000/api/equipos',
        }).then(res=> {
            resolve(res.data);
        }).catch(error =>  console.error(error));
    })
}
const rellenarMenuEquipos = (equipos) => {
    let fragment = document.createDocumentFragment();
    for (const equipo of equipos){
        let escudo = document.createElement('IMG');
        escudo.src = `media/${equipo.escudo}`;
        escudo.alt = equipo.nombre;
        escudo.classList.add('icono-menu-equipo');
        fragment.appendChild(escudo);
    }
    menuEquipos.appendChild(fragment);
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
const cargarEquipos = async () => {
    equipos = await getAllEquipos();
    rellenarMenuEquipos(equipos);
    rellenarSelectEquipos(equipos);
    return 'Todos los equipos han sido agregados.';
}

cargarEquipos().then(res=>console.log(res));