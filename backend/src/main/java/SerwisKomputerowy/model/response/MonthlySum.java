package SerwisKomputerowy.model.response;

public class MonthlySum {

    private String date;
    private String count;

    public MonthlySum(String date, String count) {
        this.date = date;
        this.count = count;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count;
    }

    public String getNextDate(){
        String nextDate="";
        int month,year;
        String []date = this.date.split("-");

        month = Integer.parseInt(date[0]);
        year = Integer.parseInt(date[1]);

        if(month == 12){
            month = 1;
            year = year + 1;
        }
        else{
            month = month + 1;
        }

        nextDate = ""+month+"-"+year;

        return nextDate;

    }
}
