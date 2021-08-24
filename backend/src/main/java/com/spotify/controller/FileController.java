package com.spotify.controller;

import com.spotify.dto.response.UploadFileResponse;
import com.spotify.service.FirebaseServiceFile;
import com.spotify.service.impl.FileStorageServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.core.io.Resource;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class FileController {
    private static final Logger logger = LoggerFactory.getLogger(FileController.class);
    @Autowired private FirebaseServiceFile firebaseServiceFile;
    @Autowired private FileStorageServiceImpl fileStorageService;
    @PostMapping("/uploadFileFirebase")
    public ResponseEntity<UploadFileResponse> uploadFileToFirebase(@RequestParam("file") MultipartFile file) throws IOException {
            String nameFile =  firebaseServiceFile.save(file);
            UploadFileResponse response = new UploadFileResponse();
            response.setFileType(file.getContentType());
            response.setSize(file.getSize());
            response.setFileName(nameFile);
            response.setFileDownloadUri(firebaseServiceFile.getFileUrl(nameFile));
            return new ResponseEntity<>(response, HttpStatus.OK);
        }

    @PostMapping("/uploadMultipleFilesFirebase")
    public ResponseEntity<List<UploadFileResponse>> uploadMultipleFilesToFirebase(@RequestParam("files") MultipartFile[] files) throws IOException {
         List<UploadFileResponse> uploadFileResponses = firebaseServiceFile.saveMultipleFile(files);
         return new ResponseEntity<>(uploadFileResponses,HttpStatus.OK);
    }
    @PostMapping("/uploadFile")
    public UploadFileResponse uploadFileToHost(@RequestParam("file") MultipartFile file) {
        String fileName = fileStorageService.storeFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/")
                .path(fileName)
                .toUriString();

        return new UploadFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @PostMapping("/uploadMultipleFiles")
    public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
        return Arrays.asList(files)
                .stream()
                .map(file -> uploadFileToHost(file))
                .collect(Collectors.toList());
    }
    @GetMapping("/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if(contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }
}
