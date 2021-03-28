package SerwisKomputerowy.model;

import SerwisKomputerowy.entity.Staff;
import SerwisKomputerowy.entity.User;

public class StaffForm {

    private int userId;

    private String username;

    private String password;

    private int staffId;

    private String firstname;

    private String lastname;

    private String phoneNumber;

    private String email;

    private int salary;

    public StaffForm(int userId, String username, String password, int staffId, String firstname, String lastname, String phoneNumber, String email, int salary) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.staffId = staffId;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.salary = salary;
    }

    public StaffForm() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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

    public User getUser(){
        return new User(userId,username,password);
    }

    public Staff getStaff(){
        return new Staff(staffId, userId, firstname, lastname, phoneNumber, email, salary);
    }

    public void setDataFromStaff(Staff staff){

        this.firstname = staff.getFirstname();
        this.lastname = staff.getLastname();
        this.phoneNumber = staff.getPhoneNumber();
        this.email = staff.getEmail();
        this.salary = staff.getSalary();
        this.userId = staff.getUserId();
        this.staffId = staff.getId();
    }

    public void setDataFromUser(User user){
        this.username = user.getUsername();
    }

}
