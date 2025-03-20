import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddresChangeEvent from "../customer-addres-change.event";

export default class CustomerAddresChangeHandler
  implements EventHandlerInterface<CustomerAddresChangeEvent>
{
  handle(event: CustomerAddresChangeEvent): void {

    const {id, name, email, Address} = event.eventData;
    const {street, number, zip, city} = Address;

    console.log(`Endereço do cliente: ${id}, ${name} foi alterado para ${street}, ${number}, ${zip}, ${city}`);    
  }
}
