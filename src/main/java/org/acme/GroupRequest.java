package org.acme;

import java.util.List;

public class GroupRequest {
    public String groupName;
    public Double budget;
    public List<Long> userIds; // List of user IDs selected for the group

    // Default constructor
    public GroupRequest() {}

    // Parameterized constructor
    public GroupRequest(String groupName, Double budget, List<Long> userIds) {
        this.groupName = groupName;
        this.budget = budget;
        this.userIds = userIds;
    }
}
