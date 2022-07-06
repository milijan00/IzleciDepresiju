import { Schedule } from "../models/schedule";

export interface ITherapist{
	id : number;
	roleId : number;
	firstname : string;
	lastname : string;
	phone : string;
	image : string;
	schedule : Schedule
	
}