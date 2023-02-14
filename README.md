# Event Sourcing and CQRS in TypeScript
This is a POC that I put together based on the Baeldung Java tutorial:

https://www.baeldung.com/cqrs-event-sourcing-java

One thing to note between the Java and TypeScript versions is that JavaScript's `Set` collection uses references to check if an object is already in the set. This means that primitive types are fine, but complex objects are not. As a result, my implementation is using `lodash` to add 'set-like' operations to Arrays.
