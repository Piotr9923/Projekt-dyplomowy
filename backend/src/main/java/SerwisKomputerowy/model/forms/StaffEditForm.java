package SerwisKomputerowy.model.forms;

import SerwisKomputerowy.entity.Staff;
import SerwisKomputerowy.entity.User;
import javax.validation.constraints.*;

public class StaffEditForm {
    @Pattern(regexp = "^(?!\\s*$).+", message = "Musisz podać nazwę użytkownika!")
    private String username;
    @Pattern(regexp = "^(?!\\s*$).+", message = "Musisz podać hasło!")
    private String password;

    private int staffId;
    @NotBlank(message = "Musisz podać imię!")
    private String firstname;
    @NotBlank(message = "Musisz podać nazwisko!")
    private String lastname;
    @NotBlank(message = "Musisz podać numer telefonu!")
    @Pattern(regexp="(^$|[0-9]{9})",message = "Błędny format numeru telefonu!")
    private String phoneNumber;
    @NotBlank(message = "Musisz podać adres email!")
    @Email(message = "Błędny format adresu e-mail")
    private String email;
    @Min(value = 1,message = "Wysokość wynagrodzenia musi wynosić minimum 1!")
    private int salary;

    public StaffEditForm(String username, String password, int staffId, String firstname, String lastname, String phoneNumber, String email, int salary) {
        this.username = username;
        this.password = password;
        this.staffId = staffId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.salary = salary;
    }

    public StaffEditForm() {
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

    public int getStaffId() {
        return staffId;
    }

    public void setStaffId(int staffId) {
        this.staffId = staffId;
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

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public void setDataFromStaff(Staff staff){

        this.firstname = staff.getFirstname();
        this.lastname = staff.getLastname();
        this.phoneNumber = staff.getPhoneNumber();
        this.email = staff.getEmail();
        this.salary = staff.getSalary();
        this.staffId = staff.getId();
    }

    public void setDataFromUser(User user){
        this.username = user.getUsername();
    }

}
