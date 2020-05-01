// Utilisation d'une promesse avec fetch pour effectuer une requête vers l'API

class Connector{
  /**
   * [constructor description]
   * @constructor
   * @param  {string} url adresse de l'api
   * @return {Constructor}  
   */
  constructor(url){
    this.url = url;
    window.mvp.dataBase = this;
  }

  /**
   * Gère les requêtes et les réponses de l'api en asynchrone pour récupérer les données des produits
   * @param  {string} chemin dernière partie de l'url
   * @return {produit:JSON}  retourne les données des produits  
   */
   async getData(chemin) {
    let data = await fetch(this.url+chemin)
      .then(async (response)=> {
        return await response.json();
      });
      return data; 
  }

  /**
   * Gère les requêtes et les réponses de l'api en asynchrone pour récupérer un orderId
   * @param  {string} chemin dernière partie de l'url de validation de commande
   * @param  {JSON} postdata le contact et le panier
   * @return {orderId.JSON}      retourne l'identifiant de commande
   */
  async postData(chemin, postdata) {
    let data = await fetch(this.url+chemin, {
	    headers: {
	       'Accept': 'application/json',
	       'Content-Type': 'application/json'
	     }, 
	    method: 'POST',
	    body : JSON.stringify(postdata)
    })
      	.then(async (response)=> {
	        return await response.json();
	      });
	    return data;  
  }
}
