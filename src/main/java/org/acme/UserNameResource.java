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

    // Create a new user
    @POST
    @Transactional
    public Response createUser(UserName userName) {
        userName.persist();  // Persist the user in the database
        return Response.status(Response.Status.CREATED).entity(userName).build();  // Return the created user
    }

    // Retrieve all users
    @GET
    public List<UserName> getAllUsers() {
        return UserName.listAll();  // Return a list of all users
    }

    // Retrieve a specific user by ID
    @GET
    @Path("/{id}")
    public UserName getUser(@PathParam("id") Long id) {
        return UserName.findById(id);  // Find and return the user with the specified ID
    }

    // Update a user by ID (Partial updates allowed)
    @PATCH
    @Path("/{id}")
    @Transactional
    public Response updateUser(@PathParam("id") Long id, UserName updatedUser) {
        UserName existingUser = UserName.findById(id);  // Find the existing user by ID

        // If user not found, return 404 Not Found response
        if (existingUser == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        // Update the name field if a new value is provided (null check for partial update)
        if (updatedUser.name != null) {
            existingUser.name = updatedUser.name;
        }

        // Update the lastName field if a new value is provided (null check for partial update)
        if (updatedUser.lastName != null) {
            existingUser.lastName = updatedUser.lastName;
        }

        // Persist the changes made to the existing user
        existingUser.persist();

        // Return the updated user with a 200 OK response
        return Response.ok(existingUser).build();
    }

    // Delete a user by ID
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteUser(@PathParam("id") Long id) {
        boolean deleted = UserName.deleteById(id);  // Attempt to delete the user by ID

        // If deletion was successful, return 204 No Content, otherwise return 404 Not Found
        if (deleted) {
            return Response.noContent().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}