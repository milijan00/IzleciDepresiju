import { Subscription } from "rxjs";

export class SubscriptionManager{
	private subs : Subscription[] = [];

	add(s : Subscription){
		this.subs.push(s);
	}
	unsubscribeAll(){
		this.subs.forEach(s => s.unsubscribe());
	}
}
