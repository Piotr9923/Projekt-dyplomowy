package SerwisKomputerowy.repository;

import SerwisKomputerowy.entity.ComputerCrash;
import SerwisKomputerowy.entity.HomeComputerCrash;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComputerCrashRepository extends CrudRepository<ComputerCrash,Integer> {

    public ComputerCrash save(ComputerCrash computerCrash);

    public ComputerCrash getById(int id);

    public List<ComputerCrash> getByClientId(int clientId);

    public List<ComputerCrash> findAll();
}
