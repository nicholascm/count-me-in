class PerformanceService {

    public static angularDependencies = [PerformanceService]; 

    private startTime; 

    private endTime; 

    public setStart() {
        this.startTime = Date.now(); 
    } 

    public setEnd() {
        this.endTime = Date.now(); 
    }

    public getTimeLoading() : string {
        return "Page Load Time: "+(this.endTime - this.startTime)/1000+" seconds"; 
    }
}


eventApp.service('PerformanceService', PerformanceService.angularDependencies); 
