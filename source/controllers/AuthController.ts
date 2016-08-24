class AuthController { 
    
    public static AngularDependencies = ['AuthService','$ionicLoading', '$location', AuthController]; 

    constructor(private servAuth: AuthService, private $ionicLoading, private $location) {
        
    }

    public name: string; 
    public username: string; 
    public password: string; 

    private signup() {
        this.$ionicLoading.show({
            template: "Signing you up!"
        })
        this.servAuth.signup({
            name: this.name, 
            email: this.username, 
            password: this.password
        }).then((response) => {
            this.$ionicLoading.hide(); 
            console.log('success', response); 
            this.responseMessage = "Successful account creation, now just click sign in!";
        }, (error) => {
            this.$ionicLoading.hide(); 
            console.log('failure', error); 
            this.responseMessage = error.data.errors[0]; 
        });  
    }

    public responseMessage : string; 

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
                this.servAuth.storeUser(data); 

                this.$location.path('/#/tab/home'); 
            }, 
            (e)=>  {
                console.log('fail', e);
                let filteredError = e.data.error.replace('_', ' '); 
                this.responseMessage = filteredError; 
                this.$ionicLoading.hide(); 
            });
    }
}

eventApp.controller('AuthController', AuthController.AngularDependencies); 

