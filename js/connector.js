// Utilisation d'une promesse avec fetch pour effectuer une requête vers l'API

class Connector{
  constructor(url){
    this.url = url;
    window.mvp.dataBase = this;
  }

  async getData(chemin) {
    let data = await fetch(this.url+chemin)
      .then(async (response)=> {
        return await response.json();
      });
      return data; 
  }

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
