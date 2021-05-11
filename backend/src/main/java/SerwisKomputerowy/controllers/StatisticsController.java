package SerwisKomputerowy.controllers;

import SerwisKomputerowy.model.response.MonthlySum;
import SerwisKomputerowy.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.DecimalFormat;
import java.text.Format;
import java.util.ArrayList;
import java.util.Formatter;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.TimeUnit;

@CrossOrigin
@RestController
@RequestMapping("/admin/statistics")
public class StatisticsController {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private StaffRepository staffRepository;
    private AnnouncementRepository announcementRepository;
    private ComputerCrashRepository computerCrashRepository;
    private HomeCrashRepository homeCrashRepository;

    public StatisticsController(UserRepository userRepository, RoleRepository roleRepository, StaffRepository staffRepository, AnnouncementRepository announcementRepository, ComputerCrashRepository computerCrashRepository, HomeCrashRepository homeCrashRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.staffRepository = staffRepository;
        this.announcementRepository = announcementRepository;
        this.computerCrashRepository = computerCrashRepository;
        this.homeCrashRepository = homeCrashRepository;
    }

    @GetMapping("/crash_monthly")
    public ResponseEntity<List<MonthlySum>> crashMonthly(){

        List<String> sum= computerCrashRepository.getMonthlySum();

        List<MonthlySum> monthlySums = new ArrayList<>();
        for (String s : sum) {
            String[]columns = s.split(",");
            monthlySums.add(new MonthlySum(columns[1]+"-"+columns[0],columns[2]));
        }

        addEmptyMonths(monthlySums);

        return ResponseEntity.ok(monthlySums);
    }


    @GetMapping("/home_crash_monthly")
    public ResponseEntity<List<MonthlySum>> homeCrashMonthly(){

        List<String> sum= homeCrashRepository.getMonthlySum();

        List<MonthlySum> monthlySums = new ArrayList<>();
        for (String s : sum) {
            String[]columns = s.split(",");
            monthlySums.add(new MonthlySum(columns[1]+"-"+columns[0],columns[2]));
        }

        addEmptyMonths(monthlySums);

        return ResponseEntity.ok(monthlySums);
    }

    @GetMapping("/income")
    public ResponseEntity getIncome(){


        double serviceIncome = 0.0;
        try {
            serviceIncome = computerCrashRepository.getIncome();
        } catch (Exception e){
        }

        double homeIncome = 0.0;
        try {
            homeIncome = homeCrashRepository.getIncome();
        } catch (Exception e){
        }
        homeIncome = homeIncome*100;
        serviceIncome = serviceIncome*100;
        homeIncome = Math.round(homeIncome);
        serviceIncome = Math.round(serviceIncome);

        homeIncome = homeIncome/100;
        serviceIncome = serviceIncome/100;

        double sumIncome = 0.0;
        sumIncome = serviceIncome + homeIncome;


        HashMap<String,Double> response = new HashMap<>();
        response.put("homeIncome",homeIncome);
        response.put("serviceIncome",serviceIncome);
        response.put("sumIncome", sumIncome);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/crash_types")
    public ResponseEntity getCrashesTypesCount(){

        long serviceCrashes = computerCrashRepository.count();
        long homeCrashes = homeCrashRepository.count();

        HashMap<String,Long> response = new HashMap<>();
        response.put("homeCrashes",homeCrashes);
        response.put("serviceCrashes",serviceCrashes);

        return ResponseEntity.ok(response);    }

    private void addEmptyMonths(List<MonthlySum> sums){
        for(int i=0;i<sums.size()-1;i++){
            if(sums.get(i+1).getDate().equals(sums.get(i).getNextDate())==false){
                sums.add(i+1,new MonthlySum(sums.get(i).getNextDate(),"0"));
            }

        }
    }
}
