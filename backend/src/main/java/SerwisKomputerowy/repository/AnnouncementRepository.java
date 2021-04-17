package SerwisKomputerowy.repository;

import SerwisKomputerowy.entity.Announcement;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends CrudRepository<Announcement,Integer> {

    public Announcement save(Announcement announcement);

    public void deleteById(int id);

    public Announcement getById(int id);

    public List<Announcement> findAll();

    public List<Announcement> findAllByOrderByDateDesc();

}
