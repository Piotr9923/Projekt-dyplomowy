package SerwisKomputerowy.controllers;

import SerwisKomputerowy.entity.Announcement;
import SerwisKomputerowy.entity.Role;
import SerwisKomputerowy.entity.Staff;
import SerwisKomputerowy.entity.User;
import SerwisKomputerowy.model.forms.AnnouncementForm;
import SerwisKomputerowy.model.forms.StaffEditForm;
import SerwisKomputerowy.model.forms.StaffForm;
import SerwisKomputerowy.model.response.AnnouncementResponse;
import SerwisKomputerowy.repository.AnnouncementRepository;
import SerwisKomputerowy.repository.RoleRepository;
import SerwisKomputerowy.repository.StaffRepository;
import SerwisKomputerowy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.util.*;

@CrossOrigin
@RequestMapping("/admin")
@RestController
public class AdminController {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private StaffRepository staffRepository;
    private AnnouncementRepository announcementRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public AdminController(UserRepository userRepository, RoleRepository roleRepository, StaffRepository staffRepository, AnnouncementRepository announcementRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.staffRepository = staffRepository;
        this.announcementRepository = announcementRepository;
    }

    @PostMapping("/staff")
    public ResponseEntity createStaff(@RequestBody @Valid StaffForm form, Errors errors){

        if(errors.hasErrors()){
            List<String> errorsList = new ArrayList<>();
            for(int i=0;i<errors.getErrorCount();i++){
                errorsList.add(errors.getAllErrors().get(i).getDefaultMessage());
            }
            Map<String,List<String>> formErrors = new HashMap<String,List<String>>();
            formErrors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(formErrors);
        }

        if(roleRepository.existsByName("STAFF")==false){
            Role role = new Role();
            role.setName("STAFF");
            roleRepository.save(role);
        }

        Role staffRole = roleRepository.getByName("STAFF");

        User userToCreate = form.getUser();
        userToCreate.addRole(staffRole);

        //TODO: Hashowanie hasła

        User createdUser = userRepository.save(userToCreate);

        form.setUserId(createdUser.getId());

        Staff staffToCreate = form.getStaff();

        Staff createdStaff = staffRepository.save(staffToCreate);

        return ResponseEntity.created(URI.create("/admin/staff/"+createdStaff.getId())).build();
    }

    @PutMapping("/staff/{id}")
    public ResponseEntity<?> updateStaff(@RequestBody @Valid StaffEditForm form, Errors errors, @PathVariable int id){

        if(errors.hasErrors()){
            List<String> errorsList = new ArrayList<>();
            for(int i=0;i<errors.getErrorCount();i++){
                errorsList.add(errors.getAllErrors().get(i).getDefaultMessage());
            }
            Map<String,List<String>> formErrors = new HashMap<String,List<String>>();
            formErrors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(formErrors);
        }

        if(userRepository.existsByUsername(form.getUsername()) &&
                (userRepository.findByUsername(form.getUsername()).getId()!=staffRepository.getStaffById(id).getUserId())){
            List<String> errorsList = new ArrayList<>();
            errorsList.add("Użytkownik o takiej nazwie już istnieje!");
            Map<String,List<String>> userExistsError = new HashMap<String,List<String>>();
            userExistsError.put("errors",errorsList);
            return ResponseEntity.badRequest().body(userExistsError);
        }

        Staff updatedStaff = staffRepository.getStaffById(id);
        User updatedUser = userRepository.getById(staffRepository.getStaffById(id).getUserId());

        if(updatedStaff==null || updatedStaff==null){
            return ResponseEntity.notFound().build();
        }

        if(form.getUsername()!=null){
            updatedUser.setUsername(form.getUsername());
        }
        if(form.getPassword()!=null){
            updatedUser.setPassword(form.getPassword());
        }
        if(form.getFirstname()!=null){
            updatedStaff.setFirstname(form.getFirstname());
        }
        if(form.getLastname()!=null){
            updatedStaff.setLastname(form.getLastname());
        }
        if(form.getEmail()!=null){
            updatedStaff.setEmail(form.getEmail());
        }
        if(form.getPhoneNumber()!=null){
            updatedStaff.setPhoneNumber(form.getPhoneNumber());
        }
        if(form.getSalary()>0){
            updatedStaff.setSalary(form.getSalary());
        }

        userRepository.save(updatedUser);
        staffRepository.save(updatedStaff);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/staff")
    public @ResponseBody ResponseEntity getStaff(){
        return ResponseEntity.ok(staffRepository.findAllByOrderByLastnameAscFirstnameAsc());
    }

    @GetMapping("/staff/{id}")
    public ResponseEntity<StaffForm> getStaff(@PathVariable int id){
        StaffForm staffForm = new StaffForm();
        Staff staff = staffRepository.getStaffById(id);
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

        int userId = staffRepository.getStaffById(id).getUserId();
        User deletedStaffUserAccount = userRepository.getById(userId);
        if(deletedStaffUserAccount.getRoles().size()>1) {
            for (Role role : deletedStaffUserAccount.getRoles()) {
                if (role.getName() == "STAFF") deletedStaffUserAccount.getRoles().remove(role);
            }
            userRepository.save(deletedStaffUserAccount);
        }
        else{
            userRepository.deleteById(userId);
        }

        staffRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id){

        if(userRepository.existsById(id)==false){
            return ResponseEntity.notFound().build();
        }

        User user = userRepository.getById(id);

        return ResponseEntity.ok(user);
    }

    @GetMapping("/announcement")
    public ResponseEntity<List<AnnouncementResponse>> getAllAnnouncements(){

        List<Announcement> announcementList = announcementRepository.findAllByOrderByDateDesc();

        List<AnnouncementResponse> responseList = new ArrayList<>();

        for(Announcement announcement: announcementList){
            AnnouncementResponse response = new AnnouncementResponse();

            response.setText(announcement.getText());
            response.setTitle(announcement.getTitle());
            response.setDate(announcement.getDate());
            response.setRolesNames(announcement.getRoles());
            response.setId(announcement.getId());

            responseList.add(response);
        }


        return ResponseEntity.ok(responseList);
    }

    @PostMapping("/announcement")
    public ResponseEntity<?> createAnnouncement(@RequestBody @Valid AnnouncementForm form, Errors errors){

        if(errors.hasErrors()){
            List<String> errorsList = new ArrayList<>();
            for(int i=0;i<errors.getErrorCount();i++){
                errorsList.add(errors.getAllErrors().get(i).getDefaultMessage());
            }
            Map<String,List<String>> formErrors = new HashMap<String,List<String>>();
            formErrors.put("errors",errorsList);
            return ResponseEntity.badRequest().body(formErrors);
        }

        Announcement announcementToCreate = new Announcement();
        announcementToCreate.setText(form.getText());
        announcementToCreate.setTitle(form.getTitle());
        announcementToCreate.setDate(new Date());

        Role role;

        for(int i=0;i<form.getRoles().size();i++){
            if(roleRepository.existsByName(form.getRoles().get(i))) {
                role = roleRepository.getByName(form.getRoles().get(i));
                announcementToCreate.addRole(role);
            }
        }

        Announcement created = announcementRepository.save(announcementToCreate);

        return ResponseEntity.created(URI.create("/admin/announcement/"+created.getId())).build();
    }

    @GetMapping("/announcement/{id}")
    public ResponseEntity<AnnouncementResponse> getAnnouncement(@PathVariable int id){
        Announcement announcement = announcementRepository.getById(id);

        AnnouncementResponse response = new AnnouncementResponse();
        response.setId(announcement.getId());
        response.setTitle(announcement.getTitle());
        response.setText(announcement.getText());
        response.setRolesNames(announcement.getRoles());
        response.setDate(announcement.getDate());

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/announcement/{id}")
    public ResponseEntity<?> deleteAnnouncement(@PathVariable int id){

        announcementRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }



}
