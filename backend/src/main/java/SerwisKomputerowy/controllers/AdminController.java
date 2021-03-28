package SerwisKomputerowy.controllers;

import SerwisKomputerowy.entity.Role;
import SerwisKomputerowy.entity.Staff;
import SerwisKomputerowy.entity.User;
import SerwisKomputerowy.model.StaffForm;
import SerwisKomputerowy.repository.RoleRepository;
import SerwisKomputerowy.repository.StaffRepository;
import SerwisKomputerowy.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/admin")
@RestController
@CrossOrigin
public class AdminController {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private StaffRepository staffRepository;

    public AdminController(UserRepository userRepository, RoleRepository roleRepository, StaffRepository staffRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.staffRepository = staffRepository;
    }

    @GetMapping
    public String showDashboard(){
        return "test";
    }

    @PostMapping("/staff")
    public Staff createUser(@RequestBody StaffForm form){

        if(roleRepository.existsByName("STAFF")==false){
            Role role = new Role();
            role.setName("STAFF");
            roleRepository.save(role);
        }

        Role staffRole = roleRepository.getByName("STAFF");

        User userToCreate = form.getUser();
        userToCreate.addRole(staffRole);

        User createdUser = userRepository.save(userToCreate);

        form.setUserId(createdUser.getId());

        Staff staffToCreate = form.getStaff();

        staffRepository.save(staffToCreate);

        return staffToCreate;
    }

    @GetMapping("/staff")
    public List<Staff> getStaff(){
        return staffRepository.findAll();
    }

    @GetMapping("/staff/{id}")
    public StaffForm getStaff(@PathVariable int id){
        StaffForm staffForm = new StaffForm();
        Staff staff = staffRepository.getStaffByUserId(id);
        User user=null;
        if(staff!=null) {
            user = userRepository.getById(staff.getUserId());
        }

        if(staff!=null && user!=null) {
            staffForm.setDataFromUser(user);
            staffForm.setDataFromStaff(staff);
            return staffForm;
        }
        return null;
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
