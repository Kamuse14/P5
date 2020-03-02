let content = document.getElementById('menu-content');
let sidebarBody = document.getElementById('menu-sidebar-body');

let button = document.getElementById('menu-button');
let overlay = document.getElementById('menu-overlay');
let activatedClass = 'menu-activated';

sidebarBody.innerHTML += content.innerHTML;

button.addEventListener('click', function(e) {
    e.preventDefault();
    this.parentNode.classList.add(activatedClass);
});

overlay.addEventListener('click', function(e) {
    e.preventDefault();
   this.parentNode.classList.remove(activatedClass);
});