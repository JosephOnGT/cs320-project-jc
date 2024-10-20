package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserNameResource {

    @POST
    @Transactional
    public Response createUser(UserName userName) {
        userName.persist();
        return Response.status(Response.Status.CREATED).entity(userName).build();
    }

    @GET
    public List<UserName> getAllUsers() {
        return UserName.listAll();
    }

    @GET
    @Path("/{id}")
    public UserName getUser(@PathParam("id") Long id) {
        return UserName.findById(id);
    }

    @PATCH
    @Path("/{id}")
    @Transactional
    public Response updateUser(@PathParam("id") Long id, UserName updatedUser) {
        UserName existingUser = UserName.findById(id);
        if (existingUser == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        existingUser.name = updatedUser.name;
        existingUser.lastName = updatedUser.lastName; // Don't forget to update last name
        existingUser.persist();  // Persist the changes
        return Response.ok(existingUser).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteUser(@PathParam("id") Long id) {
        boolean deleted = UserName.deleteById(id);
        if (deleted) {
            return Response.noContent().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}