package SerwisKomputerowy.auth.jwt;



import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


import java.util.Map;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;


    public String generateToken(Map<String,Object> data) {

        Claims claims = Jwts.claims(data);
        long nowMillis = System.currentTimeMillis();
        return Jwts.builder().setClaims(claims).signWith(SignatureAlgorithm.HS512,jwtSecret.getBytes()).compact();
    }

}
