package SerwisKomputerowy.repository;

import SerwisKomputerowy.entity.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<Role,Integer> {

    public Role save(Role role);

    public Role getByName(String name);

    public Boolean existsByName(String name);

}
