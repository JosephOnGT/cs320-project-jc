package org.acme;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;

@Path("/hello")
public class GreetingResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello RESTEasy";
    }

    @GET
    @Path("/personalized/{name}")
    @Produces(MediaType.TEXT_PLAIN)
    public String helloPersonalized(@PathParam("name") String name) {
        return "Hello " + name;
    }

    @POST
    @Path("/personalized")
    @Produces(MediaType.TEXT_PLAIN)
    @Consumes(MediaType.APPLICATION_JSON) // Accept JSON input
    @Transactional
    public String helloPersonalizedPost(Person person) {
        // Create UserName object with both first and last names
        UserName userName = new UserName(person.getFirstName(), person.getLastName());
        userName.persist();
        return "Hello " + person.getFirstName() + " " + person.getLastName() + "! Your name has been stored in the database.";
    }

    public static class Person {
        private String firstName;
        private String lastName;

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }
    }
}