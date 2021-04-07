package SerwisKomputerowy.controllers;


import SerwisKomputerowy.auth.jwt.JwtUtil;
import SerwisKomputerowy.entity.Client;
import SerwisKomputerowy.entity.Role;
import SerwisKomputerowy.entity.User;
import SerwisKomputerowy.auth.jwt.JwtPayload;
import SerwisKomputerowy.auth.jwt.JwtResponse;
import SerwisKomputerowy.model.LoginForm;
import SerwisKomputerowy.model.RegistrationClientForm;
import SerwisKomputerowy.model.RegistrationForm;
import SerwisKomputerowy.repository.ClientRepository;
import SerwisKomputerowy.repository.RoleRepository;
import SerwisKomputerowy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
public class PublicController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    JwtUtil jwtUtil;

    private UserRepository userRepository;
    private ClientRepository clientRepository;
    private RoleRepository roleRepository;

    public PublicController(UserRepository userRepository, ClientRepository clientRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
        this.roleRepository = roleRepository;
    }

    @GetMapping
    public String showDashboard(){
        return "test";
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody @Valid LoginForm form, Errors errors){

        if(errors.hasErrors()){
            List<String> errorsList = new ArrayList<>();
            for(int i=0;i<errors.getErrorCount();i++){
                errorsList.add(errors.getAllErrors().get(i).getDefaultMessage());
            }
            Map<String,List<String>> formErrors = new HashMap<String,List<String>>();
            formErrors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(formErrors);
        }

        //TODO: Porównywanie hashowanego hasła
        if(userRepository.existsByUsername(form.getUsername())==false){
            return ResponseEntity.status(403).build();
        }
        User user = userRepository.findByUsername(form.getUsername());

        if(user.getPassword().equals(form.getPassword())==false){
            return ResponseEntity.status(403).build();
        }

        JwtPayload jwtPayload = new JwtPayload();

        jwtPayload.setUsername(user.getUsername());
        List<String> roles = new ArrayList<>();
        for(Role role: user.getRoles()){
            jwtPayload.addRole(role);
            roles.add(role.getName());
        }

        String token = jwtUtil.generateToken(jwtPayload.getPayload());

        return ResponseEntity.ok().body(new JwtResponse(token,user.getUsername(),roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody @Valid RegistrationForm form, Errors errors){

        if(errors.hasErrors()){
            List<String> errorsList = new ArrayList<>();
            for(int i=0;i<errors.getErrorCount();i++){
                errorsList.add(errors.getAllErrors().get(i).getDefaultMessage());
            }
            Map<String,List<String>> formErrors = new HashMap<String,List<String>>();
            formErrors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(formErrors);
        }

        if(userRepository.existsByUsername(form.getUsername())){
            List<String> errorsList = new ArrayList<>();
            errorsList.add("Użytkownik o takiej nazwie już istnieje!");
            Map<String,List<String>> userExistsError = new HashMap<String,List<String>>();
            userExistsError.put("errors",errorsList);
            return ResponseEntity.badRequest().body(userExistsError);
        }
        if(clientRepository.existsByEmail(form.getEmail())){
            List<String> errorsList = new ArrayList<>();
            errorsList.add("Klient o takim adresie e-mail już istnieje w bazie! Zarejestruj się za pomocą formularz dla klientów!");
            Map<String,List<String>> userExistsError = new HashMap<String,List<String>>();
            userExistsError.put("errors",errorsList);
            return ResponseEntity.badRequest().body(userExistsError);
        }

        if(clientRepository.existsByEmail(form.getEmail()) && clientRepository.getClientByEmail(form.getEmail()).getUserId()>0){

            List<String> errorsList = new ArrayList<>();
            Map<String,List<String>> formErrors = new HashMap<String,List<String>>();
            errorsList.add("Istnieje użytkownik zarejestrowany na ten adres e-mail!");
            formErrors.put("errors", errorsList);
            return ResponseEntity.badRequest().body(formErrors);

        }

        if(roleRepository.existsByName("CLIENT")==false){
            Role role = new Role();
            role.setName("CLIENT");
            roleRepository.save(role);
        }
        Role clientRole = roleRepository.getByName("CLIENT");

        //TODO: Hashowanie hasła
        User newUser = new User();
        newUser.setUsername(form.getUsername());
        newUser.setPassword(form.getPassword());
        newUser.addRole(clientRole);
        User createdUser = userRepository.save(newUser);

        Client newClient = new Client();
        newClient.setUserId(createdUser.getId());
        newClient.setFirstname(form.getFirstname());
        newClient.setLastname(form.getLastname());
        newClient.setPhoneNumber(form.getPhoneNumber());
        newClient.setEmail(form.getEmail());

        Client created = clientRepository.save(newClient);

        return ResponseEntity.created(URI.create("")).build();
    }


    @PostMapping("/client_signup")
    public ResponseEntity<?> signupClient(@RequestBody @Valid RegistrationClientForm form, Errors errors){

        if(errors.hasErrors()){
            List<String> errorsList = new ArrayList<>();
            for(int i=0;i<errors.getErrorCount();i++){
                errorsList.add(errors.getAllErrors().get(i).getDefaultMessage());
            }
            Map<String,List<String>> formErrors = new HashMap<String,List<String>>();
            formErrors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(formErrors);
        }

        if(userRepository.existsByUsername(form.getUsername())){

            List<String> errorsList = new ArrayList<>();
            Map<String,List<String>> formErrors = new HashMap<String,List<String>>();
            errorsList.add("Użytkownik o takiej nazwie już istnieje!!");
            formErrors.put("errors", errorsList);
            return ResponseEntity.badRequest().body(formErrors);

        }

        if(clientRepository.existsByEmail(form.getEmail())==false){

            List<String> errorsList = new ArrayList<>();
            Map<String,List<String>> formErrors = new HashMap<String,List<String>>();
            errorsList.add("Klient o podanym adresie e-mail nie istnieje w bazie!");
            formErrors.put("errors", errorsList);
            return ResponseEntity.badRequest().body(formErrors);

        }

        if(clientRepository.getClientByEmail(form.getEmail()).getUserId()>0){

            List<String> errorsList = new ArrayList<>();
            Map<String,List<String>> formErrors = new HashMap<String,List<String>>();
            errorsList.add("Istnieje użytkownik zarejestrowany na ten adres e-mail!");
            formErrors.put("errors", errorsList);
            return ResponseEntity.badRequest().body(formErrors);

        }

        if(roleRepository.existsByName("CLIENT")==false){
            Role role = new Role();
            role.setName("CLIENT");
            roleRepository.save(role);
        }
        Role clientRole = roleRepository.getByName("CLIENT");

        //TODO: Hashowanie hasła
        User newUser = new User();
        newUser.setUsername(form.getUsername());
        newUser.setPassword(form.getPassword());
        newUser.addRole(clientRole);

        User createdUser = userRepository.save(newUser);

        Client client = clientRepository.getClientByEmail(form.getEmail());
        client.setUserId(createdUser.getId());
        clientRepository.save(client);


        return ResponseEntity.created(URI.create("")).build();
    }

}
