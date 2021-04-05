package SerwisKomputerowy.controllers;

import SerwisKomputerowy.entity.HomeComputerCrash;
import SerwisKomputerowy.model.HomeCrashForm;
import SerwisKomputerowy.repository.ClientRepository;
import SerwisKomputerowy.repository.HomeCrashRepository;
import SerwisKomputerowy.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.*;


@RequestMapping("/client")
@RestController
public class ClientController {

    private ClientRepository clientRepository;
    private UserRepository userRepository;
    private HomeCrashRepository homeCrashRepository;

    public ClientController(ClientRepository clientRepository, UserRepository userRepository, HomeCrashRepository homeCrashRepository) {
        this.clientRepository = clientRepository;
        this.userRepository = userRepository;
        this.homeCrashRepository = homeCrashRepository;
    }

    @GetMapping
    public String showDashboard(){

        String user = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        return "Zalogowano jako "+ user;
    }

    @PostMapping("/home_crash")
    public ResponseEntity<?> addHomeCrash(@RequestBody @Valid HomeCrashForm form, Errors errors){

        if(errors.hasErrors()){
            List<String> errorsList = new ArrayList<>();
            for(int i=0;i<errors.getErrorCount();i++){
                errorsList.add(errors.getAllErrors().get(i).getDefaultMessage());
            }
            Map<String,List<String>> formErrors = new HashMap<String,List<String>>();
            formErrors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(formErrors);
        }

        HomeComputerCrash newCrash = new HomeComputerCrash();
        newCrash.setCity(form.getCity());
        newCrash.setStreet(form.getStreet());
        newCrash.setCode(form.getCode());
        newCrash.setTitle(form.getTitle());
        newCrash.setDescription(form.getDescription());
        newCrash.setDate(new Date());
        String loggedUser = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        int userId = userRepository.findByUsername(loggedUser).getId();
        int clientId = clientRepository.getClientByUserId(userId).getId();
        newCrash.setClientId(clientId);

        HomeComputerCrash createdCrash = homeCrashRepository.save(newCrash);

        return ResponseEntity.created(URI.create("/home_crash/"+createdCrash.getId())).build();
    }
}
