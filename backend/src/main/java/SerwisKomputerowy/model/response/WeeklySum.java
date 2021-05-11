package SerwisKomputerowy.model.response;

import java.sql.Date;

public class WeeklySum {

    private int sum;
    private Date date;

    public WeeklySum(int sum, Date date) {
        this.sum = sum;
        this.date = date;
    }

    public WeeklySum() {
    }

    public int getSum() {
        return sum;
    }

    public void setSum(int sum) {
        this.sum = sum;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
