import { Schedule } from "./schedule";

export class Therapist {
	constructor(
		public id : number,
		public firstname : string, 
		public lastname : string,
		public  phone : string,
		public image : string,
		public schedule : Schedule
		){}

}