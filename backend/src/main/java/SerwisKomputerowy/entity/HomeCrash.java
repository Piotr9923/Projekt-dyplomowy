package SerwisKomputerowy.entity;

import javax.persistence.*;

@Entity(name = "home_crash")
public class HomeCrash{

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
    private String address;

    @Column
    private String status;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private String crashMessage;

    @Column
    private double cost;

    public HomeCrash() {
    }

    public HomeCrash(int id, int clientId, String city, String code, String address, String status, String title, String description, String crashMessage, double cost) {
        this.id = id;
        this.clientId = clientId;
        this.city = city;
        this.code = code;
        this.address = address;
        this.status = status;
        this.title = title;
        this.description = description;
        this.crashMessage = crashMessage;
        this.cost = cost;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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
