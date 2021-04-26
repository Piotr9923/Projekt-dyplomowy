package SerwisKomputerowy.config;

import SerwisKomputerowy.entity.Client;
import SerwisKomputerowy.entity.Role;
import SerwisKomputerowy.entity.Staff;
import SerwisKomputerowy.entity.User;
import SerwisKomputerowy.repository.ClientRepository;
import SerwisKomputerowy.repository.RoleRepository;
import SerwisKomputerowy.repository.StaffRepository;
import SerwisKomputerowy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CreateAdminAccount implements CommandLineRunner {

    @Autowired
    private PasswordEncoder passwordEncoder;

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private StaffRepository staffRepository;
    private ClientRepository clientRepository;

    @Value("${admin.password}")
    private String adminPassword;

    public CreateAdminAccount(UserRepository userRepository, RoleRepository roleRepository, StaffRepository staffRepository, ClientRepository clientRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.staffRepository = staffRepository;
        this.clientRepository = clientRepository;
    }

    @Override
    public void run(String...args) throws Exception {
        if(roleRepository.existsByName("ADMIN")==false){
            Role role = new Role();
            role.setName("ADMIN");
            roleRepository.save(role);
        }

        if(roleRepository.existsByName("STAFF")==false){
            Role role = new Role();
            role.setName("STAFF");
            roleRepository.save(role);
        }

        if(roleRepository.existsByName("CLIENT")==false){
            Role role = new Role();
            role.setName("CLIENT");
            roleRepository.save(role);
        }

        Role adminRole = roleRepository.getByName("ADMIN");
        Role staffRole = roleRepository.getByName("STAFF");
        Role clientRole = roleRepository.getByName("CLIENT");


        if(userRepository.existsByUsername("admin")==false){
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.addRole(adminRole);
            admin.addRole(staffRole);
            admin.addRole(clientRole);

            userRepository.save(admin);

            Staff adminStaff = new Staff();
            adminStaff.setUserId(admin.getId());
            adminStaff.setFirstname("Konto administratora");
            staffRepository.save(adminStaff);

            Client adminClient = new Client();
            adminClient.setUserId(admin.getId());
            adminClient.setFirstname("Konto administratora");
            clientRepository.save(adminClient);

        }


    }
}
