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

    @POST
    @Transactional
    public Response createWishlist(Wishlist wishlist) {
        wishlist.persist();
        return Response.status(Response.Status.CREATED).entity(wishlist).build();
    }

    @GET
    public List<Wishlist> getAllWishlists() {
        return Wishlist.listAll();
    }

    @GET
    @Path("/{id}")
    public Wishlist getWishlist(@PathParam("id") Long id) {
        return Wishlist.findById(id);
    }

    @PATCH
    @Path("/{id}")
    @Transactional
    public Response updateWishlist(@PathParam("id") Long id, Wishlist updatedWishlist) {
        Wishlist existingWishlist = Wishlist.findById(id);
        if (existingWishlist == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        existingWishlist.itemName = updatedWishlist.itemName;
        existingWishlist.description = updatedWishlist.description;
        return Response.ok(existingWishlist).build();
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response deleteWishlist(@PathParam("id") Long id) {
        boolean deleted = Wishlist.deleteById(id);
        if (deleted) {
            return Response.noContent().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}