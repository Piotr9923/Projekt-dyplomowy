package SerwisKomputerowy.auth.jwt;

import SerwisKomputerowy.entity.Role;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class JwtPayload {

    private String username;

    private List<String> roles;

    public JwtPayload() {
        roles = new ArrayList<String>();
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void addRole(Role role){
        roles.add("ROLE_"+role.getName());
    }

    public HashMap<String,Object> getPayload(){

        HashMap<String,Object> data = new HashMap<>();

        data.put("username",username);
        data.put("role",roles.toArray());

        return data;

    }
}
