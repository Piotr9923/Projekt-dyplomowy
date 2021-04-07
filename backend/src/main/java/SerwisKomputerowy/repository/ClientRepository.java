package SerwisKomputerowy.repository;

import SerwisKomputerowy.entity.Client;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends CrudRepository<Client,Integer> {

    public Client getClientByUserId(int userId);

    public Client save(Client client);

    public Boolean existsByEmail(String email);

    public Client getClientByEmail(String email);

}
