package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "`groups`")
public class Groups extends PanacheEntity {

    @Column(name = "group_name", nullable = false, length = 255)
    public String groupName;

    @Column(name = "budget", nullable = false)
    public Double budget;

    // Default constructor
    public Groups() {}

    // Parameterized constructor
    public Groups(String groupName, Double budget) {
        this.groupName = groupName;
        this.budget = budget;
    }

    // Getters and Setters
    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public Double getBudget() {
        return budget;
    }

    public void setBudget(Double budget) {
        this.budget = budget;
    }
}