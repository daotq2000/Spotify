package com.spotify.entities;

import lombok.*;

import javax.persistence.CascadeType;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Embeddable
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class AlbumSongId implements Serializable {
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "songs_id")
    private Songs songs;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "albums_id")
    private Albums albums;

}
