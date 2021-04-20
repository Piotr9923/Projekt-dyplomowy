package SerwisKomputerowy.model.forms;

import javax.validation.constraints.NotBlank;

public class UpdateComputerCrashForm {

    private String description;

    private String status;

    private String crashMessage;

    private double cost;

    public UpdateComputerCrashForm() {
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
