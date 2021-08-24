package com.spotify.repository;

import com.spotify.entities.ArtistSongId;
import com.spotify.entities.ArtistSongs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtistSongRepository extends JpaRepository<ArtistSongs, ArtistSongId> {
    @Query(value = "DELETE FROM ArtistSongs WHERE artistSongId.songs.id =:songId ")
    @Modifying
    int deleteArtistSongs(int songId);
}
