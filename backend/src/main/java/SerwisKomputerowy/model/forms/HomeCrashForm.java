package SerwisKomputerowy.model.forms;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class HomeCrashForm {

    @NotBlank(message = "Musisz podać miasto!")
    private String city;

    @Pattern(regexp="(^$|[0-9]{2}[\\-][0-9]{3})",message = "Błędny format kodu pocztowego!")
    @NotBlank(message = "Musisz podać kod pocztowy!")
    private String code;

    @NotBlank(message = "Musisz podać ulicę!")
    private String street;

    @NotBlank(message = "Musisz podać nazwę awarii!")
    private String title;

    @NotBlank(message = "Musisz podać opis awarii!")
    private String description;

    public HomeCrashForm(@NotBlank(message = "Musisz podać miasto!") String city, @NotBlank(message = "Musisz podać kod pocztowy!") String code, @NotBlank(message = "Musisz podać ulicę!") String street, @NotBlank(message = "Musisz podać nazwę awarii!") String title, @NotBlank(message = "Musisz podać opis awarii!") String description) {
        this.city = city;
        this.code = code;
        this.street = street;
        this.title = title;
        this.description = description;
    }

    public HomeCrashForm() {
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
}
