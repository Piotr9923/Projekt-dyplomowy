package SerwisKomputerowy.controllers;

import SerwisKomputerowy.entity.Announcement;
import SerwisKomputerowy.entity.Client;
import SerwisKomputerowy.entity.ComputerCrash;
import SerwisKomputerowy.entity.HomeComputerCrash;
import SerwisKomputerowy.model.forms.HomeCrashForm;
import SerwisKomputerowy.model.response.AnnouncementResponse;
import SerwisKomputerowy.model.response.ComputerCrashInfoResponse;
import SerwisKomputerowy.model.response.ComputerCrashListResponse;
import SerwisKomputerowy.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.*;

@CrossOrigin
@RequestMapping("/client")
@RestController
public class ClientController {

    private ClientRepository clientRepository;
    private UserRepository userRepository;
    private HomeCrashRepository homeCrashRepository;
    private ComputerCrashRepository computerCrashRepository;
    private AnnouncementRepository announcementRepository;
    private RoleRepository roleRepository;

    public ClientController(ClientRepository clientRepository, UserRepository userRepository, HomeCrashRepository homeCrashRepository, ComputerCrashRepository computerCrashRepository, AnnouncementRepository announcementRepository, RoleRepository roleRepository) {
        this.clientRepository = clientRepository;
        this.userRepository = userRepository;
        this.homeCrashRepository = homeCrashRepository;
        this.computerCrashRepository = computerCrashRepository;
        this.announcementRepository = announcementRepository;
        this.roleRepository = roleRepository;
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
        newCrash.setStatus("Zgłoszona");
        newCrash.setCrashMessage("");
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

        if(homeCrashRepository.existsById(id)==false){
            return ResponseEntity.notFound().build();
        }

        HomeComputerCrash crash = homeCrashRepository.getById(id);

        if(loggedClient.getId()!=crash.getClientId()){
            return ResponseEntity.notFound().build();
        }

        ComputerCrashInfoResponse response = new ComputerCrashInfoResponse();
        response.setTitle(crash.getTitle());
        response.setDescription(crash.getDescription());
        response.setDate(crash.getDate());
        response.setCrashMessage(crash.getCrashMessage());
        response.setCost(crash.getCost());
        response.setStatus(crash.getStatus());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/crash")
    public ResponseEntity<?> getCrashes(){

        String loggedUser = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        int userId = userRepository.findByUsername(loggedUser).getId();
        int clientId = clientRepository.getClientByUserId(userId).getId();

        List<HomeComputerCrash> homeComputerCrashes = homeCrashRepository.getByClientIdOrderByDate(clientId);
        List<ComputerCrash> computerCrashes = computerCrashRepository.getByClientIdOrderByDate(clientId);

        List<ComputerCrashListResponse> crashes = new ArrayList<>();

        for (HomeComputerCrash homeComputerCrash : homeComputerCrashes) {
            crashes.add(new ComputerCrashListResponse
                    (homeComputerCrash.getId(),
                            homeComputerCrash.getTitle(),
                            "",
                            homeComputerCrash.getStatus(),
                            "HOME",
                            homeComputerCrash.getDate(),
                            homeComputerCrash.getCost()));
        }

        for (ComputerCrash computerCrash : computerCrashes) {
            crashes.add(
                    new ComputerCrashListResponse(computerCrash.getId(),
                            computerCrash.getTitle(),
                            "",
                            computerCrash.getStatus(),
                            "SERVICE",
                            computerCrash.getDate(),
                            computerCrash.getCost()));
        }

        return ResponseEntity.ok(crashes);
    }

    @GetMapping("crash/{id}")
    public ResponseEntity<?> getComputerCrash(@PathVariable int id){

        String username = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

        Client loggedClient = clientRepository.getClientByUserId(userRepository.findByUsername(username).getId());

        if(computerCrashRepository.existsById(id)==false){
            return ResponseEntity.notFound().build();
        }

        ComputerCrash crash = computerCrashRepository.getById(id);

        if(loggedClient.getId()!=crash.getClientId()){
            return ResponseEntity.notFound().build();
        }

        ComputerCrashInfoResponse response = new ComputerCrashInfoResponse();
        response.setTitle(crash.getTitle());
        response.setDescription(crash.getDescription());
        response.setDate(crash.getDate());
        response.setCrashMessage(crash.getCrashMessage());
        response.setCost(crash.getCost());
        response.setStatus(crash.getStatus());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/announcement")
    public ResponseEntity getAnnouncementList(){

        List<Announcement> announcementList = announcementRepository.findAllByOrderByDateDesc();

        List<AnnouncementResponse> responseList = new ArrayList<>();

        for(Announcement announcement: announcementList){

            if(announcement.getRoles().contains(roleRepository.getByName("CLIENT"))) {
                AnnouncementResponse response = new AnnouncementResponse();

                response.setText(announcement.getText());
                response.setTitle(announcement.getTitle());
                response.setDate(announcement.getDate());
                response.setRolesNames(announcement.getRoles());
                response.setId(announcement.getId());

                responseList.add(response);
            }
        }

        return ResponseEntity.ok(responseList);
    }

    @GetMapping("/announcement/{id}")
    public ResponseEntity<AnnouncementResponse> getAnnouncement(@PathVariable int id){
        Announcement announcement = announcementRepository.getById(id);
        if(announcement==null){
            return ResponseEntity.notFound().build();
        }
        if(!announcement.getRoles().contains(roleRepository.getByName("CLIENT"))){
            return ResponseEntity.notFound().build();
        }
        AnnouncementResponse response = new AnnouncementResponse();
        response.setId(announcement.getId());
        response.setTitle(announcement.getTitle());
        response.setText(announcement.getText());
        response.setRolesNames(announcement.getRoles());
        response.setDate(announcement.getDate());

        return ResponseEntity.ok(response);
    }


}
