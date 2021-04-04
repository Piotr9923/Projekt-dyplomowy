package SerwisKomputerowy.auth;

import SerwisKomputerowy.auth.jwt.JwtFilter;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();
        http.authorizeRequests()
                .antMatchers("/admin/**").hasRole("ADMIN")
                .antMatchers("/staff/**").hasRole("STAFF")
                .antMatchers("/client/**").hasRole("CLIENT")
                .and()
                .addFilter(new JwtFilter(authenticationManager(), getApplicationContext().getEnvironment()));
    }
}
