class AccountController { 
    
    public static AngularDependencies = ['AuthService', AccountController]; 

    constructor(private servAuth: AuthService) {
        if (this.servAuth.userLoggedIn()) {
            this.getUserInfo(); 
        }
    }

    public user; 
    
    public getUserInfo() {
        console.log(this.servAuth.getUserInfo()); 
        this.user = this.servAuth.getUserInfo(); 
    }

    public logOutCurrentUser() {
        this.servAuth.logout();
        console.log(this.servAuth.getToken());  
    }

    public userLoggedIn() : boolean {
        return this.servAuth.userLoggedIn() ? true : false ;
    }

}

eventApp.controller('AccountController', AccountController.AngularDependencies); 