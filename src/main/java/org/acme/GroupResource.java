package org.acme;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.transaction.Transactional;

import java.util.List;

@Path("/groups")
public class GroupResource {

    // Existing POST method to create a new group
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response createGroup(Groups group) {
        group.persist();
        return Response.ok(group).status(Response.Status.CREATED).build();
    }

    // New GET method to retrieve all groups
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllGroups() {
        List<Groups> groups = Groups.listAll();
        return Response.ok(groups).build();
    }


}