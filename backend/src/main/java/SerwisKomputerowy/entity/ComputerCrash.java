package SerwisKomputerowy.entity;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "computer_crash")
public class ComputerCrash {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private Date date;

    @Column
    private String status;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private int clientId;

    @Column
    private double cost;

    @Column
    private String crashMessage;

    public ComputerCrash(int id, Date date, String status, String title, String description, int clientId, double cost, String crashMessage) {
        this.id = id;
        this.date = date;
        this.status = status;
        this.title = title;
        this.description = description;
        this.clientId = clientId;
        this.cost = cost;
        this.crashMessage = crashMessage;
    }

    public ComputerCrash() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public String getCrashMessage() {
        return crashMessage;
    }

    public void setCrashMessage(String crashMessage) {
        this.crashMessage = crashMessage;
    }
}