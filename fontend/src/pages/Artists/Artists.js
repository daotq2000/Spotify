import React, {useEffect, useState} from 'react'
import {paginationArtist} from '../../redux/artistReducer'
import {useDispatch, useSelector} from 'react-redux'
import PlayIcon from '../../resource/images/svg/play.svg'
import {makeStyles} from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import {getPlayList} from "../../redux/playReducer";
import history from '../../router/history'
import { Link } from 'react-router-dom';
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

const Artists = (props) => {
    const dispatch = useDispatch();
    const getAlbumIdAction = (albumId) => {
        dispatch(getPlayList(albumId))
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
                                <h3><Link to={`/artist/${item.id}`}>{item.fullName}</Link></h3>
                                {/* <p>20 songs</p> */}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
const ListArtists = (props) => {
    const classes = useStyles();
    const [pagination, setPagination] = useState({
        page: 1,
        size: 12,
        field: '',
        order: '',
        search: '',
        totalElements:0,
        totalPages:0
    })

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(paginationArtist(pagination))
    }, [dispatch, pagination.page, pagination.size, pagination.field, pagination.order, pagination.search]);
    const state = useSelector((states) => {
        return states.artistReducer;
    });
    const handleChange = (event, value) => {
        setPagination({...pagination,page: value})
      };
      useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    return (
        <>
            <div className="ms_top_artist">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="ms_heading">
                                <h1>Danh sách nghệ sĩ nổi bật</h1>
                            </div>
                        </div>
                        <Artists items={state.artists} />
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
export default ListArtists;