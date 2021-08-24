package com.spotify.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.spotify.dto.request.PaginationRequest;
import com.spotify.dto.response.SongResponseType;
import com.spotify.service.AlbumService;
import com.spotify.service.SongService;
import com.spotify.service.impl.FileStorageServiceImpl;
import com.spotify.ultils.GenericsHelper;
import com.spotify.ultils.LoggerFactory;
import com.spotify.ultils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/songs")
public class SongController {
    private final FileStorageServiceImpl fileStorageService;
    private final SongService songService;
    private final AlbumService albumService;
    Logger log = LoggerFactory.getLogger("Song");
    @Autowired
    public SongController(FileStorageServiceImpl fileStorageService, SongService songService, AlbumService albumService) {
        this.fileStorageService = fileStorageService;
        this.songService = songService;
        this.albumService = albumService;
    }

    @PostMapping("")
    public ResponseEntity<Map<String, Object>> paginationSongs(@RequestBody PaginationRequest paginationRequest) throws JsonProcessingException {
        String reqStartTime = GenericsHelper.getDateTime();
        log.info("SongController - paginationSongs - start - request: ["+reqStartTime+"]");
        log.info("paginationRequest: "+ GenericsHelper.ObjectToJsonValue(paginationRequest));
        ResponseEntity<Map<String, Object>> response = new ResponseEntity<>(songService.paginationSongs(paginationRequest), HttpStatus.OK);
        long milSecSt = System.currentTimeMillis();
        long milSecEnd = System.currentTimeMillis();
        String reqEndTime = GenericsHelper.getDateTime();
        log.info("SongController - paginationSongs - end - ReqStartTime[" + reqStartTime + "] ReqEndTime[" + reqEndTime + "] TimeDiffinMillSec["+ GenericsHelper.getDiffMilliSec(milSecSt, milSecEnd) +"] \n- psResponse: "+GenericsHelper.ObjectToJsonValue(response));
        return response;
    }

    @GetMapping("/{id}")
    public ResponseEntity<SongResponseType> findByIdSong(@PathVariable("id") int id) throws JsonProcessingException {
        String reqStartTime = GenericsHelper.getDateTime();
        log.info("SongController - findByIdSong - start - request: ["+reqStartTime+"]");
        log.info("Song ID Request: "+id);
        ResponseEntity<SongResponseType> pResponse = new ResponseEntity<>(songService.findById(id), HttpStatus.OK);
        long milSecSt = System.currentTimeMillis();
        long milSecEnd = System.currentTimeMillis();
        String reqEndTime = GenericsHelper.getDateTime();
        log.info("SongController - findByIdSong - end - ReqStartTime[" + reqStartTime + "] ReqEndTime[" + reqEndTime + "] TimeDiffinMillSec["+ GenericsHelper.getDiffMilliSec(milSecSt, milSecEnd) +"] \n- psResponse: "
                +GenericsHelper.ObjectToJsonValue(pResponse));
        return pResponse;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable("id") int id) {
        boolean isDelete = songService.delete(id);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @PostMapping("/save")
    public ResponseEntity<SongResponseType> saveSong(@RequestParam("song") String songJson,
                                                     @RequestParam(value = "files") MultipartFile[] files
    ) throws IOException {
        ResponseEntity<SongResponseType> pResponse;
        String reqStartTime = GenericsHelper.getDateTime();
        log.info("SongController - saveSong - start - request: ["+reqStartTime+"]");
        log.info("songRequest: "+songJson);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        SongResponseType songResponseType = objectMapper.readValue(songJson, SongResponseType.class);
        String mp3 = "";
        String media = "";
        if (null != files) {
            for (int i = 0; i < files.length; i++) {
                if (Utils.getFileExtension(files[i].getOriginalFilename()).equals("mp3")) {
                    mp3 = fileStorageService.storeFile(files[i]);
                } else {
                    media = fileStorageService.storeFile(files[i]);
                }
            }
        }
        songResponseType.setImage(Utils.getUrlFilePath(media));
        songResponseType.setMediaUrl(Utils.getUrlFilePath(mp3));
        pResponse = new ResponseEntity<>(songService.saveSong(songResponseType), HttpStatus.CREATED);
        long milSecSt = System.currentTimeMillis();
        long milSecEnd = System.currentTimeMillis();
        String reqEndTime = GenericsHelper.getDateTime();
        log.info("SongController - saveSong - end - ReqStartTime[" + reqStartTime + "] ReqEndTime[" + reqEndTime + "] TimeDiffinMillSec["+ GenericsHelper.getDiffMilliSec(milSecSt, milSecEnd) +"] \n- psResponse: "
                +GenericsHelper.ObjectToJsonValue(pResponse));
        return pResponse;
    }

    @PostMapping("/update-song/{id}")
    public ResponseEntity<SongResponseType> updateSong(@RequestParam("song") String songJson,
                                                       @RequestParam(value = "files", required = false) MultipartFile[] files,
                                                       @PathVariable("id") Integer id
    ) throws IOException {
        ResponseEntity<SongResponseType> pResponse;
        String reqStartTime = GenericsHelper.getDateTime();
        log.info("SongController - updateSong - start - request: ["+reqStartTime+"]");
        log.info("songRequest: "+songJson);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        SongResponseType songResponseType = objectMapper.readValue(songJson, SongResponseType.class);
        songResponseType.setId(id);
        String mp3 = "";
        String media = "";
        System.out.println(songJson);
        if (null != files) {
            for (int i = 0; i < files.length; i++) {
                if (Utils.getFileExtension(files[i].getOriginalFilename()).equals("mp3")) {
                    mp3 = fileStorageService.storeFile(files[i]);
                } else {
                    media = fileStorageService.storeFile(files[i]);
                }
            }
            songResponseType.setImage(Utils.getUrlFilePath(media));
            songResponseType.setMediaUrl(Utils.getUrlFilePath(mp3));
        }
        pResponse = new ResponseEntity<>(songService.saveSong(songResponseType), HttpStatus.ACCEPTED);
        long milSecSt = System.currentTimeMillis();
        long milSecEnd = System.currentTimeMillis();
        String reqEndTime = GenericsHelper.getDateTime();
        log.info("SongController - updateSong - end - ReqStartTime[" + reqStartTime + "] ReqEndTime[" + reqEndTime + "] TimeDiffinMillSec["+ GenericsHelper.getDiffMilliSec(milSecSt, milSecEnd) +"] \n- psResponse: "
                +GenericsHelper.ObjectToJsonValue(pResponse));
        return pResponse;
    }

    @GetMapping("/top15")
    public ResponseEntity<List<SongResponseType>> getTop15BestSong() throws JsonProcessingException {
        ResponseEntity<List<SongResponseType>> pResponse;
        String reqStartTime = GenericsHelper.getDateTime();
        log.info("SongController - getTop15BestSong - start - request: ["+reqStartTime+"]");
        List<SongResponseType> list = songService.getTop15SongsPopular();
        pResponse = new ResponseEntity<>(list, HttpStatus.OK);
        long milSecSt = System.currentTimeMillis();
        long milSecEnd = System.currentTimeMillis();
        String reqEndTime = GenericsHelper.getDateTime();
        log.info("SongController - getTop15BestSong - end - ReqStartTime[" + reqStartTime + "] ReqEndTime[" + reqEndTime + "] TimeDiffinMillSec["+ GenericsHelper.getDiffMilliSec(milSecSt, milSecEnd) +"] \n- psResponse: "
                +GenericsHelper.ObjectToJsonValue(pResponse));
        return pResponse;
    }

    @PostMapping("/delete")
    public ResponseEntity<HttpStatus> deleteListSong(@RequestBody List<Integer> listSongId) {
        boolean isDelete = songService.deleteListSong(listSongId);
        if (isDelete) {
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }
    @PostMapping("/updateTotalListen")
    public synchronized ResponseEntity<Map<String,Integer>> updateTotalListen(@RequestParam("id") int id,
                                                     @RequestParam("target") String target) throws JsonProcessingException {
        ResponseEntity<Map<String,Integer>> pResponse;
        String reqStartTime = GenericsHelper.getDateTime();
        log.info("SongController - updateTotalListen - start - request: ["+reqStartTime+"]");
        log.info("request: [target: "+target+"],[id:"+id+"]");
        Map<String,Integer> result = new HashMap<>();
        if(null != target && target.equals("album")){
            result.put("album",albumService.updateCountListen(id));
        }
        if(null != target && target.equals("song")){
            result.put("song",(int)songService.updateCountListen(id));
        }
        pResponse = new ResponseEntity<>(result,HttpStatus.OK);
        long milSecSt = System.currentTimeMillis();
        long milSecEnd = System.currentTimeMillis();
        String reqEndTime = GenericsHelper.getDateTime();
        log.info("SongController - updateTotalListen - end - ReqStartTime[" + reqStartTime + "] ReqEndTime[" + reqEndTime + "] TimeDiffinMillSec["+ GenericsHelper.getDiffMilliSec(milSecSt, milSecEnd) +"] \n- psResponse: "
                +GenericsHelper.ObjectToJsonValue(pResponse));
        return pResponse;
    }
}
