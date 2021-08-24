package com.spotify.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ArtistResponseType {
    private Integer id;
    private String fullName;
    private boolean gender;
    private LocalDate birthDay;
    private String description;
    private String countryActive;
    private String image;
    private List<ArtistSongResponseType> artistSongs;
    private List<ArtistAlbumResponseType> artistAlbums;
}
