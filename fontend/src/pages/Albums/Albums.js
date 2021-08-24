import React, {useEffect, useState} from 'react'
import {paginationAlbum} from '../../redux/albumReducer'
import {useDispatch, useSelector} from 'react-redux'
import PlayIcon from '../../resource/images/svg/play.svg'
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {getPlayList} from "../../redux/playReducer";
import {updateTotalListen} from "../../redux/songReducer";
import './style.css'
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2)
        },
        '.MuiPaginationItem-page.Mui-selected': {
            color: 'white',
            fontSize: 'large'
        }
    }
}));

export const Albums = (props) => {
    const dispatch = useDispatch();
    const getAlbumIdAction = (albumId) => {
        dispatch(getPlayList(albumId))
        updateTotalListen({target:'album',id:albumId})
    }
    return (
        <>
            {props.items.map((item, index) => {
                return (
                    <div key={`album-${index}`} className="col-lg-2 col-md-6">
                        <div className="ms_rcnt_box marger_bottom30">
                            <div className="ms_rcnt_box_img">
                                <img src={item.image} alt="" className="img-fluid" />
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay" />
                                    <div onClick={() => { getAlbumIdAction(item.id) }} className="ms_play_icon">
                                        <img src={PlayIcon} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="ms_rcnt_box_text">
                                <h3><Link to={`/album/${item.id}`} >{item.albumName}</Link></h3>
                                {/* <p>20 songs</p> */}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
const ListAlbums = (props) => {
    const [pagination, setPagination] = useState({
        page: 1,
        size: 12,
        field: '',
        order: '',
        search: '',
        totalElements:0,
        totalPages:0
    })
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(paginationAlbum(pagination))
    }, [dispatch, pagination.page, pagination.size, pagination.field, pagination.order, pagination.search]);
    const state = useSelector((states) => {
        return states.albumReducer;
    });
    const handleChange = (event, value) => {
        setPagination({...pagination,page: value})
      };
    return (
        <>
            <div className="ms_top_artist">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ms_heading">
                                <h1>Danh sách Album Hot</h1>
                            </div>
                        </div>
                        <Albums items={state.albums} />

                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                        <Pagination onChange={handleChange}  count={state.totalPages !== undefined?state.totalPages:1} color="secondary" />

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default ListAlbums;