package com.spotify.repository;

import com.spotify.entities.AlbumSongId;
import com.spotify.entities.AlbumSongs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AlbumSongRepository extends JpaRepository<AlbumSongs, AlbumSongId> {
    @Query(value = "SELECT A from AlbumSongs A where A.albumSongId.albums.id =:albumId ")
    List<AlbumSongs> getAllByAlbumId(int albumId);
}
