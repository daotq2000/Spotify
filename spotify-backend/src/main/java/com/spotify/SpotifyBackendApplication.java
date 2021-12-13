package com.spotify;

import com.spotify.ultils.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@EnableConfigurationProperties({
        FileStorageProperties.class
})
@SpringBootApplication
public class SpotifyBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(SpotifyBackendApplication.class, args);
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    }

}
