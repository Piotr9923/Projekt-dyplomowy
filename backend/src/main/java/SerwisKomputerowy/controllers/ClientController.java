package SerwisKomputerowy.controllers;

import SerwisKomputerowy.entity.Client;
import SerwisKomputerowy.entity.ComputerCrash;
import SerwisKomputerowy.entity.HomeComputerCrash;
import SerwisKomputerowy.entity.User;
import SerwisKomputerowy.model.HomeCrashForm;
import SerwisKomputerowy.repository.ClientRepository;
import SerwisKomputerowy.repository.ComputerCrashRepository;
import SerwisKomputerowy.repository.HomeCrashRepository;
import SerwisKomputerowy.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.parameters.P;
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
    private ComputerCrashRepository computerCrashRepository;

    public ClientController(ClientRepository clientRepository, UserRepository userRepository, HomeCrashRepository homeCrashRepository, ComputerCrashRepository computerCrashRepository) {
        this.clientRepository = clientRepository;
        this.userRepository = userRepository;
        this.homeCrashRepository = homeCrashRepository;
        this.computerCrashRepository = computerCrashRepository;
    }

    @GetMapping("/home_crash")
    public ResponseEntity<?> getHomeCrashes(){

        String loggedUser = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        int userId = userRepository.findByUsername(loggedUser).getId();
        int clientId = clientRepository.getClientByUserId(userId).getId();

        return ResponseEntity.ok(homeCrashRepository.getByClientId(clientId));
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
        newCrash.setStatus("ZGŁOSZONA");
        String loggedUser = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        int userId = userRepository.findByUsername(loggedUser).getId();
        int clientId = clientRepository.getClientByUserId(userId).getId();
        newCrash.setClientId(clientId);

        HomeComputerCrash createdCrash = homeCrashRepository.save(newCrash);

        return ResponseEntity.created(URI.create("/home_crash/"+createdCrash.getId())).build();
    }

    @DeleteMapping("/home_crash/{id}")
    public ResponseEntity<?> deleteHomeCrash(@PathVariable int id){

        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        Client loggedClient = clientRepository.getClientByUserId(userRepository.findByUsername(username).getId());

        HomeComputerCrash computerCrash = homeCrashRepository.getById(id);

        if(computerCrash==null || loggedClient.getId()!=computerCrash.getClientId()){
            List<String> errorsList = new ArrayList<>();
            errorsList.add("To nie jest Twoja awaria komputera!");
            Map<String,List<String>> errors = new HashMap<String,List<String>>();
            errors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(errors);
        }

        if(computerCrash.getStatus().equals("ZGŁOSZONA")==false){
            List<String> errorsList = new ArrayList<>();
            errorsList.add("Nie możesz usunąć tej awarii!");
            Map<String,List<String>> errors = new HashMap<String,List<String>>();
            errors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(errors);
        }

        return ResponseEntity.noContent().build();

    }

    @GetMapping("home_crash/{id}")
    public ResponseEntity<?> getHomeCrash(@PathVariable int id){

        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        Client loggedClient = clientRepository.getClientByUserId(userRepository.findByUsername(username).getId());

        HomeComputerCrash computerCrash = homeCrashRepository.getById(id);

        if(computerCrash==null || loggedClient.getId()!=computerCrash.getClientId()){
            List<String> errorsList = new ArrayList<>();
            errorsList.add("To nie jest Twoja awaria komputera!");
            Map<String,List<String>> errors = new HashMap<String,List<String>>();
            errors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(errors);
        }

        return ResponseEntity.ok(computerCrash);
    }

    @GetMapping("/crash")
    public ResponseEntity<?> getCrashes(){

        String loggedUser = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        int userId = userRepository.findByUsername(loggedUser).getId();
        int clientId = clientRepository.getClientByUserId(userId).getId();

        return ResponseEntity.ok(computerCrashRepository.getByClientId(clientId));
    }

    @GetMapping("crash/{id}")
    public ResponseEntity<?> getComputerCrash(@PathVariable int id){

        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        Client loggedClient = clientRepository.getClientByUserId(userRepository.findByUsername(username).getId());

        ComputerCrash computerCrash = computerCrashRepository.getById(id);

        if(computerCrash==null || loggedClient.getId()!=computerCrash.getClientId()){
            List<String> errorsList = new ArrayList<>();
            errorsList.add("To nie jest Twoja awaria komputera!");
            Map<String,List<String>> errors = new HashMap<String,List<String>>();
            errors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(errors);
        }

        return ResponseEntity.ok(computerCrash);
    }


}
