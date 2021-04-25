package SerwisKomputerowy.model.response;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

public class ComputerCrashListResponse {

    private int id;
    private String title;
    private String client;
    private String status;
    private String type;
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date date;
    private double cost;

    public ComputerCrashListResponse() {
    }

    public ComputerCrashListResponse(int id, String title, String client, String status, String type, Date date) {
        this.id = id;
        this.title = title;
        this.client = client;
        this.status = status;
        this.type = type;
        this.date = date;
    }

    public ComputerCrashListResponse(int id, String title, String client, String status, String type, Date date, double cost) {
        this.id = id;
        this.title = title;
        this.client = client;
        this.status = status;
        this.type = type;
        this.date = date;
        this.cost = cost;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
