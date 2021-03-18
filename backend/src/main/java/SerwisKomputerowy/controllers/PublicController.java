package SerwisKomputerowy.controllers;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class PublicController {

    @GetMapping
    public String showDashboard(){
        return "test";
    }


}
