package com.spotify.service.impl;

import com.spotify.dto.converter.AlbumConverter;
import com.spotify.dto.converter.GenresConverter;
import com.spotify.dto.converter.SongConverter;
import com.spotify.dto.request.PaginationRequest;
import com.spotify.dto.response.AlbumResponseType;
import com.spotify.dto.response.GenresResponseType;
import com.spotify.dto.response.SongResponseType;
import com.spotify.entities.Albums;
import com.spotify.entities.Genres;
import com.spotify.entities.Songs;
import com.spotify.exception.NotFoundEntityException;
import com.spotify.repository.GenresRepository;
import com.spotify.service.GenresService;
import com.spotify.ultils.Constraints;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GenresServiceImpl implements GenresService {
    private  GenresRepository genresRepository;
    private  GenresConverter genresConverter;
    @Autowired  private  SongConverter songConverter;
    @Autowired  private  AlbumConverter albumConverter;
    @Autowired
    public GenresServiceImpl(GenresRepository genresRepository, GenresConverter genresConverter) {
        this.genresRepository = genresRepository;
        this.genresConverter = genresConverter;
    }

    @Override
    public GenresResponseType save(GenresResponseType genresResponseType) {
        Genres genres = genresConverter.convertToEntity(genresResponseType);
        GenresResponseType genresResponseType1 = genresConverter.convertToDTO(genresRepository.save(genres));
        return genresResponseType1;
    }

    @Override
    public GenresResponseType update(GenresResponseType genresResponseType) {
        return null;
    }

    @Override
    public GenresResponseType findById(Integer id) {
        Optional<Genres> genres = genresRepository.findById(id);
        if (genres.isPresent()) {
            return genresConverter.convertToDTO(genres.get());
        }
        throw new NotFoundEntityException(Constraints.VALIDATE_NOT_FOUND);
    }

    @Override
    public boolean delete(Integer id) {
        return false;
    }


    @Override
    public Map<String, Object> getSongAndAlbumByGenresId(int genresId, PaginationRequest paginationRequestAlbum, PaginationRequest paginationRequestSong) {
        Pageable pageableAlbum = null;
        Pageable pageableSong = null;
        Map<String,Object> result = new HashMap<>();
        if (paginationRequestAlbum.getPage() > 0) {
            pageableAlbum = PageRequest.of(paginationRequestAlbum.getPage() - 1, paginationRequestAlbum.getSize());
        }
        if (paginationRequestAlbum.getOrder().equals("asc")) {
            pageableAlbum = PageRequest.of(paginationRequestAlbum.getPage() - 1, paginationRequestAlbum.getSize(), Sort.by(paginationRequestAlbum.getField()).ascending());
        }
        if (paginationRequestAlbum.getOrder().equals("desc")) {
            pageableAlbum = PageRequest.of(paginationRequestAlbum.getPage() - 1, paginationRequestAlbum.getSize(), Sort.by(paginationRequestAlbum.getField()).descending());
        }
        Page<Albums> albumsPage = genresRepository.getAlbumByGenresId(pageableAlbum,paginationRequestAlbum.getSearch(),genresId);
        if (paginationRequestSong.getPage() > 0) {
            pageableSong = PageRequest.of(paginationRequestSong.getPage() - 1, paginationRequestSong.getSize());
        }
        if (paginationRequestSong.getOrder().equals("asc")) {
            pageableSong = PageRequest.of(paginationRequestSong.getPage() - 1, paginationRequestSong.getSize(), Sort.by(paginationRequestSong.getField()).ascending());
        }
        if (paginationRequestSong.getOrder().equals("desc")) {
            pageableSong = PageRequest.of(paginationRequestSong.getPage() - 1, paginationRequestSong.getSize(), Sort.by(paginationRequestSong.getField()).descending());
        }
        Map<String,Object> albumKey = new HashMap<>();
        List<AlbumResponseType> albums = albumsPage.toList().stream().map(albums1 -> albumConverter.convertToDTO(albums1)).collect(Collectors.toList());
        albumKey.put("albums",albums);
        albumKey.put("totalPages",albumsPage.getTotalPages());
        albumKey.put("totalElements",albumsPage.getTotalElements());
        albumKey.put("currentPage",paginationRequestAlbum.getPage());
        Page<Songs> songsPage = genresRepository.getSongByGenresId(pageableSong,paginationRequestSong.getSearch(),genresId);
        Map<String,Object> songKey = new HashMap<>();
        List<SongResponseType> songs = songsPage.toList().stream().map(songs1 -> songConverter.convertToDTO(songs1)).collect(Collectors.toList());
        songKey.put("songs",songs);
        songKey.put("totalPages",songsPage.getTotalPages());
        songKey.put("totalElements",songsPage.getTotalElements());
        songKey.put("currentPage",paginationRequestSong.getPage());
        result.put("album",albumKey);
        result.put("song",songKey);
        return result;
    }

    @Override
    public Map<String, Object> paginationGenres(PaginationRequest paginationRequest) {
        Pageable pageable = null;
        if (paginationRequest.getPage() > 0) {
            pageable = PageRequest.of(paginationRequest.getPage() - 1, paginationRequest.getSize());
        }
        if (paginationRequest.getOrder().equals("asc")) {
            pageable = PageRequest.of(paginationRequest.getPage() - 1, paginationRequest.getSize(), Sort.by(paginationRequest.getField()).ascending());
        }
        if (paginationRequest.getOrder().equals("desc")) {
            pageable = PageRequest.of(paginationRequest.getPage() - 1, paginationRequest.getSize(), Sort.by(paginationRequest.getField()).descending());
        }
        Page<Genres> genresPage = genresRepository.paginationGenres(pageable, paginationRequest.getSearch());
        List<GenresResponseType> genresResponseTypeList = genresPage.toList().stream().map(genres -> genresConverter.convertToDTO(genres)).collect(Collectors.toList());
        Map<String, Object> map = new HashMap<>();
        map.put("genres", genresResponseTypeList);
        map.put("totalPages", genresPage.getTotalPages());
        map.put("totalElements", genresPage.getTotalElements());
        map.put("currentPage", paginationRequest.getPage());
        return map;
    }
}