import { Workday } from "./workday";

export class Schedule {
	
	constructor(
		public therapistId : number,
		public  workdays : Workday[]
		
	){}

	getUniqueWorkdays(workdays : Workday[])  : void{
		function workdayNotInList(id : number) : boolean{
			return uniqueWorkdays.find(x => x.id == id) == undefined;
		}

		var uniqueWorkdays: Workday[] = [];

		if(workdays.length == 1){
			this.workdays = workdays;
			return;
		}

		for(var i = 0; i < workdays.length; i++){
				if(workdayNotInList(workdays[i].id) ){
					uniqueWorkdays.push(workdays[i]);
				}
		}

		this.workdays =  uniqueWorkdays;
	}
	getWorkday(name : string) : Workday | undefined{
	  return this.workdays.find(x => x.name == name) ;
	}
}