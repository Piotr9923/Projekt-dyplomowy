package SerwisKomputerowy.controllers;

import SerwisKomputerowy.entity.Client;
import SerwisKomputerowy.entity.ComputerCrash;
import SerwisKomputerowy.entity.HomeComputerCrash;
import SerwisKomputerowy.model.forms.ComputerCrashForm;
import SerwisKomputerowy.model.response.ComputerCrashListResponse;
import SerwisKomputerowy.repository.ClientRepository;
import SerwisKomputerowy.repository.ComputerCrashRepository;
import SerwisKomputerowy.repository.HomeCrashRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.*;


@RequestMapping("/staff")
@RestController
public class StaffController {

    private ClientRepository clientRepository;
    private ComputerCrashRepository computerCrashRepository;
    public HomeCrashRepository homeCrashRepository;

    public StaffController(ClientRepository clientRepository, ComputerCrashRepository computerCrashRepository, HomeCrashRepository homeCrashRepository) {
        this.clientRepository = clientRepository;
        this.computerCrashRepository = computerCrashRepository;
        this.homeCrashRepository = homeCrashRepository;
    }

    @PostMapping("/crash")
    public ResponseEntity addCrash(@RequestBody @Valid ComputerCrashForm form, Errors errors){

        if(errors.hasErrors()){
            List<String> errorsList = new ArrayList<>();
            for(int i=0;i<errors.getErrorCount();i++){
                errorsList.add(errors.getAllErrors().get(i).getDefaultMessage());
            }
            Map<String,List<String>> formErrors = new HashMap<String,List<String>>();
            formErrors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(formErrors);
        }

        // Brak podanego Id klienta (zapis nowego klienta)
        if(form.getClientId()<1){

            List<String> errorsList = new ArrayList<>();
            Map<String,List<String>> formErrors = new HashMap<String,List<String>>();

            if(form.getFirstname()==null || form.getFirstname().isBlank()){
                errorsList.add("Musisz podać imię klienta!");
            }
            if(form.getLastname()==null || form.getLastname().isBlank()){
                errorsList.add("Musisz podać nazwisko klienta!");
            }
            if((form.getEmail()==null || form.getEmail().isBlank()) && (form.getPhoneNumber()==null || form.getPhoneNumber().isBlank())){
                errorsList.add("Musisz podać adres email lub numer telefonu klienta!");
            }
            if(form.getEmail()!=null && clientRepository.existsByEmail(form.getEmail())){
                errorsList.add("Klient o takim e-mailu już istnieje! Wybierz klienta z listy!!");
            }

            if(errorsList.size()>0) {
                formErrors.put("errors", errorsList);
                return ResponseEntity.badRequest().body(formErrors);
            }

            Client clientToCreate = new Client();
            clientToCreate.setFirstname(form.getFirstname());
            clientToCreate.setLastname(form.getLastname());
            clientToCreate.setEmail(form.getEmail());
            clientToCreate.setPhoneNumber(form.getPhoneNumber());

            Client createdClient = clientRepository.save(clientToCreate);
            form.setClientId(createdClient.getId());

        }
        else{
            if(clientRepository.existsById(form.getClientId())==false){

                List<String> errorsList = new ArrayList<>();
                Map<String,List<String>> formErrors = new HashMap<String,List<String>>();
                errorsList.add("Klient o podanym Id nie istnieje!");
                formErrors.put("errors", errorsList);
                return ResponseEntity.badRequest().body(formErrors);

            }
        }

        ComputerCrash crashToAdd = new ComputerCrash();
        crashToAdd.setClientId(form.getClientId());
        crashToAdd.setTitle(form.getTitle());
        crashToAdd.setDescription(form.getDescription());
        crashToAdd.setDate(new Date());
        crashToAdd.setStatus("PRZYJĘTA");

        ComputerCrash createdCrash = computerCrashRepository.save(crashToAdd);

        return ResponseEntity.created(URI.create("/crash/"+createdCrash.getId())).build();

    }

    @GetMapping("/crash")
    public ResponseEntity getCrashList(){

        List<HomeComputerCrash> homeComputerCrashes = homeCrashRepository.findAll();
        List<ComputerCrash> computerCrashes = computerCrashRepository.findAll();

        List<ComputerCrashListResponse> crashes = new ArrayList<>();

        for (HomeComputerCrash homeComputerCrash : homeComputerCrashes) {
            String clientName = "";
            if(clientRepository.existsById(homeComputerCrash.getClientId())){
                clientName = clientRepository.getClientById(homeComputerCrash.getClientId()).toString();
            }
            crashes.add(new ComputerCrashListResponse
                    (homeComputerCrash.getId(),
                            homeComputerCrash.getTitle(),
                            clientName,
                            homeComputerCrash.getStatus(),
                            "HOME",
                            homeComputerCrash.getDate()));
        }

        for (ComputerCrash computerCrash : computerCrashes) {
            String clientName = "";
            if(clientRepository.existsById(computerCrash.getClientId())){
                clientName = clientRepository.getClientById(computerCrash.getClientId()).toString();
            }
            crashes.add(
                    new ComputerCrashListResponse(computerCrash.getId(),
                            computerCrash.getTitle(),
                            clientName,
                            computerCrash.getStatus(),
                            "SERVICE",
                            computerCrash.getDate()));
        }

        return ResponseEntity.ok(crashes);
    }

    @GetMapping("/crash/{id]")
    public ResponseEntity getCrash(@PathVariable int id){

        if(computerCrashRepository.existsById(id)==false){
            List<String> errorsList = new ArrayList<>();
            errorsList.add("Awaria o takim id nie istnieje!");
            Map<String,List<String>> errors = new HashMap<String,List<String>>();
            errors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(errors);
        }

        return ResponseEntity.ok(computerCrashRepository.getById(id));
    }

    @GetMapping("/home_crash/{id]")
    public ResponseEntity getHomeCrash(@PathVariable int id){

        if(homeCrashRepository.existsById(id)==false){
            List<String> errorsList = new ArrayList<>();
            errorsList.add("Awaria o takim id nie istnieje!");
            Map<String,List<String>> errors = new HashMap<String,List<String>>();
            errors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(errors);
        }

        return ResponseEntity.ok(homeCrashRepository.getById(id));
    }


}
