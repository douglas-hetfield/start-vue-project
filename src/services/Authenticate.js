import Axios from "axios"

export const AccessToken = {
    get:{
        accessToken() {
            return localStorage.getItem('currentToken');
        }
    },

    set:{
        accessToken(token){
            localStorage.setItem('currentToken', token);
        }
    },

    login(email, password){
        const data = {
          grant_type: "password",
          client_id: 2,
          client_scret: "SawijDwOwe9rB55a958OygLf79srVk6jyI1Pb89B",
          email: email,
          password: password,
          scope: ""
        };
        
        console.log(data);
        Axios.post('http://localhost:8000/oauth/token', data).then(res => {
            return true;
        }
        , error => {
            return false;
        });
    },

    logout(){
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentToken');  
    }



}