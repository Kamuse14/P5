// DONNEES d'un produit
class Produit{
	constructor(data, type, target){
		this.name = data.name.split(" ")[0];
		this.nameLong = data.name;
		this.price = data.price/100;
		this.description = data.description;
		this.image = data.imageUrl;
		this.vernis = data.varnish;
		this.id = data._id;
		window.mvp.produits[this.name] = this;
		this.type = type;
		this.dom = document.createElement("produit");
		target.appendChild(this.dom);
		this.render();

	}
//bascule d'un rendu à un autre 
	render(){
		//console.log('hello1');
		this.dom.innerHTML = ``;
		switch (this.type) {
			case "liste":
        		this.renderListe();
		        break;
		    case "detail":
		    	console.log("coucou4");
        		this.renderDetail();
		        break;
		    default:
		        this.renderListe();
		        break;
		}
	}
// contenu de chaque produit dans sa mise en page "liste"
	renderListe(){ 
		console.log("coucou");
		this.dom.innerHTML += `
			<figure id="meuble${this.name}" class="meuble" onclick="initPage('produit')" >
				<img src="${this.image}" alt="${this.nameLong}" onclick="swal('Bravo!', 'Vous avez cliqué sur une image.', 'success')"/>
				<figcaption>${this.nameLong}</figcaption>			
				<h3>${this.price}€</h3>	
			</figure>
		`;
	}
// contenu du produit sélectionné
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
					<button id="add-panier" type="submit" onclick="initPage('commande')"><i class="fas fa-cart-plus"></i> Ajouter au panier</button>
				</div>	
			</figure>	
		`;
		console.log("coucou5");
	}

	
}