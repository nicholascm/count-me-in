class AuthController { 
    
    public static AngularDependencies = ['AuthService','$ionicLoading', '$location', AuthController]; 

    constructor(private servAuth: AuthService, private $ionicLoading, private $location) {
        
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
        this.$ionicLoading.show({
            template: "Logging you in"
        }); 
        this.servAuth.login({
            name: this.name, 
            email: this.username, 
            password: this.password
        }).then(
            (data) => {
                this.$ionicLoading.hide(); 
                console.log('success', data); 
                this.servAuth.storeToken(data); 
                this.$location.path('/#/tab/home'); 
            }, 
            (e)=>  {
                console.log('fail', e); 
                this.$ionicLoading.hide(); 
            });
    }
}

eventApp.controller('AuthController', AuthController.AngularDependencies); 