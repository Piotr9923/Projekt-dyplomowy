package SerwisKomputerowy.controllers;


import SerwisKomputerowy.auth.jwt.JwtUtil;
import SerwisKomputerowy.entity.Client;
import SerwisKomputerowy.entity.Role;
import SerwisKomputerowy.entity.User;
import SerwisKomputerowy.auth.jwt.JwtPayload;
import SerwisKomputerowy.auth.jwt.JwtResponse;
import SerwisKomputerowy.model.LoginForm;
import SerwisKomputerowy.model.RegistrationForm;
import SerwisKomputerowy.repository.ClientRepository;
import SerwisKomputerowy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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

    public PublicController(UserRepository userRepository, ClientRepository clientRepository) {
        this.userRepository = userRepository;
        this.clientRepository = clientRepository;
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

        //TODO: Hashowanie hasła
        User newUser = new User();
        newUser.setUsername(form.getUsername());
        newUser.setPassword(form.getPassword());

        User createdUser = userRepository.save(newUser);

        Client newClient = new Client();
        newClient.setUserId(createdUser.getId());
        newClient.setFirstname(form.getFirstname());
        newClient.setLastname(form.getLastname());
        newClient.setPhoneNumber(form.getPhoneNumber());
        newClient.setEmail(form.getEmail());

        Client created = clientRepository.save(newClient);
        
        return ResponseEntity.ok(created);
    }

}
