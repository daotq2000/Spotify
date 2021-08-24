import React, { useEffect, useState } from 'react'
import PlayIcon from '../../resource/images/svg/play.svg'
import { useDispatch, useSelector } from 'react-redux'
import { paginationGenres } from '../../redux/genresReducer'
import { Link } from 'react-router-dom'
import history from '../../router/history'
const Genres = () => {
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState({
        page: 1,
        size: 12,
        field: '',
        order: '',
        search: ''
    })
    useEffect(() => {
        dispatch(paginationGenres(pagination))
    }, [dispatch, pagination.page, pagination.size, pagination.field, pagination.order, pagination.search]);
    const state = useSelector((states) => {
        return states.genresReducer;
    });

    const createItem = (items) => {
        return (

            <>
                <div className="col-lg-4">
                    <div className="ms_genres_box">
                        <img src={items[0].image != null ? items[0].image : ''} alt="" className="img-fluid" />
                        <div className="ms_main_overlay">
                            <div className="ms_box_overlay" />
                            <div  className="ms_play_icon">
                                <img onClick={()=> history.push(`/genres/${items[0].id}`)} src={PlayIcon} alt="" />
                            </div>
                            <div className="ovrly_text_div">
                                <span className="ovrly_text1"><Link to={`/genres/${items[0].id}`} >{items[0].genresName}</Link></span>
                                <span className="ovrly_text2"><Link to={`/genres/${items[0].id}`} >Xem chi tiết</Link></span>
                            </div>
                        </div>
                        <div className="ms_box_overlay_on">
                            <div className="ovrly_text_div">
                                <span className="ovrly_text1"><Link to={`/genres/${items[0].id}`} >{items[0].genresName}</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ms_genres_box">
                                <img src={items[1].image != null ? items[1].image : ''} alt="" className="img-fluid" />
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay" />
                                    <div  className="ms_play_icon">
                                        <img onClick={()=> history.push(`/genres/${items[1].id}`)} src={PlayIcon} alt="" />
                                    </div>
                                    <div className="ovrly_text_div">
                                        <span className="ovrly_text1"><Link to={`/genres/${items[1].id}`} >{items[1].genresName}</Link></span>
                                        <span className="ovrly_text2"><Link to={`/genres/${items[1].id}`} >Xem chi tiết</Link></span>
                                    </div>
                                </div>
                                <div className="ms_box_overlay_on">
                                    <div className="ovrly_text_div">
                                        <span className="ovrly_text1"><Link to={`/genres/${items[1].id}`} >{items[1].genresName}</Link></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ms_genres_box">
                                <img src={items[2].image != null ? items[2].image : ''} alt="" className="img-fluid" />
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay" />
                                    <div  className="ms_play_icon">
                                        <img onClick={()=> history.push(`/genres/${items[2].id}`)} src={PlayIcon} alt="" />
                                    </div>
                                    <div className="ovrly_text_div">
                                        <span className="ovrly_text1"><Link to={`/genres/${items[2].id}`} >{items[2].genresName}</Link></span>
                                        <span className="ovrly_text2"><Link to={`/genres/${items[2].id}`} >Xem chi tiết</Link></span>
                                    </div>
                                </div>
                                <div className="ms_box_overlay_on">
                                    <div className="ovrly_text_div">
                                        <span className="ovrly_text1"><Link to={`/genres/${items[2].id}`} >{items[2].genresName}</Link></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ms_genres_box">
                                <img src={items[3].image != null ? items[3].image : ''} alt="" className="img-fluid" />
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay" />
                                    <div className="ms_play_icon">
                                        <img  onClick={()=> history.push(`/genres/${items[3].id}`)} src={PlayIcon} alt="" />
                                    </div>
                                    <div className="ovrly_text_div">
                                        <span className="ovrly_text1"><Link to={`/genres/${items[3].id}`} >{items[3].genresName}</Link></span>
                                        <span className="ovrly_text2"><Link to={`/genres/${items[3].id}`} >Xem chi tiết</Link></span>
                                    </div>
                                </div>
                                <div className="ms_box_overlay_on">
                                    <div className="ovrly_text_div">
                                        <span className="ovrly_text1"><Link to={`/genres/${items[3].id}`} >{items[3].genresName}</Link></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="ms_genres_box">
                                <img src={items[4].image != null ? items[4].image : ''} alt="" className="img-fluid" />
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay" />
                                    <div className="ms_play_icon">
                                        <img  onClick={()=> history.push(`/genres/${items[4].id}`)} src={PlayIcon} alt="" />
                                    </div>
                                    <div className="ovrly_text_div">
                                        <span className="ovrly_text1"><Link to={`/genres/${items[4].id}`} >{items[4].genresName}</Link></span>
                                        <span className="ovrly_text2"><Link to={`/genres/${items[4].id}`} >Xem chi tiết</Link></span>
                                    </div>
                                </div>
                                <div className="ms_box_overlay_on">
                                    <div className="ovrly_text_div">
                                        <span className="ovrly_text1"><Link to={`/genres/${items[4].id}`} >{items[4].genresName}</Link></span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2">
                    <div className="ms_genres_box">
                        <img src={items[5].image != null ? items[5].image : ''} alt="" className="img-fluid" />
                        <div className="ms_main_overlay">
                            <div className="ms_box_overlay" />
                            <div  className="ms_play_icon">
                                <img onClick={()=> history.push(`/genres/${items[5].id}`)} src={PlayIcon} alt="" />
                            </div>
                            <div className="ovrly_text_div">
                                <span className="ovrly_text1"><Link to={`/genres/${items[5].id}`} >{items[5].genresName}</Link></span>
                                <span className="ovrly_text2"><Link to={`/genres/${items[5].id}`} >Xem chi tiết</Link></span>

                            </div>
                        </div>
                        <div className="ms_box_overlay_on">
                            <div className="ovrly_text_div">
                                <span className="ovrly_text1"><Link to={`/genres/${items[5].id}`} >{items[5].genresName}</Link></span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    const renderItems = () => {
        let result = state.genres;
        let arr = [];
        result.map((item) => {
            arr.push(item);
        })
        if (arr.length > 0) {
            return createItem(arr);
        }
        return null;
    }
    return (
        <>
            <div className="ms_genres_wrapper">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ms_heading">
                            <h1>Thể Loại Nổi Bật</h1>
                            <span className="veiw_all"><a href="_blank">Xem Thêm</a></span>
                        </div>
                    </div>
                    {renderItems()}

                </div>
            </div>
        </>
    );
}
export default Genres;