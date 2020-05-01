class Produit{
	/**
	 * Le constructeur de la classe
	 * @constructor
	 * @param  {JSON} data les données de chaque produit
	 * @param  {} type forme de l'affichage (en liste ou en détail)
	 * @param  {HTMLelement} target l'endroit où sera injecté le composant
	 * @return {Produit}
	 */
	constructor(data, type, target){
		this.name = data.name.split(" ")[0]; // seuls les charactères avant l'espace sont pris en compte
		this.nameLong = data.name;
		this.price = data.price/100;
		this.description = data.description;
		this.image = data.imageUrl;
		this.vernis = data.varnish;
		this.id = data._id;

		window.mvp.products[this.name] = this;
		this.type = type;
		this.dom = document.createElement("produit");
		target.appendChild(this.dom);
		this.render();
	}

	/**
	 * Génère le html du composant. Décide le bon affichage en fonction de this.type
	 * @return {void}
	 */
	render(){
		this.dom.innerHTML = ``;
		switch (this.type) {
			case "liste":
        		this.renderListe();
		        break;
		    case "detail":
        		this.renderDetail();
		        break;
		    default:
		        this.renderListe();
		        break;
		}
	}

	/**
	 * Génère le rendu html de chaque produit dans sa mise en page type = "liste"
	 * @return {HTMLelement} affichage liste des produits
	 */
	renderListe(){ 
		this.dom.innerHTML += `
			<figure id="meuble${this.name}" class="meuble" onclick="window.mvp.page.change('produit/${this.name}')">
				<img src="${this.image}" alt="${this.nameLong}"/>
				<figcaption>${this.nameLong}</figcaption>			
				<h3>${this.price}€</h3>	
			</figure>
		`;
	}

	/**
	 * Génère le rendu html du produit sélectionné 
	 * @return {HTMLelement} affichage du produit sélectionné
	 */
	renderDetail(){
		let vernis = ""; 
		for (let i=0; i<this.vernis.length; i++) {
			vernis += `<option value="${this.vernis[i]}">${this.vernis[i]}</option>`;
		}
		
		this.dom.innerHTML = `
			<figure id=${this.name}>
				<img src="${this.image}" alt="${this.nameLong}"/>
				<div id="${this.name}content">
					<figcaption>${this.nameLong}</figcaption>
					<p>${this.description}</p>
					<select id="mon_vernis">
						<option selected>-- Choix du vernis --</option>
						${vernis}
					</select>
				</div>
				<div id="addbtn">
					<h3>${this.price}€</h3>	
					<button id="add-panier" onclick="window.mvp.panier.ajouteProduit({name: '${this.name}', nameLong: '${this.nameLong}', id: '${this.id}', image: '${this.image}', price: '${this.price}'})"><i class="fas fa-cart-plus"></i> Ajouter au panier</button>
				</div>	
			</figure>	
		`;
	}

	/**
	 * Supprime les données du produit et son noeud html
	 * @return {void}
	 */
	die(){
		this.dom.parentNode.removeChild(this.dom);
		delete(window.mvp.products[this.name]);
	}

}


 
  
  