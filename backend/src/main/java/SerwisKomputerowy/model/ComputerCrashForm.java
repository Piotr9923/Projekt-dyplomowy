package SerwisKomputerowy.model;

import javax.validation.constraints.NotBlank;

public class ComputerCrashForm {


    private int clientId;
    @NotBlank(message = "Musisz podać tytuł awarii!")
    private String title;
    @NotBlank(message = "Musisz podać opis awarii!")
    private String description;

    private String firstname;
    private String lastname;
    private String phoneNumber;
    private String email;

    public ComputerCrashForm() {
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
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

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
