package com.spotify.service.impl;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.StorageClient;
import com.spotify.dto.response.UploadFileResponse;
import com.spotify.service.FirebaseServiceFile;
import lombok.Data;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@Service
public class FirebaseServiceFileImpl implements FirebaseServiceFile {

    @Autowired
    Properties properties;
    @EventListener
    public void init(ApplicationReadyEvent event) {

        // initialize Firebase
        System.out.println(properties);
        try {
            System.out.println(event);
            ClassPathResource serviceAccount = new ClassPathResource("firebase.json");
            System.out.println(serviceAccount);
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount.getInputStream()))
                    .setStorageBucket("spotify-114b4.appspot.com")
                    .build();

            FirebaseApp.initializeApp(options);

        } catch (Exception ex) {

            ex.printStackTrace();

        }
    }
    @Override
    public String getFileUrl(String name) {
        return String.format(properties.imageUrl, name);
    }

    @Override
    public List<UploadFileResponse> saveMultipleFile(MultipartFile[] file) throws IOException {
        List<UploadFileResponse> uploadFileResponses = new ArrayList<>();
        for (MultipartFile multipartFile : file) {
            UploadFileResponse uploadFileResponse = new UploadFileResponse();
            uploadFileResponse.setFileName(multipartFile.getName());
            uploadFileResponse.setFileType(multipartFile.getContentType());
            uploadFileResponse.setSize(uploadFileResponse.getSize());
            uploadFileResponse.setFileDownloadUri(getFileUrl(save(multipartFile)));
            uploadFileResponses.add(uploadFileResponse);
        }
        return uploadFileResponses;
    }

    @Override
    public String save(MultipartFile file) throws IOException {
        Bucket bucket = StorageClient.getInstance().bucket();
        String name = file.getOriginalFilename();
        bucket.create(name, file.getBytes(), file.getContentType());
        return name;
    }

    @Override
    public String save(BufferedImage bufferedImage, String originalFileName) throws IOException {
        byte[] bytes = getByteArrays(bufferedImage, getExtension(originalFileName));

        Bucket bucket = StorageClient.getInstance().bucket();

        String name = generateFileName(originalFileName);

        bucket.create(name, bytes);


        return name;
    }

    @Override
    public void delete(String name) throws IOException {
        Bucket bucket = StorageClient.getInstance().bucket();

        if (StringUtils.isEmpty(name)) {
            throw new IOException("invalid file name");
        }

        Blob blob = bucket.get(name);

        if (blob == null) {
            throw new IOException("file not found");
        }

        blob.delete();
    }
    @Data
    @Configuration
    @ToString
    @ConfigurationProperties(prefix = "firebase")
    public class Properties {

        private String bucketName ="spotify-114b4.appspot.com";

        private String imageUrl = "https://storage.googleapis.com/spotify-114b4.appspot.com/%s";
    }
}
