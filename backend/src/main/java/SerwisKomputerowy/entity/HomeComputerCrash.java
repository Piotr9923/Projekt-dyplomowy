package SerwisKomputerowy.entity;

import javax.persistence.*;
import java.util.Date;

@Entity(name = "home_crash")
public class HomeComputerCrash {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private int clientId;

    @Column
    private String city;

    @Column
    private String code;

    @Column
    private String street;

    @Column
    private String status;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private Date date;

    @Column
    private String crashMessage;

    @Column
    private double cost;

    public HomeComputerCrash() {
    }

    public HomeComputerCrash(int id, int clientId, String city, String code, String street, String status, String title, String description, Date date, String crashMessage, double cost) {
        this.id = id;
        this.clientId = clientId;
        this.city = city;
        this.code = code;
        this.street = street;
        this.status = status;
        this.title = title;
        this.description = description;
        this.date = date;
        this.crashMessage = crashMessage;
        this.cost = cost;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
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

    public String getCrashMessage() {
        return crashMessage;
    }

    public void setCrashMessage(String crashMessage) {
        this.crashMessage = crashMessage;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }
}
