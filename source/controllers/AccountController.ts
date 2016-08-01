class AccountController { 
    
    public static AngularDependencies = ['AuthService', AccountController]; 

    constructor(private servAuth: AuthService) {

    }

    public logOutCurrentUser() {
        this.servAuth.logout();
        console.log(this.servAuth.getToken());  
    }

}

eventApp.controller('AccountController', AccountController.AngularDependencies); 