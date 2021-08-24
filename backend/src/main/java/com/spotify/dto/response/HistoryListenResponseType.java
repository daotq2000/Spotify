package com.spotify.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HistoryListenResponseType {
    private Integer id;
    private UserResponseType users;
    private SongResponseType songs;
    private int countListen;
    private LocalDate date;
}
