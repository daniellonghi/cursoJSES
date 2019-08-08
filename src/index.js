import api from './api';

class App {
    constructor(){
        this.repositories = [];
        this.formEl = document.getElementById("repo-form");
        this.inputEl = document.querySelector("input[name=repository]");
        this.listEl = document.getElementById("repo-list");
        this.registerHandles();
    }
    
    registerHandles() {
        this.formEl.onsubmit = event => this.addRepository(event);
    }
    
    async addRepository(event) {
        event.preventDefault();
        const repoInput = this.inputEl.value;
        
        if (repoInput.length == 0){
            return;
        }else{
            this.setLoading();
            try {
                const response = await api.get(`/repos/${repoInput}`);
                const {name, description, html_url, owner: {avatar_url}} = response.data;
                
                this.repositories.push({
                    name,
                    description,
                    avatar_url,
                    html_url
                });
                this.inputEl.value = "";
                this.render();
            } catch (error) {
                alert("Repositorio não existe.");
            }
            this.setLoading(false);
        }
    }

    setLoading(loading = true) {
        if (loading === true){
            let elLoading = document.createElement("span");
            elLoading.appendChild(document.createTextNode("Carregando..."));
            elLoading.setAttribute("id", "loading");
            this.formEl.appendChild(elLoading);
        }else{
            document.getElementById("loading").remove();
        }
    }
    
    render(){
        this.listEl.innerHTML = "";
        this.repositories.forEach(repo => {
            let imgEl = document.createElement("img");
            imgEl.setAttribute("src", repo.avatar_url);
            
            let titleEl = document.createElement("strong");
            titleEl.appendChild(document.createTextNode(repo.name));
            
            let descEl = document.createElement("p");
            descEl.appendChild(document.createTextNode(repo.description));
            
            let aEl = document.createElement("a");
            aEl.setAttribute("href",repo.html_url);
            aEl.setAttribute("target","_blank");
            aEl.appendChild(document.createTextNode("Acessar"));
            
            let liEl = document.createElement("li");
            liEl.appendChild(imgEl);
            liEl.appendChild(titleEl);
            liEl.appendChild(descEl);
            liEl.appendChild(aEl);
            
            this.listEl.appendChild(liEl);
        });
    }
}

new App();