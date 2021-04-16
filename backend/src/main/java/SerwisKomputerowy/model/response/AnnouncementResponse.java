package SerwisKomputerowy.model.response;

import SerwisKomputerowy.entity.Role;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;
import java.util.Set;

public class AnnouncementResponse {

    private int id;
    private String title;
    private String text;
    @JsonFormat(pattern="dd-MM-yyyy")
    private Date date;
    private String rolesNames;

    public AnnouncementResponse() {
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

    public String getRolesNames() {
        return rolesNames;
    }

    public void setRolesNames(Set<Role> roles) {

        String names="";

        for (Role role : roles) {
            if(role.getName().equals("CLIENT")) names = names + "Klienci, ";
            else if(role.getName().equals("STAFF")) names = names + "Pracownicy, ";
            else names = names + role.getName()+", ";
        }
        if(names.length()>2)
        names = names.substring(0,names.length()-2);
        this.rolesNames = names;
    }
}
