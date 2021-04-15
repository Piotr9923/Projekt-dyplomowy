package SerwisKomputerowy.repository;

import SerwisKomputerowy.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User,Integer> {

    public User save(User user);

    public User getById(int id);

    public Boolean existsByUsername(String username);

    public User findByUsername(String username);


}
