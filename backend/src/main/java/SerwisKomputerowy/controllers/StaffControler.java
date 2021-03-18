package SerwisKomputerowy.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/staff")
@RestController
public class StaffControler {

    @GetMapping
    public String showDashboard(){
        return "test";
    }

}
