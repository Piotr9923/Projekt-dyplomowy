package com.piotr.aplikacjaserwiskomputerowy.model;

public class Announcement {

    private int id;
    private String date;
    private String title;
    private String text;

    public Announcement(int id, String date, String title, String text) {
        this.id = id;
        this.date = date;
        this.title = title;
        this.text = text;
    }

    public int getId() {
        return id;
    }

    public String getDate() {
        return date;
    }

    public String getTitle() {
        return title;
    }

    public String getText() {
        return text;
    }
}
