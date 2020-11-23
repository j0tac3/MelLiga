const iconoMenu = document.getElementById('icono-menu');
const menulateral = document.getElementById('menu-lateral');

const abrirOrCerrarMenu = () => {
    menulateral.classList.add('menu-lateral__selected')
}
const cerrarMenu = () => {
    menulateral.classList.remove('menu-lateral__selected')
}

iconoMenu.addEventListener('click', abrirOrCerrarMenu);
menulateral.addEventListener('mouseleave', cerrarMenu);