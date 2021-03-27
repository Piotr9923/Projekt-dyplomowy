package SerwisKomputerowy.entity;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "announcements")
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column
    private String title;

    @Column
    private String text;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "announcement_role",
            joinColumns = @JoinColumn(name = "announcement_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();
}
