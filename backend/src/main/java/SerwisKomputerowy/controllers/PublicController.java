package SerwisKomputerowy.controllers;


import SerwisKomputerowy.auth.jwt.JwtUtil;
import SerwisKomputerowy.entity.Role;
import SerwisKomputerowy.entity.User;
import SerwisKomputerowy.auth.jwt.JwtPayload;
import SerwisKomputerowy.auth.jwt.JwtResponse;
import SerwisKomputerowy.model.LoginForm;
import SerwisKomputerowy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class PublicController {

    private UserRepository userRepository;

    @Autowired
    JwtUtil jwtUtil;

    public PublicController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public String showDashboard(){
        return "test";
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody LoginForm form){

        if(userRepository.existsByUsername(form.getUsername())==false){
            return ResponseEntity.status(403).build();
        }
        User user = userRepository.findByUsername(form.getUsername());

        if(user.getPassword().equals(form.getPassword())==false){
            return ResponseEntity.status(403).build();
        }

        JwtPayload jwtPayload = new JwtPayload();

        jwtPayload.setUsername(user.getUsername());

        for(Role role: user.getRoles()){
            jwtPayload.addRole(role);
        }

        String token = jwtUtil.generateToken(jwtPayload.getPayload());

        return ResponseEntity.ok().body(new JwtResponse(token));
    }


}
