package com.spotify.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AlbumResponseType {
    private Integer id;
    private String albumName;
    private Date releaseDate;
    private Float albumTimeLength;
    private int totalListen;
    private String image;
    private boolean downloadPermission;
    private GenresResponseType genres;
    private List<ArtistAlbumResponseType> artistAlbums;
    private List<AlbumSongResponseType> albumSongs;
}
