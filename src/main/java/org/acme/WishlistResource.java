package org.acme;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/wishlists")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class WishlistResource {

    // Create a new wishlist
    @POST
    @Transactional
    public Response createWishlist(Wishlist wishlist) {
        wishlist.persist();  // Persist the new wishlist in the database
        return Response.status(Response.Status.CREATED).entity(wishlist).build();  // Return the created wishlist
    }

    // Retrieve all wishlists
    @GET
    public List<Wishlist> getAllWishlists() {
        return Wishlist.listAll();  // Return a list of all wishlists
    }

    // Retrieve a specific wishlist by ID
    @GET
    @Path("/{id}")
    public Wishlist getWishlist(@PathParam("id") Long id) {
        return Wishlist.findById(id);  // Find and return the wishlist with the specified ID
    }

    // Update a wishlist by ID (Partial updates allowed)
    @PATCH
    @Path("/{id}")
    @Transactional
    public Response updateWishlist(@PathParam("id") Long id, Wishlist updatedWishlist) {
        Wishlist existingWishlist = Wishlist.findById(id);  // Find the existing wishlist by ID

        // If wishlist not found, return 404 Not Found response
        if (existingWishlist == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        // Update the itemName if a new value is provided (null check for partial update)
        if (updatedWishlist.itemName != null) {
            existingWishlist.itemName = updatedWishlist.itemName;
        }

        // Update the description if a new value is provided (null check for partial update)
        if (updatedWishlist.description != null) {
            existingWishlist.description = updatedWishlist.description;
        }

        // Persist the changes made to the existing wishlist
        existingWishlist.persist();

        // Return the updated wishlist with a 200 OK response
        return Response.ok(existingWishlist).build();
    }

    // Delete a wishlist by ID
    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteWishlist(@PathParam("id") Long id) {
        boolean deleted = Wishlist.deleteById(id);  // Attempt to delete the wishlist by ID

        // If deletion was successful, return 204 No Content, otherwise return 404 Not Found
        if (deleted) {
            return Response.noContent().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}