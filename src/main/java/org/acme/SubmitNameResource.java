package org.acme;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.transaction.Transactional;

@Path("/submit-name")
public class SubmitNameResource {
    @POST
    @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    public Response submitName(UserName user) {
        // Check if the name is empty
        if (user.name == null || user.name.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Please enter a name").build();
        }

        // Check if the name contains spaces
        if (user.name.contains(" ")) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Please enter only one name. Make sure your name does not contain spaces.").build();
        }

        try {
            // Create name in database
            user.persist();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Error storing the name: " + e.getMessage()).build();
        }

        // Return response
        return Response.ok("Hello, " + user.name + "! Your name has been stored in the database.").build();
    }


}
