const iconoMenu = document.getElementById('icono-menu');
const menulateral = document.getElementById('menu-lateral');
const contenedorPrincipal = document.getElementById('contenedor-prueba');

const abrirOrCerrarMenu = () => {
    let menuDesplegado = document.getElementsByClassName('menu-lateral__selected');
    if (menuDesplegado.length > 0){
        cerrarMenu();
    }
    else{
        menulateral.classList.add('menu-lateral__selected')
        contenedorPrincipal.classList.add('prueba-menu__selected');
        iconoMenu.classList.add('icono-menu__selected');
    }
}
const cerrarMenu = () => {
    menulateral.classList.remove('menu-lateral__selected');
    contenedorPrincipal.classList.remove('prueba-menu__selected');
    iconoMenu.classList.remove('icono-menu__selected');
}

iconoMenu.addEventListener('click', abrirOrCerrarMenu);
contenedorPrincipal.addEventListener('click', cerrarMenu);