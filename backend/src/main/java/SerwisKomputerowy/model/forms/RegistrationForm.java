package SerwisKomputerowy.model.forms;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class RegistrationForm {

    @NotBlank(message = "Musisz podać nazwę użytkownika!")
    private String username;
    @NotBlank(message = "Musisz podać hasło!")
    private String password;
    @NotBlank(message = "Musisz  podać imię!")
    private String firstname;
    @NotBlank(message = "Musisz podać nazwisko!")
    private String lastname;
    @NotBlank(message = "Musisz podać numer telefonu!")
    @Pattern(regexp="(^$|[0-9]{9})",message = "Błędny format numeru telefonu!")
    private String phoneNumber;
    @NotBlank(message = "Musisz podać adres e-mail!")
    @Email(message = "Błędny format adresu e-mail!")
    private String email;


    public RegistrationForm() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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
