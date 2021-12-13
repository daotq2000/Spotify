package com.spotify.service;

import com.spotify.dto.request.PaginationRequest;
import com.spotify.dto.response.SongResponseType;

import java.util.List;
import java.util.Map;

public interface SongService extends BaseService<SongResponseType, Integer> {
    Map<String, Object> paginationSongs(PaginationRequest paginationRequest);

    SongResponseType saveSong(SongResponseType songResponseType);

    List<SongResponseType> getTop15SongsPopular();

    boolean deleteListSong(List<Integer> listSongIds);

}
