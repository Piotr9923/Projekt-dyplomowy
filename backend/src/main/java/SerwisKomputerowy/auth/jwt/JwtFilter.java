package SerwisKomputerowy.auth.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.aspectj.bridge.IMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.LinkedList;
import java.util.List;


public class JwtFilter extends BasicAuthenticationFilter {

    private String jwtSecret;

    @Autowired
    public JwtFilter(AuthenticationManager authenticationManager,Environment environment){
        super(authenticationManager);
        jwtSecret = environment.getProperty("jwt.secret");
    }

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader("Authorization");

        if(header!=null) {
            PreAuthenticatedAuthenticationToken authResult = getAuthenticationByToken(header);
            SecurityContextHolder.getContext().setAuthentication(authResult);
        }

        chain.doFilter(request, response);
    }

    private PreAuthenticatedAuthenticationToken getAuthenticationByToken(String header) {
    try {

            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(jwtSecret.getBytes())
                    .parseClaimsJws(header.replace("Bearer ", ""));
            String username = claimsJws.getBody().get("username").toString();
            String role = claimsJws.getBody().get("role").toString();

            List<SimpleGrantedAuthority> simpleGrantedAuthorities = new LinkedList<>();

            if(role.startsWith("ROLE")==false){
                role = role.substring(1,role.length()-1);
            }

            String[]roles=role.split(",");

            for(int i=0;i<roles.length;i++){
                simpleGrantedAuthorities.add(new SimpleGrantedAuthority(roles[i].strip()));
            }

            PreAuthenticatedAuthenticationToken auth
                    = new PreAuthenticatedAuthenticationToken(username, null, simpleGrantedAuthorities);
            return auth;
        }catch (Exception e){
            return null;
        }
    }


}
