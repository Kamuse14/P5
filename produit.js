class Produit{
	constructor(data, target){
		this.name = data.name.split(" ")[0];
		this.nameLong = data.name;
		this.price = data.price;
		this.description = data.description;
		this.image = data.imageUrl;
		window.produits[this.name] = this;

		this.DOM = document.createElement("figure");
		this.DOM.id = this.name;
		target.appendChild(this.DOM);
		this.affichageAccueil();
	}
	affichageAccueil(){
		this.DOM.innerHTML = `
			<img src="${this.image}" alt="${this.nameLong}"/>
			<figcaption>${this.nameLong}</figcaption>
			<h3>${this.price}€</h3>			
		`;
		this.DOM.className = "meuble";
	}
}