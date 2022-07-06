export class AvailableAppointment{
	constructor(
		public id : number,
		public timeFromId : number,
		public timeToId : number,
		public timeFrom: string,
		public timeTo : string,
		public userId? :number,
	){}
	isFree() : boolean{
		return this.userId == undefined;
	}
}