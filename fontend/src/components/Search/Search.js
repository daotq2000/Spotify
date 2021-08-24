import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { paginationAlbum } from '../../redux/albumReducer'
import { paginationSongs } from '../../redux/songReducer'
import { paginationArtist } from '../../redux/artistReducer'
import './style.css'
import { useDispatch, useSelector } from 'react-redux';
import { search } from '../../redux/searchReducer'
import MoreIcon from '../../resource/images/svg/more.svg'
import { getSecondsToMinutesAndSeconds } from '../../utils/FormatDateTime'
import { playSingleSong } from "../../redux/playReducer";
import PlayIcon from '../../resource/images/svg/play.svg'
import { renderArtist } from '../../utils/UtilsFunction'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import $ from 'jquery'
import { Swiper, SwiperSlide } from "swiper/react";
import { getPlayList } from "../../redux/playReducer";
import { Link } from "react-router-dom";
import Album from '../../components/Slider/Slider'
import Artist from '../../components/Artist/Artist'
export const Songs = (props) => {
  const [songs, setSongs] = useState([]);
  const search = props.search;
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    page: 1,
    size: 10,
    field: '',
    order: '',
    search: search,
  })
  useEffect(() => {
    setPagination({ ...pagination, search: search })
  }, [search])
  useEffect(() => {
    dispatch(paginationSongs(pagination))
  }, [dispatch, pagination.page, pagination.size, pagination.field, pagination.order, pagination.search])
  const songReducer = useSelector((state) => {
    return state.songReducer;
  });


  const playSingleSongAction = (songObject) => {
    let result = songReducer.songs;
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

  const renderListSong = (items) => {
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
                      <p style={{fontSize:'small',fontWeight:'bold',color:'white'}}>{item.artistSongs != null > 0 ? <>{renderArtist(item.artistSongs)}</> : <></>}</p>
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
  return (
    <div style={{ display: 'flow-root' }} className="col-lg-12 col-md-12">
      {renderListSong(songReducer.songs)}
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#14182a',
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const searchReducer = useSelector((state) => {
    return state.searchReducer;
  })
  const songReducer = useSelector((state) => {
    return state.songReducer;
  })
  const albumReducer = useSelector((state) => {
    return state.albumReducer;
  })
  const artistReducer = useSelector((state) => {
    return state.artistReducer;
  })
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const renderSongs = () => {
    return (
      <>
        <div style={{ marginTop: '10px', marginLeft: '15px', marginBottom: '0px' }} className="ms_heading">
          <h1>Bài Hát <ArrowForwardIosIcon style={{ paddingTop: '10px', width: '13px' }} /></h1>
        </div>
        <Songs search={searchReducer.search} title={''} />
      </>
    );
  }
  const renderAlbum = () => {
    return (
      <>
        <div style={{ marginTop: '10px', marginLeft: '15px', marginBottom: '0px' }} className="ms_heading">
          <h1>Album <ArrowForwardIosIcon style={{ paddingTop: '10px', width: '13px' }} /></h1>
        </div>
        <Album search={searchReducer.search} title={''} />
      </>
    );
  }
  const renderArtist = () => {
    return (
      <>
        <div style={{ marginTop: '10px', marginLeft: '15px', marginBottom: '0px' }} className="ms_heading">
          <h1>Nghệ Sĩ <ArrowForwardIosIcon style={{ paddingTop: '10px', width: '13px' }} /></h1>
        </div>
        <Artist search={searchReducer.search} title={''} />
      </>
    );
  }
  return (
    <div className="ms_featured_slider">
      <div className="ms_heading">
        <h1>Top kết quả tìm kiếm cho "{searchReducer.search}"</h1>
      </div>
      <div className={classes.root}>
        <AppBar style={{ borderRadius: '10px' }} position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label={`Tất Cả`} {...a11yProps(0)} />
            <Tab label={`Bài Hát(${songReducer.songs != undefined ? songReducer.songs.length : '0'})`} {...a11yProps(1)} />
            <Tab label={`Album(${albumReducer.albums != undefined ? albumReducer.albums.length : '0'})`} {...a11yProps(2)} />
            <Tab label={`Nghệ Sĩ(${artistReducer.artists != undefined ? artistReducer.artists.length : '0'})`} {...a11yProps(3)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          {renderSongs()}
          {renderAlbum()}
          {renderArtist()}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {renderSongs()}

        </TabPanel>
        <TabPanel value={value} index={2}>
          {renderAlbum()}
        </TabPanel>
        <TabPanel value={value} index={3}>
          {renderArtist()}
        </TabPanel>
      </div>
    </div>
  );
}