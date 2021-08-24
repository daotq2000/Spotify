package com.spotify.service.impl;

import com.spotify.dto.converter.ArtistConverter;
import com.spotify.dto.converter.ArtistSongConverter;
import com.spotify.dto.request.PaginationRequest;
import com.spotify.dto.response.ArtistResponseType;
import com.spotify.dto.response.ArtistSongResponseType;
import com.spotify.entities.ArtistSongs;
import com.spotify.entities.Artists;
import com.spotify.exception.NotFoundEntityException;
import com.spotify.repository.ArtistRepository;
import com.spotify.service.ArtistService;
import com.spotify.ultils.Constraints;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ArtistServiceImpl implements ArtistService {
    private final ArtistRepository artistRepository;
    private final ArtistConverter artistConverter;
    private final ArtistSongConverter artistSongConverter;

    @Autowired
    public ArtistServiceImpl(ArtistRepository artistRepository, ArtistConverter artistConverter, ArtistSongConverter artistSongConverter) {
        this.artistRepository = artistRepository;
        this.artistConverter = artistConverter;
        this.artistSongConverter = artistSongConverter;
    }

    @Override
    public ArtistResponseType save(ArtistResponseType artistResponseType) {
        if (StringUtils.isEmpty(artistResponseType.getFullName())) {
            throw new IllegalArgumentException("Name of Artist is require field");
        }
        if (null == artistResponseType.getBirthDay()) {
            throw new IllegalArgumentException("Birth day of Artist is require field");
        }
        if (StringUtils.isEmpty(artistResponseType.getCountryActive())) {
            throw new IllegalArgumentException("Country activities is require field");
        }
        Artists artists = artistConverter.convertToEntity(artistResponseType);
        Artists artistsSave;
        ArtistResponseType artistResponse;
        Optional<Artists> optionalArtist = Optional.ofNullable(artistRepository.findById(artistResponseType.getId() == null?0:artistResponseType.getId()).orElse(null));
        if (!optionalArtist.isPresent()) {
            artistsSave = artistRepository.save(artists);
            artistResponse = artistConverter.convertToDTO(artistsSave);
        } else {
            artistsSave = optionalArtist.get();
            if (null != artists.getImage()) {
                artistsSave.setImage(artists.getImage());
            }
            artistsSave.setBirthDay(artists.getBirthDay());
            artistsSave.setCountryActive(artists.getCountryActive());
            artistsSave.setFullName(artists.getFullName());
            artistsSave.setDescription(artists.getDescription());
            artistsSave.setGender(artists.isGender());
            artistResponse = artistConverter.convertToDTO(artistRepository.save(artistsSave));
        }
        return artistResponse;
    }

    @Override
    public ArtistResponseType update(ArtistResponseType artistResponseType) {
        return null;
    }

    @Override
    public ArtistResponseType findById(Integer id) {
        Optional<Artists> artists = artistRepository.findById(id);
        if (artists.isPresent()) {
            return artistConverter.convertAllDependencies(artists.get());
        }
        throw new NotFoundEntityException(Constraints.VALIDATE_NOT_FOUND);
    }

    @Override
    public boolean delete(Integer id) {
        Optional<Artists> artists = artistRepository.findById(id);
        if (artists.isPresent()) {
            artistRepository.deleteById(id);
            return true;
        }
        throw new NotFoundEntityException(Constraints.VALIDATE_NOT_FOUND);
    }

    @Override
    public Map<String, Object> paginationArtist(PaginationRequest request) {
        Pageable pageable = null;
        Map<String, Object> result = new HashMap<>();
        if (request.getPage() > 0) {
            pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        }
        if (request.getOrder().equals("asc")) {
            pageable = PageRequest.of(request.getPage() - 1, request.getSize(), Sort.by(request.getField()).ascending());
        }
        if (request.getOrder().equals("desc")) {
            pageable = PageRequest.of(request.getPage() - 1, request.getSize(), Sort.by(request.getField()).descending());
        }
        Page<Artists> artistsPage = artistRepository.paginationArtist(pageable, request.getSearch());
        List<ArtistResponseType> albumResponseTypes = artistsPage.toList().stream().map(artists -> artistConverter.convertToDTO(artists)).collect(Collectors.toList());
        result.put("artists", albumResponseTypes);
        result.put("totalPages", artistsPage.getTotalPages());
        result.put("totalElements", artistsPage.getTotalElements());
        result.put("currentPage", request.getPage());
        return result;
    }

    @Override
    public List<ArtistSongResponseType> getListArtistSongsByArtistId(int artistId) {
        List<ArtistSongs> artistSongs = artistRepository.getAllByArtistId(artistId);
        List<ArtistSongResponseType> response = new ArrayList<>();
        if (null != artistSongs) {
            artistSongs.forEach(artistSongs1 -> {
                ArtistSongResponseType artistSongResponseType = artistSongConverter.convertToDTO(artistSongs1);
                artistSongResponseType.setArtists(null);
                response.add(artistSongResponseType);
            });
        }
        return response;
    }
}
