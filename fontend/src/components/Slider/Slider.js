import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination, Virtual } from "swiper/core";
import "swiper/swiper-bundle.css";
import React, { useEffect, useState } from 'react'
import MoreIcon from '../../resource/images/svg/more.svg'
import PlayIcon from '../../resource/images/svg/play.svg'
import { useDispatch, useSelector } from 'react-redux'
import { paginationAlbum } from '../../redux/albumReducer'
import { getPlayList } from "../../redux/playReducer";
import { Link } from "react-router-dom";
import history from '../../router/history'
SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

const Slider = (props) => {
    const title = props.title;
    const search = props.search;

    const Slider = (item) => {
        return (
            <SwiperSlide key={`slide-${item.id}`} style={{ listStyle: "none" }}>

                <div className="swiper-slide" data-swiper-slide-index={item.index}>
                    <div className="ms_rcnt_box">
                        <div className="ms_rcnt_box_img">
                            <img src={item.image} alt="" />
                            <div className="ms_main_overlay">
                                <div className="ms_box_overlay" />
                                <div className="ms_more_icon">
                                    <img src={MoreIcon} alt="" />
                                </div>
                                <ul className="more_option">
                                    <li><a href="_blank"><span className="opt_icon"><span className="icon icon_fav" /></span>Add To Favourites</a></li>
                                    <li><a href="_blank"><span className="opt_icon"><span className="icon icon_queue" /></span>Add To Queue</a></li>
                                    <li><a href="_blank"><span className="opt_icon"><span className="icon icon_dwn" /></span>Download Now</a></li>
                                    <li><a href="_blank"><span className="opt_icon"><span className="icon icon_playlst" /></span>Add To Playlist</a></li>
                                    <li><a href="_blank"><span className="opt_icon"><span className="icon icon_share" /></span>Share</a></li>
                                </ul>
                                <div onClick={() => { getAlbumIdAction(item.id) }} className="ms_play_icon">
                                    <img src={PlayIcon} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="ms_rcnt_box_text">
                            <h3><Link to={`/album/${item.id}`} >{item.albumName}</Link></h3>
                            <p>Lượt nghe: {item.totalListen}</p>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        );
    }

    const [pagination, setPagination] = useState({
        page: 1,
        size: 10,
        field: '',
        order: '',
        search: ''
    })
    useEffect(() => {
        if(search != undefined){
            setPagination({...pagination,search:search})
        }
    }, [search])
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(paginationAlbum(pagination))
    }, [dispatch, pagination.page, pagination.size, pagination.field, pagination.order, pagination.search]);
    const state = useSelector((states) => {
        return states.albumReducer;
    });
    const getAlbumIdAction = (albumId) => {
        dispatch(getPlayList(albumId))
        history.push(`/album/${albumId}`)
    }
    const renderItems = () => {
        let result = [];
        let index = 0;
        state.albums.map((album) => {
            let obj = { ...album };
            obj.index = index++;
            result.push(Slider(obj))
        })
        return result;
    }

    return (
        <>
            <div className="ms_rcnt_slider">
                <div style={title != undefined ? { display: 'none' } : { display: '' }} className="ms_heading">
                    <h1>{title != undefined ? title : 'Album Nổi Bật'}</h1>
                    <span className="veiw_all"><Link to={`/albums`} >Xem Thêm</Link></span>
                </div>
                <Swiper
                    id="albums"

                    virtual
                    slidesPerColumnFill="row"
                    spaceBetween={30}
                    resizeObserver={true}
                    dynamicBullets={false}
                    //   slidesPerGroup={4}
                    // autoplay
                    // loop
                    navigation
                    breakpoints={{
                        "300": {
                            "slidesPerView": 2,
                            "spaceBetween": 20
                        },
                        "640": {
                            "slidesPerView": 2,
                            "spaceBetween": 20
                        },
                        "768": {
                            "slidesPerView": 4,
                            "spaceBetween": 40
                        },
                        "1024": {
                            "slidesPerView": 6,
                            "spaceBetween": 20
                        }
                    }}


                >
                    {renderItems()}
                </Swiper>
            </div>

        </>
    );
}
export default Slider;