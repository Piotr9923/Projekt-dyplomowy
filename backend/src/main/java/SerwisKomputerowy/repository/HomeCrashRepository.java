package SerwisKomputerowy.repository;

import SerwisKomputerowy.entity.HomeComputerCrash;
import org.springframework.data.repository.CrudRepository;

public interface HomeCrashRepository extends CrudRepository<HomeComputerCrash,Integer> {

    public HomeComputerCrash save(HomeComputerCrash homeComputerCrash);



}
