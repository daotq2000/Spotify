package com.spotify.controller;


import com.spotify.exception.FileStorageException;
import com.spotify.exception.NotFoundEntityException;
import com.spotify.exception.TokenExpiredException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler
    private ResponseEntity handleNotFoundException(NotFoundEntityException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    private ResponseEntity handleNotANumberException(IllegalArgumentException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }



    @ExceptionHandler
    private ResponseEntity fileNotFoundException(FileStorageException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.CONFLICT);
    }

    @ExceptionHandler
    private ResponseEntity topkenExpireException(TokenExpiredException e){
        return new ResponseEntity(e.getMessage(),HttpStatus.FORBIDDEN);
    }
}
