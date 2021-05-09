package com.piotr.aplikacjaserwiskomputerowy.model;

public class ComputerCrash {

    private int id;
    private String title;
    private String status;
    private String type;
    private String date;
    private double cost;

    public ComputerCrash(int id, String title, String status, String type, String date, double cost) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.type = type;
        this.date = date;
        this.cost = cost;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getStatus() {
        return status;
    }

    public String getType() {
        return type;
    }

    public String getDate() {
        return date;
    }

    public double getCost() {
        return cost;
    }
}
