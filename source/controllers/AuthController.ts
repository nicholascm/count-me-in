class AuthController { 
    
    public static AngularDependencies = ['AuthService', '$location', AuthController]; 

    constructor(private servAuth: AuthService, private $location) {
        
    }

    public name: string; 
    public username: string; 
    public password: string; 

    private signup() {
        this.servAuth.signup({
            name: this.name, 
            email: this.username, 
            password: this.password
        }).then(() => alert("success"), () => alert("failure")); 
    }

    private login() {
        this.servAuth.login({
            name: this.name, 
            email: this.username, 
            password: this.password
        }).then(
            (data) => {
                console.log('success', data); 
                this.servAuth.storeToken(data); 
                this.$location('/#/tab/home'); 
            }, 
            (e)=> console.log('fail', e)); 
    }
}

eventApp.controller('AuthController', AuthController.AngularDependencies); 