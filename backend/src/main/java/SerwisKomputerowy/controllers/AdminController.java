package SerwisKomputerowy.controllers;

import SerwisKomputerowy.entity.Role;
import SerwisKomputerowy.entity.User;
import SerwisKomputerowy.repository.RoleRepository;
import SerwisKomputerowy.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/admin")
@RestController
public class AdminController {

    private UserRepository userRepository;
    private RoleRepository roleRepository;

    public AdminController(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @GetMapping
    public String showDashboard(){
        return "test";
    }

    @PostMapping("/user")
    public String createUser(@RequestBody User user){

        User u = userRepository.save(user);

        return "Utworzono";
    }

    @PostMapping("/role")
    public String createRole(@RequestBody Role role){

        Role r = roleRepository.save(role);

        return "Utworzono";
    }

    @GetMapping("/role/{name}")
    public Role getRole(@PathVariable String name){

       return roleRepository.getByName(name);
    }

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable int id){

        User u = userRepository.getById(id);

        return u;
    }

    @PostMapping("/user/{id}/add/{name}")
    public User addUserRole(@PathVariable int id, @PathVariable String name){

        User u = userRepository.getById(id);

        if(roleRepository.existsByName(name)==false){
            Role role = new Role();
            role.setName(name);
            roleRepository.save(role);
        }

        Role r = roleRepository.getByName(name);

        u.addRole(r);

        userRepository.save(u);

        return u;
    }


}
