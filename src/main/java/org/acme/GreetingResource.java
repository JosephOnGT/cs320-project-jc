package org.acme;

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
    public String helloPersonalizedPost(Person p) {
        return "Hello " + p.getFirstName() + " " + p.getLastName();
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