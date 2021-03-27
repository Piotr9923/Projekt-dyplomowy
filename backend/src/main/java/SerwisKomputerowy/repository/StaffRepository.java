package SerwisKomputerowy.repository;

import SerwisKomputerowy.entity.Staff;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StaffRepository extends CrudRepository<Staff,Integer> {

    public Staff getStaffByUserId(int userId);
}
