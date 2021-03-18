package SerwisKomputerowy.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;


public class JwtFilter extends BasicAuthenticationFilter {

    @Value("${jwt.secret}")
    private String jwtSecret;

    public JwtFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader("Authorization");

        Algorithm algorithm = Algorithm.HMAC256("secret");

        if(header!=null) {
            PreAuthenticatedAuthenticationToken authResult = getAuthenticationByToken(header);
            SecurityContextHolder.getContext().setAuthentication(authResult);
        }
        chain.doFilter(request, response);
    }

    private PreAuthenticatedAuthenticationToken getAuthenticationByToken(String header) {
    try {

            Jws<Claims> claimsJws = Jwts.parser().setSigningKey("aaa".getBytes())
                    .parseClaimsJws(header.replace("Bearer ", ""));

            String username = claimsJws.getBody().get("name").toString();
            String role = claimsJws.getBody().get("role").toString();
            List<SimpleGrantedAuthority> simpleGrantedAuthorities = new LinkedList<>();
            simpleGrantedAuthorities.add(new SimpleGrantedAuthority(role));

            System.out.println(jwtSecret);

            PreAuthenticatedAuthenticationToken auth
                    = new PreAuthenticatedAuthenticationToken(username, null, simpleGrantedAuthorities);
            return auth;
        }catch (Exception e){
            return null;
        }
    }


}
