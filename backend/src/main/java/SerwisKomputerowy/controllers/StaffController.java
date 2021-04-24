package SerwisKomputerowy.controllers;

import SerwisKomputerowy.entity.Client;
import SerwisKomputerowy.entity.ComputerCrash;
import SerwisKomputerowy.entity.HomeComputerCrash;
import SerwisKomputerowy.model.forms.ComputerCrashForm;
import SerwisKomputerowy.model.forms.UpdateComputerCrashForm;
import SerwisKomputerowy.model.response.ComputerCrashInfoResponse;
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

@CrossOrigin
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
                errorsList.add("Klient o takim e-mailu już istnieje! Wybierz klienta z listy!");
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
        crashToAdd.setStatus("Przyjęta");

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

    @GetMapping("/crash/{id}")
    public ResponseEntity getCrash(@PathVariable int id){

        if(computerCrashRepository.existsById(id)==false){
            return ResponseEntity.notFound().build();
        }

        ComputerCrash crash = computerCrashRepository.getById(id);
        Client client = clientRepository.getClientById(crash.getClientId());

        ComputerCrashInfoResponse response = new ComputerCrashInfoResponse();
        response.setTitle(crash.getTitle());
        response.setDescription(crash.getDescription());
        response.setDate(crash.getDate());
        response.setCrashMessage(crash.getCrashMessage());
        response.setCost(crash.getCost());
        response.setStatus(crash.getStatus());
        response.setClientName(client.getFirstname()+" "+client.getLastname());
        response.setClientEmail(client.getEmail());
        response.setClientPhoneNumber(client.getPhoneNumber());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/crash/{id}")
    public ResponseEntity updateCrash(@PathVariable int id, @RequestBody @Valid UpdateComputerCrashForm form, Errors errors){

        if(errors.hasErrors()){
            List<String> errorsList = new ArrayList<>();
            for(int i=0;i<errors.getErrorCount();i++){
                errorsList.add(errors.getAllErrors().get(i).getDefaultMessage());
            }
            Map<String,List<String>> formErrors = new HashMap<String,List<String>>();
            formErrors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(formErrors);
        }

        if(computerCrashRepository.existsById(id)==false){
            List<String> errorsList = new ArrayList<>();
            errorsList.add("Wystąpił błąd!");
            Map<String,List<String>> errorsMessage = new HashMap<String,List<String>>();
            errorsMessage.put("errors",errorsList);
            return ResponseEntity.badRequest().body(errorsMessage);
        }

        if(form.getDescription()!=null && form.getDescription().isBlank()){
            List<String> errorsList = new ArrayList<>();
            errorsList.add("Musisz podać opis awarii!");
            Map<String,List<String>> errorsMessage = new HashMap<String,List<String>>();
            errorsMessage.put("errors",errorsList);
            return ResponseEntity.badRequest().body(errorsMessage);
        }

        ComputerCrash crashToUpdate = computerCrashRepository.getById(id);
        System.out.println(form.getCrashMessage());
        if(form.getDescription()!=null){
            crashToUpdate.setDescription(form.getDescription());
        }
        if(form.getCrashMessage()!=null){
            crashToUpdate.setCrashMessage(form.getCrashMessage());
        }
        if(form.getStatus()!=null){
            crashToUpdate.setStatus(form.getStatus());
        }

        if(form.getCost()>=0){
            crashToUpdate.setCost(form.getCost());
        }

        computerCrashRepository.save(crashToUpdate);

        return ResponseEntity.ok(computerCrashRepository.getById(id));
    }

    @PutMapping("/home_crash/{id}")
    public ResponseEntity updateHomeCrash(@PathVariable int id, @RequestBody @Valid UpdateComputerCrashForm form, Errors errors){

        if(errors.hasErrors()){
            List<String> errorsList = new ArrayList<>();
            for(int i=0;i<errors.getErrorCount();i++){
                errorsList.add(errors.getAllErrors().get(i).getDefaultMessage());
            }
            Map<String,List<String>> formErrors = new HashMap<String,List<String>>();
            formErrors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(formErrors);
        }

        if(homeCrashRepository.existsById(id)==false){
            List<String> errorsList = new ArrayList<>();
            errorsList.add("Wystąpił błąd!");
            Map<String,List<String>> errorsMessage = new HashMap<String,List<String>>();
            errorsMessage.put("errors",errorsList);
            return ResponseEntity.badRequest().body(errorsMessage);
        }

        if(form.getDescription()!=null && form.getDescription().isBlank()){
            List<String> errorsList = new ArrayList<>();
            errorsList.add("Musisz podać opis awarii!");
            Map<String,List<String>> errorsMessage = new HashMap<String,List<String>>();
            errorsMessage.put("errors",errorsList);
            return ResponseEntity.badRequest().body(errorsMessage);
        }

        HomeComputerCrash crashToUpdate = homeCrashRepository.getById(id);

        if(form.getDescription()!=null){
            crashToUpdate.setDescription(form.getDescription());
        }
        if(form.getCrashMessage()!=null){
            crashToUpdate.setCrashMessage(form.getCrashMessage());
        }
        if(form.getStatus()!=null){
            crashToUpdate.setStatus(form.getStatus());
        }

        if(form.getCost()>=0){
            crashToUpdate.setCost(form.getCost());
        }

        homeCrashRepository.save(crashToUpdate);

        return ResponseEntity.ok(computerCrashRepository.getById(id));
    }

    @GetMapping("/home_crash/{id}")
    public ResponseEntity getHomeCrash(@PathVariable int id){

        if(homeCrashRepository.existsById(id)==false){
            return ResponseEntity.notFound().build();
        }

        HomeComputerCrash crash = homeCrashRepository.getById(id);
        Client client = clientRepository.getClientById(crash.getClientId());

        ComputerCrashInfoResponse response = new ComputerCrashInfoResponse();
        response.setTitle(crash.getTitle());
        response.setDescription(crash.getDescription());
        response.setCrashMessage(crash.getCrashMessage());
        response.setDate(crash.getDate());
        response.setCost(crash.getCost());
        response.setStatus(crash.getStatus());
        response.setClientName(client.getFirstname()+" "+client.getLastname());
        response.setClientEmail(client.getEmail());
        response.setClientPhoneNumber(client.getPhoneNumber());
        response.setClientStreet(crash.getStreet());
        response.setClientAddress(crash.getCode()+" "+crash.getCity());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/client")
    public ResponseEntity<List<Client>> getClientList(){
        return ResponseEntity.ok(clientRepository.findAllByOrderByLastnameAscFirstnameAsc());
    }


}
