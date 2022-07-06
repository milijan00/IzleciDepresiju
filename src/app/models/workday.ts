import { AvailableAppointment } from "./availableAppointment";

export class Workday{
	constructor(
		public id : number,
		public name : string | undefined,
		public appointments : AvailableAppointment[]
	){}
	getAppointment(time: string ) : AvailableAppointment | undefined{
// this.madeAppointmentsTimeFrom.find(m => m == x.timeFrom) != undefined
		return this.appointments.find(x => x.timeFrom == time);
	}
	get madeAppointments(){
		return this.appointments.filter(x => x.userId != undefined);
	}
	isAppointmentFree(app : AvailableAppointment) : boolean{
		return this.madeAppointments.find(x => x.id == app.id || (app.timeFrom >= x.timeFrom && app.timeFrom < x.timeTo)) == undefined;
	}
}