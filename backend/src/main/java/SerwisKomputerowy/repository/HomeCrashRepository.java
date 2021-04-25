package SerwisKomputerowy.repository;

import SerwisKomputerowy.entity.ComputerCrash;
import SerwisKomputerowy.entity.HomeComputerCrash;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HomeCrashRepository extends CrudRepository<HomeComputerCrash,Integer> {

    public HomeComputerCrash save(HomeComputerCrash homeComputerCrash);

    public HomeComputerCrash getById(int id);

    public List<HomeComputerCrash> getByClientId(int clientId);

    public List<HomeComputerCrash> getByClientIdOrderByDate(int clientId);

    public List<HomeComputerCrash> findAll();

    public List<HomeComputerCrash> findAllByOrderByDate();

}
