package SerwisKomputerowy.repository;

import SerwisKomputerowy.entity.ComputerCrash;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public interface ComputerCrashRepository extends CrudRepository<ComputerCrash,Integer> {

    public ComputerCrash save(ComputerCrash computerCrash);

    public ComputerCrash getById(int id);

    public List<ComputerCrash> getByClientId(int clientId);

    public List<ComputerCrash> getByClientIdOrderByDate(int clientId);

    public List<ComputerCrash> findAll();

    public List<ComputerCrash> findAllByOrderByDate();

    @Query(value = "SELECT SUM(c.cost) FROM computer_crash c where c.status='Zakończona'")
    public double getIncome();

    @Query(value = "SELECT year(date), month(date),COUNT(*) FROM computer_crash c GROUP BY year(date),month(date) ORDER BY year(date), month(date)")
    public List<String> getMonthlySum();

}
