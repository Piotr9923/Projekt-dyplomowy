package SerwisKomputerowy.controllers;

import SerwisKomputerowy.entity.Announcement;
import SerwisKomputerowy.entity.Role;
import SerwisKomputerowy.entity.Staff;
import SerwisKomputerowy.entity.User;
import SerwisKomputerowy.model.AnnouncementForm;
import SerwisKomputerowy.model.StaffForm;
import SerwisKomputerowy.repository.AnnouncementRepository;
import SerwisKomputerowy.repository.RoleRepository;
import SerwisKomputerowy.repository.StaffRepository;
import SerwisKomputerowy.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Date;
import java.util.List;

@RequestMapping("/admin")
@RestController
@CrossOrigin
public class AdminController {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private StaffRepository staffRepository;
    private AnnouncementRepository announcementRepository;

    public AdminController(UserRepository userRepository, RoleRepository roleRepository, StaffRepository staffRepository, AnnouncementRepository announcementRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.staffRepository = staffRepository;
        this.announcementRepository = announcementRepository;
    }

    @GetMapping
    public String showDashboard(){
        return "Strona główna";
    }

    @PostMapping("/staff")
    public ResponseEntity<Staff> createStaff(@RequestBody StaffForm form){

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

        Staff createdStaff = staffRepository.save(staffToCreate);

        return ResponseEntity.created(URI.create("/admin/staff/"+createdStaff.getId())).build();
    }

    @PutMapping("/staff")
    public ResponseEntity<?> updateStaff(@RequestBody StaffForm form){

        Staff updatedStaff = staffRepository.getStaffById(form.getStaffId());
        User updatedUser = userRepository.getById(form.getUserId());

        if(updatedStaff==null || updatedStaff==null){
            return ResponseEntity.notFound().build();
        }

        if(form.getUsername()!=null){
            updatedUser.setUsername(form.getUsername());
        }
        if(form.getPassword()!=null){
            updatedUser.setUsername(form.getUsername());
        }

        userRepository.save(updatedUser);


        return ResponseEntity.noContent().build();
    }

    @GetMapping("/staff")
    public ResponseEntity<List<Staff>> getStaff(){
        return ResponseEntity.ok(staffRepository.findAll());
    }

    @GetMapping("/staff/{id}")
    public ResponseEntity<StaffForm> getStaff(@PathVariable int id){
        StaffForm staffForm = new StaffForm();
        Staff staff = staffRepository.getStaffByUserId(id);
        User user=null;
        if(staff!=null) {
            user = userRepository.getById(staff.getUserId());
        }
        if(staff!=null && user!=null) {
            staffForm.setDataFromUser(user);
            staffForm.setDataFromStaff(staff);
            return ResponseEntity.ok(staffForm);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/staff/{id}")
    public ResponseEntity<?> deleteStaff(@PathVariable int id){

        staffRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }


    @PostMapping("/role")
    public ResponseEntity<?> createRole(@RequestBody Role role){

        Role createdRole = roleRepository.save(role);

        return ResponseEntity.created(URI.create("/admin/role/"+createdRole.getId())).build();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id){

        if(userRepository.existsById(id)==false){
            return ResponseEntity.notFound().build();
        }

        User user = userRepository.getById(id);

        return ResponseEntity.ok(user);
    }

    @GetMapping("/announcement/{id}")
    public ResponseEntity<Announcement> getAnnouncement(@PathVariable int id){

        return ResponseEntity.ok(announcementRepository.getById(id));
    }

    @GetMapping("/announcement")
    public ResponseEntity<List<Announcement>> getAllAnnouncements(){

        return ResponseEntity.ok(announcementRepository.findAll());
    }

    @PostMapping("/announcement")
    public ResponseEntity<?> createAnnouncement(@RequestBody AnnouncementForm form){

        Announcement announcementToCreate = new Announcement();
        announcementToCreate.setText(form.getText());
        announcementToCreate.setTitle(form.getTitle());
        announcementToCreate.setDate(new Date());

        Role role;

        for(int i=0;i<form.getRoles().size();i++){
            System.out.println(form.getRoles().get(i)+"   id " +i);
            if(roleRepository.existsByName(form.getRoles().get(i))) {
                role = roleRepository.getByName(form.getRoles().get(i));
                announcementToCreate.addRole(role);
            }
        }

        Announcement created = announcementRepository.save(announcementToCreate);

        return ResponseEntity.created(URI.create("/admin/announcement/"+created.getId())).build();
    }

    @DeleteMapping("annoucement/{id}")
    public ResponseEntity<?> deleteAnnouncement(@PathVariable int id){

        announcementRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }

}
