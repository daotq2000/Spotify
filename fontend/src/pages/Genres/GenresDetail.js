import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getAlbumAndSongByGenresId } from '../../redux/genresReducer'
import { Songs } from '../../components/Search/Search'
import { renderArtist } from '../../utils/UtilsFunction'
import { getSecondsToMinutesAndSeconds } from '../../utils/FormatDateTime'
import MoreIcon from '../../resource/images/svg/more.svg'
import PlayIcon from '../../resource/images/svg/play.svg'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { playSingleSong } from "../../redux/playReducer";
import { Albums } from '../../pages/Albums/Albums'
import Pagination from '@material-ui/lab/Pagination';
import $ from 'jquery'
const RenderListSong = (items) => {
    const dispatch = useDispatch();
    const playSingleSongAction = (songObject) => {
        let result = items;
        if (result != undefined) {
            let rs = [];
            let index = songObject.id;
            result.forEach((item, idx) => {
                if (item.id != index) {
                    let songObj = { songs: item }
                    rs.push(songObj);
                }
            })
            let song = { songs: songObject };
            rs.splice(0, 0, song)
            dispatch(playSingleSong(rs))
        }
    }
    const showMoreItem = (e) => {
        var target = $(e.target).parent().parent().parent();
        if (target.hasClass('ms_weekly_box')) {
            if (target.find("ul.more_option").hasClass('open_option')) {
                target.find("ul.more_option").removeClass('open_option');
            } else {
                $("ul.more_option.open_option").removeClass('open_option');
                target.find("ul.more_option").addClass('open_option');
            }
        }

    }
    if (items != undefined || items != null) {
        return (
            <>
                {items.map((item, index) => {
                    return (<>
                        <div key={`song-${index}`} className="ms_weekly_box">
                            <div className="weekly_left">
                                <span className="w_top_no"> {(index + 1) < 10 ? `0${index + 1}` : `${index + 1}`} </span>
                                <div className="w_top_song">
                                    <div className="w_tp_song_img">
                                        <img src={item.image} alt="" className="img-fluid" />
                                        <div className="ms_song_overlay" />
                                        <div className="ms_play_icon">
                                            <img onClick={() => playSingleSongAction(item)} src={PlayIcon} alt="" />
                                        </div>
                                    </div>
                                    <div className="w_tp_song_name">
                                        <h3><a >{item.title}</a></h3>
                                        <h3><a >{item.artistSongs != null > 0 ? <>{renderArtist(item.artistSongs)}</> : <></>}</a></h3>
                                    </div>
                                </div>
                            </div>
                            <div className="weekly_right">
                                <span className="w_song_time">{getSecondsToMinutesAndSeconds(Math.floor(item.timePlay))}</span>
                                <span onClick={(e) => showMoreItem(e)} className="ms_more_icon" data-other={item.id}>
                                    <img src={MoreIcon} alt="" />
                                </span>
                            </div>
                            <ul className="more_option">
                                <li>
                                    <a ><span className="opt_icon"><span className="icon icon_fav" /></span>Add To
                                        Favourites</a>
                                </li>
                                <li>
                                    <a ><span className="opt_icon"><span className="icon icon_queue" /></span>Add
                                        To Queue</a>
                                </li>
                                <li>
                                    <a href={item.mediaUrl} ><span className="opt_icon"><span className="icon icon_dwn" /></span>Download Now</a>
                                </li>
                                <li>
                                    <a ><span className="opt_icon"><span className="icon icon_playlst" /></span>Add To Playlist</a>
                                </li>

                            </ul>
                        </div>
                        <div className="ms_divider"></div>
                    </>);
                })}
            </>
        );
    }
}
const GenresDetail = (props) => {
    const params = useParams();
    const dispatch = useDispatch();
    const [song, setSong] = useState(null);
    const [album, setAlbum] = useState(null);
    const [genresName, setGenresName] = useState('');
    const [paginationAlbum, setPaginationAlbum] = useState({
        page: 1,
        size: 18,
        field: '',
        order: '',
        search: ''
    })
    const [paginationSong, setPaginationSong] = useState({
        page: 1,
        size: 15,
        field: '',
        order: '',
        search: ''
    })
    useEffect(() => {
        const payload = { id: params.id, albumRequest: paginationAlbum, songRequest: paginationSong };
        dispatch(getAlbumAndSongByGenresId(payload))
    }, [dispatch, paginationSong, paginationAlbum])
    const genresReducer = useSelector((state) => {
        return state.genresReducer;
    });
    useEffect(() => {
        let songAndAlbum = genresReducer.songAndAlbum;
        if (songAndAlbum != undefined) {
            if (songAndAlbum.song != undefined) {
                setSong(songAndAlbum.song)
            }
            if (songAndAlbum.album != undefined) {
                setAlbum(songAndAlbum.album)
            }
        }
        if(genresReducer.currentGenres != undefined) {
            setGenresName(genresReducer.currentGenres.genresName);
        }
        
    }, [genresReducer])
    const handleChange = (event, value) => {
        setPaginationSong({ ...paginationSong, page: value })
    };
    const handleChangeAlbumPagination = (event, value) => {
        setPaginationAlbum({ ...paginationAlbum, page: value })
    };
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <>
            <div style={{ marginTop: '10px', marginLeft: '15px', marginBottom: '0px' }} className="ms_heading">
                <h1>Thể loại "{genresName}"  </h1>
            </div>
            <div className="ms_divider"></div>
            <div style={{ marginTop: '10px', marginLeft: '15px', marginBottom: '0px' }} className="ms_heading">
                <h1>Bài Hát Liên Quan <ArrowForwardIosIcon style={{ paddingTop: '10px', width: '13px' }} /></h1>
            </div>
            <div style={{ display: 'flow-root' }} className="col-lg-12 col-md-12">
                {RenderListSong(song != null ? song.songs : [])}
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <Pagination onChange={handleChange} count={song !== null ? song.totalPages : 1} color="secondary" />
                </div>
            </div>
            <div style={{ marginTop: '10px', marginLeft: '15px', marginBottom: '0px' }} className="ms_heading">
                <h1>Album Liên Quan<ArrowForwardIosIcon style={{ paddingTop: '10px', width: '13px' }} /></h1>
            </div>
            <div className="row">
                <Albums items={album != null ? album.albums : []} />
            </div>
            <div className="row">
                <div className="col-lg-12 col-md-12">
                    <Pagination onChange={handleChangeAlbumPagination} count={album != null ? album.totalPages : 1} color="secondary" />
                </div>
            </div>
        </>
    );
}
export default GenresDetail;;