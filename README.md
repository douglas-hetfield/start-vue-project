# Fullstack project with Laravel 6 and Vue 4.1.2

 - criação e configuração do projeto com vue:
    - instalação do vue
    - instalação do gerador de componentes
    - instalação do bootstrap
    - instalação do Axios

### instalar Vue JS:
    npm install -g @vue/cli
-   Obs: precisa ter o Node e o npm instalado anteriormente
#### criar projeto:
    vue create my-project
### instalando o gerador de componente para o Vue Js:
- Diferente do angular/cli o Vue não possui um comando para geração de componente nativo, este precisa ser instalado
```sh
npm install -g vue-generate-component
```

#### criando um componente:
```sh
    vgc nome-do-componente
```

### adicionando bootstrap:
    npm install vue bootstrap-vue bootstrap
- faça as seguintes importações no arquivo main.js dentro da pasta src.
    ``` import 'bootstrap'; ```
    ``` import 'bootstrap/dist/css/bootstrap.min.css'; ```

### instalando Axios para Http client:
    npm install --save axios vue-axios
    
- faça as seguintes importações no arquivo onde será feito a requisição da API
``` import Vue from 'vue' ```
``` import axios from 'axios' ```
``` import VueAxios from 'vue-axios' ```
```Vue.use(VueAxios, axios) ```

## Iniciando a aplicação 
    cd nome-do-diretorio-do-projeto
    npm run serve
