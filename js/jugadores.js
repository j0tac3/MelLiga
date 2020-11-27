const tablaJugadores = document.getElementById('table-container');
const btnLista = document.getElementById('btn-lista');

const mostarOcultarTablaJugadores = () => {
    let isTableVisible = document.getElementsByClassName('table-container__oculta');
    if (isTableVisible.length > 0){
        tablaJugadores.classList.replace('table-container__oculta', 'table-container__visible');
        btnLista.textContent = "Ocultar Jugadores";
    }   
    else {
        tablaJugadores.classList.replace('table-container__visible', 'table-container__oculta');
        btnLista.textContent = "Mostrar Jugadores";
    }
    tablaJugadores.focus();
}

btnLista.addEventListener('click', mostarOcultarTablaJugadores);