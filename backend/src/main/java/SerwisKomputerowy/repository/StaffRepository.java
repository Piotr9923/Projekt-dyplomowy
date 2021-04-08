package SerwisKomputerowy.repository;

import SerwisKomputerowy.entity.Staff;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StaffRepository extends CrudRepository<Staff,Integer> {

    public Staff getStaffByUserId(int userId);

    public Staff getStaffById(int id);

    public Staff save(Staff staff);

    public List<Staff> findAll();
}
