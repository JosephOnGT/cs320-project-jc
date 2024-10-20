package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "wishlists")
public class Wishlist extends PanacheEntity {
    public String itemName;
    public String description; // Optional field for a description of the item

    public Wishlist() {}

    public Wishlist(String itemName, String description) {
        this.itemName = itemName;
        this.description = description;
    }

    @Override
    public String toString() {
        return itemName;
    }
}