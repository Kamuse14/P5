var content = document.getElementById ('menu-content').innerHTML;
var sidebarBody = document.getElementById ('menu-sidebar-body');

console.log(content);
sidebarBody.innerHTML += content;