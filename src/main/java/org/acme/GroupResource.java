package org.acme;

import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.transaction.Transactional;  // Import the transactional annotation

@Path("/groups")
public class GroupResource {

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional  // Add this annotation
    public Response createGroup(Groups group) {
        group.persist();  // This will now work within a transaction
        return Response.ok(group).status(Response.Status.CREATED).build();
    }
}