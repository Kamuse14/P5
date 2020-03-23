// HEADER - menu hamburger
class Burger{
  constructor(target){
    this.dom = document.createElement("burger");
    target.appendChild(this.dom);
    this.content=[];
    window.mvp.burger = this;
    this.menu = document.getElementById('menu-button');
    this.menu.onclick = this.changeAffichage.bind(this);
    this.minified = true;
    this.render();
  }

  render(){//si minified est vraie alors on affiche le petit burger, sinon le burger est déplié
    if (this.minified) return this.renderSmallBurger();
    this.renderBurger();
  }
 
  changeAffichage(){
    this.minified = ! this.minified;
    this.render();
  }

  renderSmallBurger(){
    this.dom.innerHTML = `<div></div>`;
    this.dom.className = "smallburger";
    //essayer remove.renderBurger ?
  }

  renderBurger(){
    this.dom.innerHTML = `
      	<ul class="accordion-inner"> 
			<li><a  href="index.html"><i class="fas fa-home"></i> Accueil</a></li>
			<li><a href="panier.html"><i class="fas fa-shopping-cart"></i> Panier</a></li>
		</ul>
`;
    this.dom.className = "bigburger";
  }
}