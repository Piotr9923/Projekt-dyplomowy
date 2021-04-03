package SerwisKomputerowy.model;

import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

public class AnnouncementForm {

    @NotBlank(message = "Musisz podać tytuł ogłoszenia!")
    private String title;
    @NotBlank(message = "Musisz podać tekst ogłoszenia!")
    private String text;
    private Date date;
    List<String> roles;

    public AnnouncementForm(String title, String text, Date date, List<String> roles) {
        this.title = title;
        this.text = text;
        this.date = date;
        this.roles = roles;
    }

    public AnnouncementForm() {
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
