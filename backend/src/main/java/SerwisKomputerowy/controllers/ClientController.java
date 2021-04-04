package SerwisKomputerowy.controllers;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/client")
@RestController
public class ClientController {

    @GetMapping
    public String showDashboard(){

        String user = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        return "Zalogowano jako "+ user;
    }
}
