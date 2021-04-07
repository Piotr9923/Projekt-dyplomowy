package SerwisKomputerowy.config;

import SerwisKomputerowy.entity.Role;
import SerwisKomputerowy.entity.User;
import SerwisKomputerowy.repository.RoleRepository;
import SerwisKomputerowy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class CommandLineAppStartupRunner implements CommandLineRunner {

    private UserRepository userRepository;
    private RoleRepository roleRepository;

    @Value("${admin.password}")
    private String adminPassword;

    public CommandLineAppStartupRunner(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String...args) throws Exception {
        if(roleRepository.existsByName("ADMIN")==false){
            Role role = new Role();
            role.setName("ADMIN");
            roleRepository.save(role);
        }

        Role adminRole = roleRepository.getByName("ADMIN");

        //TODO: Hashowanie hasła i wczytywanie z properties

        if(userRepository.existsByUsername("admin")==false){
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(adminPassword);
            admin.addRole(adminRole);

            userRepository.save(admin);
        }


    }
}
