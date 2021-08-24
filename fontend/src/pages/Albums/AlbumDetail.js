import React, { useEffect, useState } from 'react'
import MoreIcon from '../../resource/images/svg/more.svg'
import { getAlbumById } from '../../redux/albumReducer'
import { updateTotalListen } from '../../redux/songReducer'
import { getPlayList, playSingleSong } from "../../redux/playReducer";
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { getSecondsToMinutesAndSeconds } from '../../utils/FormatDateTime'
import PlayAllIcon from '../../resource/images/svg/play_all.svg'
import PauseAll from '../../resource/images/svg/pause_all.svg'
import QueueImage from '../../resource/images/svg/add_q.svg'
import { renderArtist } from '../../utils/UtilsFunction'
import PlayIcon from '../../resource/images/svg/play.svg'
import {formatDate} from '../../utils/FormatDateTime'
import $ from 'jquery'
const AlbumDetail = (props) => {
    const ListSong = (props) => {
        const items = props.items;
        const total = 0;
        const showMoreItem = (e) => {
            var target = $(e.target).parent().parent().parent();
            if (target.find("ul.more_option").hasClass('open_option')) {
                target.find("ul.more_option").removeClass('open_option');
            } else {
                $("ul.more_option.open_option").removeClass('open_option');
                target.find("ul.more_option").addClass('open_option');
            }
        }
        if (items != null) {
            return (
                <>
                    {props.items.map((item, i) => {

                        return (

                            <div className="col-lg-12 col-md-12 padding_right40">
                                <div className="ms_weekly_box">
                                    <div className="weekly_left">
                                        <span className="w_top_no">
                                            {i < 10 ? `0${i + 1}` : i}
                                        </span>
                                        <div className="w_top_song">
                                            <div className="w_tp_song_img">
                                                <img src={item.image} alt="" className="img-fluid" />
                                                <div className="ms_song_overlay">
                                                </div>
                                                <div onClick={() => playSingleSongAction(item)} className="ms_play_icon">
                                                    <img src={PlayIcon} alt="" />
                                                </div>
                                            </div>
                                            <div className="w_tp_song_name">
                                                <h3><a >{item.title}</a></h3>
                                                <h3><a >{renderArtist(item.artistSongs)}</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="weekly_right">
                                        <span className="w_song_time">{getSecondsToMinutesAndSeconds(Math.floor(item.timePlay))}</span>
                                        <span onClick={showMoreItem} className="ms_more_icon" data-other={1}>
                                            <img src={MoreIcon} alt="" />
                                        </span>
                                    </div>
                                    <ul className="more_option">
                                        <li><a ><span className="opt_icon"><span className="icon icon_fav" /></span>Add To Favourites</a></li>
                                        <li><a ><span className="opt_icon"><span className="icon icon_queue" /></span>Add To Queue</a></li>
                                        <li><a href={item.mediaUrl} ><span className="opt_icon"><span className="icon icon_dwn" /></span>Download Now</a></li>
                                        <li><a ><span className="opt_icon"><span className="icon icon_playlst" /></span>Add To Playlist</a></li>

                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </>
            );
        }

        return '';
    }

    const params = useParams("id");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAlbumById(params.id))
    }, [dispatch, params.id])
    const state = useSelector((states) => {
        return states.albumReducer.album;
    });
    const [initialState, setInitialState] = useState({
        album: null,
    })
    const initialData = () => {
        if (state != undefined) {
            setInitialState({ album: { ...state } })
        }
    }
    useEffect(() => {
        initialData();
    }, [params.id])
    const playAllAlbum = () => {
        dispatch(getPlayList(params.id))
        dispatch(updateTotalListen({target:'album',id:params.id}))
    }
    const formatTimePlay = () => {
        return getSecondsToMinutesAndSeconds(Math.floor(state.totalTime));
    }
    const playSingleSongAction = (songObject) => {
        let result = state.albumSongs;
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
    const renderArtistAlbum = (artist) => {
        let value = '';
        if (artist != null || artist != undefined) {
            artist.forEach((e) => {
                if (e.artists != null) {
                    value += e.artists.fullName + ' & ';
                }
            })
        }
        if (value.length > 1) {
            return value.substring(0, value.length - 2);
        }
        return value;
    }
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <>
            {/* <div className="ms_album_single_wrapper"> */}
            <div className="album_single_data">
                <div className="album_single_img">
                    <img src={state != undefined ? state.image : ''} alt="" className="img-fluid" />
                </div>
                <div className="album_single_text">
                    <h2>{state != undefined ? state.albumName : ''}</h2>
                    <p className="singer_name">Nghệ sĩ: {renderArtistAlbum(state != undefined ? state.artistAlbums : [])}</p>
                    <div className="album_feature">
                        <a className="album_date"> {state != undefined ? state.albumSongs.length : '0'} bài hát | Thời gian: {state != undefined ? formatTimePlay() : ''}</a>
                        <a className="album_date"> {state != undefined ?`Released: `+ formatDate(state.releaseDate) : ''}</a>
                    </div>
                    <div style={{ color: 'white' }} className="album_btn">
                        <a style={{ cursor: 'pointer' }} onClick={playAllAlbum} className="ms_btn play_btn"><span className="play_all"><img src={PlayAllIcon} alt="" />Phát toàn bộ</span><span className="pause_all"><img src={PauseAll} alt="" />Pause</span></a>
                    </div>
                </div>
                <div className="album_more_optn ms_more_icon">
                    <span><img src={MoreIcon} alt="" /></span>
                </div>
                <ul className="more_option">
                    <li><a ><span className="opt_icon"><span className="icon icon_fav" /></span>Add To Favourites</a></li>
                    <li><a ><span className="opt_icon"><span className="icon icon_queue" /></span>Add To Queue</a></li>
                    <li><a ><span className="opt_icon"><span className="icon icon_dwn" /></span>Download Now</a></li>
                    <li><a ><span className="opt_icon"><span className="icon icon_playlst" /></span>Add To Playlist</a></li>

                </ul>
            </div>

            {/* </div> */}
            <div class="ms_weekly_wrapper">
                <div class="ms_weekly_inner">
                    <div class="row">
                        <ListSong items={state != undefined ? state.albumSongs : []} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default AlbumDetail;