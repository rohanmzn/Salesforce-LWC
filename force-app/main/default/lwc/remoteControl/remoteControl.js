import { LightningElement, wire } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import COUNT_UPDATED_CHANNEL from '@salesforce/messageChannel/Count_Updated__c';

export default class RemoteControl extends LightningElement {
  @wire(MessageContext)
  messageContext;
  handleIncrement() {
    // this.counter++;
    const payload = {
      operator: 'add',
      constant: 1
    };
    publish(this.messageContext, COUNT_UPDATED_CHANNEL, payload);
  }
  handleDecrement() {
    // this.counter--;
    const payload = {
      operator: 'subtract',
      constant: 1
    };
    publish(this.messageContext, COUNT_UPDATED_CHANNEL, payload);
  }
  handleMultiply(event) {
    const factor = event.detail;
     // this.counter *= factor;
    const payload = {
      operator: 'multiply',
      constant: factor
    };
    publish(this.messageContext, COUNT_UPDATED_CHANNEL, payload);
  }
}
/* 
Lightning Message Service (LMS)

You have three main parts working together:
            Message Channel → Count_Updated.messageChannel-meta.xml
            Publisher LWC → remoteControl
            Subscriber LWC → counts
Both components communicate without being directly connected, using Salesforce’s Lightning Message Service (LMS).

What happens:
When the component loads (connectedCallback()), it subscribes to the Count_Updated__c channel.
Whenever a message is published, Salesforce automatically calls handleMessage(message) with the payload.

The component:
Stores the old count in priorCount
Updates counter based on operator and constant
The HTML displays both counts dynamically.

📡 How Communication Flows
Example flow:
Step	Action	                    Publisher (remoteControl)	                Message Channel	        Subscriber (counts)
1	    User clicks Increment	    Creates { operator: 'add', constant: 1 }	Publishes it	        —
2	    LMS delivers the message	—	                                        via Count_Updated__c	Receives the message
3	    Counts component updates UI	—	                                        —	                    Updates counter and re-renders

All this happens instantly — no parent-child relationship required.
They can even be in different Lightning pages (like Record Pages, App Pages, or even Utility Bars).  
*/