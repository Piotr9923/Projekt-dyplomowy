package SerwisKomputerowy.model.forms;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class RegistrationClientForm {

    @NotBlank(message = "Musisz podać nazwę użytkownika!")
    private String username;

    @NotBlank(message = "Musisz podać hasło!")
    private String password;

    @NotBlank(message = "Musisz podać adres e-mail!")
    @Email(message = "Błędny format adresu e-mail!")
    private String email;

    public RegistrationClientForm() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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
}
