package com.spotify.dto.converter;

import com.spotify.dto.response.ArtistSongResponseType;
import com.spotify.dto.response.SongResponseType;
import com.spotify.entities.ArtistSongId;
import com.spotify.entities.ArtistSongs;
import com.spotify.entities.Songs;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class SongConverter {
    private final ModelMapper modelMapper = new ModelMapper();
    @Autowired
    private ArtistSongConverter artistSongConverter;
    @Autowired
    private ArtistConverter artistConverter;
    @Autowired
    private GenresConverter genresConverter;

    public SongResponseType convertToDTO(Songs songs) {
        SongResponseType songResponseType = new SongResponseType();
        songResponseType.setMediaUrl(songs.getMediaUrl());
        songResponseType.setImage(songs.getImage());
        songResponseType.setDescription(songs.getDescription());
        songResponseType.setCountListen(songs.getCountListen());
        songResponseType.setId(songs.getId());
        songResponseType.setTitle(songs.getTitle());
        songResponseType.setLyrics(songs.getLyrics());
        songResponseType.setDownloadPermission(songs.getDownloadPermission());
        songResponseType.setTimePlay(songs.getTimePlay());
        List<ArtistSongResponseType> artistSongResponseTypes = new ArrayList<>();
        List<ArtistSongs> artistSongs = songs.getArtistSongs();
        if (null != songs.getGenres()) {
            songResponseType.setGenres(genresConverter.convertToDTO(songs.getGenres()));
        }
        if (null != artistSongs) {
            artistSongs.forEach(item -> {
                ArtistSongResponseType artistSongResponseType = new ArtistSongResponseType();
                artistSongResponseType.setArtists(artistConverter.convertToDTO(item.getArtistSongId().getArtists()));
                artistSongResponseTypes.add(artistSongResponseType);
            });
        }
        songResponseType.setArtistSongs(artistSongResponseTypes);
        return songResponseType;
    }

    public Songs convertToEntity(SongResponseType songResponseType) {
        Songs song = new Songs();
        song.setCountListen(songResponseType.getCountListen());
        song.setDescription(songResponseType.getDescription());
        song.setImage(songResponseType.getImage());
        song.setLyrics(songResponseType.getLyrics());
        song.setTitle(songResponseType.getTitle());
        song.setMediaUrl(songResponseType.getMediaUrl());
        song.setDownloadPermission(songResponseType.getDownloadPermission());
        song.setTimePlay(songResponseType.getTimePlay());
        song.setId(songResponseType.getId());
        if (null != songResponseType.getGenres()) {
            song.setGenres(genresConverter.convertToEntity(songResponseType.getGenres()));
        }
        List<ArtistSongs> artistSongs = new ArrayList<>();
        List<ArtistSongResponseType> artistSongResponseTypes = songResponseType.getArtistSongs();
        if (null != artistSongResponseTypes) {
            artistSongResponseTypes.forEach(artistSongResponseType -> {
                ArtistSongId artistSongId = new ArtistSongId();
                artistSongId.setSongs(song);
                artistSongId.setArtists(artistConverter.convertToEntity(artistSongResponseType.getArtists()));
                ArtistSongs artistSongsValue = new ArtistSongs(artistSongId);
                artistSongs.add(artistSongsValue);
            });
            song.setArtistSongs(artistSongs);
        }
        return song;
    }
}
