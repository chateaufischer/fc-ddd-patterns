import Customer from "../../customer/entity/customer";
import CustomerAddressChangeEvent from "../../customer/event/customer-addres-change.event";
import CustomerAddresChangeEvent from "../../customer/event/customer-addres-change.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import CustomerAddresChangeHandler from "../../customer/event/handler/customer-addres-change-handler";
import SendConsoleLog1Handler from "../../customer/event/handler/send-console-log1-handler";
import SendConsoleLog2Handler from "../../customer/event/handler/send-console-log2-handler";
import Address from "../../customer/value-object/address";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests - Customer - Desafio", () => {
  
  it("should register an event handler - Customer", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler(); 
    const eventHandler2 = new SendConsoleLog2Handler(); 

    eventDispatcher.register("SendConsoleLog1Handler", eventHandler);
    eventDispatcher.register("SendConsoleLog1Handler", eventHandler);
    eventDispatcher.register("SendConsoleLog2Handler", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["SendConsoleLog1Handler"]
    ).toBeDefined();
    
    expect(eventDispatcher.getEventHandlers["SendConsoleLog1Handler"].length).toBe(2);
    expect(eventDispatcher.getEventHandlers["SendConsoleLog2Handler"].length).toBe(1);
    expect(
      eventDispatcher.getEventHandlers["SendConsoleLog1Handler"][1]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["SendConsoleLog2Handler"][0]
    ).toMatchObject(eventHandler2);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler(); 
    const eventHandler2 = new SendConsoleLog2Handler(); 

    eventDispatcher.register("SendConsoleLog1Handler", eventHandler);    
    eventDispatcher.register("SendConsoleLog2Handler", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["SendConsoleLog1Handler"][0]
    ).toMatchObject(eventHandler);
    expect(
      eventDispatcher.getEventHandlers["SendConsoleLog2Handler"][0]
    ).toMatchObject(eventHandler2);

    eventDispatcher.unregister("SendConsoleLog1Handler", eventHandler);
    eventDispatcher.unregister("SendConsoleLog2Handler", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["SendConsoleLog1Handler"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["SendConsoleLog1Handler"].length).toBe(
      0
    );

    expect(
      eventDispatcher.getEventHandlers["SendConsoleLog2Handler"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["SendConsoleLog2Handler"].length).toBe(
      0
    );

  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendConsoleLog1Handler(); 
    const eventHandler2 = new SendConsoleLog2Handler(); 

    eventDispatcher.register("SendConsoleLog1Handler", eventHandler);    
    eventDispatcher.register("SendConsoleLog2Handler", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["SendConsoleLog1Handler"][0]
    ).toMatchObject(eventHandler);

    expect(
      eventDispatcher.getEventHandlers["SendConsoleLog2Handler"][0]
    ).toMatchObject(eventHandler2);
   

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["SendConsoleLog1Handler"]
    ).toBeUndefined();

    expect(
      eventDispatcher.getEventHandlers["SendConsoleLog2Handler"]
    ).toBeUndefined();
  
  });

  it("should notify log event handlers", () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendConsoleLog1Handler();
      const eventHandler2 = new SendConsoleLog2Handler();
      const spyEventHandler = jest.spyOn(eventHandler, "handle");
      const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
  
      eventDispatcher.register("CustomerCreatedEvent", eventHandler);
      eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
  
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
      ).toMatchObject(eventHandler);  
      
      expect(
        eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
      ).toMatchObject(eventHandler2);

      const customerCreatedEvent = new CustomerCreatedEvent(null);
  
      eventDispatcher.notify(customerCreatedEvent);
  
      expect(spyEventHandler).toHaveBeenCalled();
      expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should notify change address event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerAddresChangeHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerAddressChangeEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangeEvent"][0]
    ).toMatchObject(eventHandler);

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "12345", "Floripa");  
    customer.changeAddress(address);      

    const customerAddressChangeEvent = new CustomerAddressChangeEvent(customer);

    eventDispatcher.notify(customerAddressChangeEvent);

    expect(spyEventHandler).toHaveBeenCalled();
});

});
