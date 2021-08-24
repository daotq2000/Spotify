import React, { useRef, useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import Image1 from '../../resource/images//album/album1.jpg';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useDispatch, useSelector } from 'react-redux'
import { paginationArtist } from '../../redux/artistReducer'
import { paginationSongs } from '../../redux/songReducer'
import { paginationGenres } from '../../redux/genresReducer'
import { createNewAlbum } from '../../redux/albumReducer'
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router';
import { getAlbumById } from '../../redux/albumReducer'
import { isObject } from '../../utils/UtilsFunction'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    textField: {
        fontSize: 'initial',
        width: '100%'
    },
    modal: {
        fontSize: "small"
    }
}));

const AlbumForm = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [paginationArtistRequest, setPaginationArtistRequest] = useState({
        page: 1,
        size: 5,
        field: "",
        order: "",
        search: ""
    })

    const [artists, setArtists] = useState([])
    const [songs, setSongs] = useState([])
    const [artistAlbums, setArtistsAlbums] = useState([]);
    const [albumSongs, setAlbumSongs] = useState([]);
    const [genresAlbum, setGenresAlbum] = useState(null);
    const [genreses, setGenreses] = useState([]);
    const [searchArtist, setSearchArtist] = useState('');
    const [searchSong, setSearchSong] = useState('')
    const [searchGenres, setSearchGenres] = useState('')
    const [date, setDate] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [file, setFile] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const [reset, setReset] = useState(false);
    const [errorFileText,setErrorFileText] = useState('')
    useEffect(() => {
        dispatch(paginationArtist(paginationArtistRequest))
    }, [dispatch, searchArtist]);
    useEffect(() => {
        let paginationRequest = new Object();
        paginationRequest.page = paginationArtistRequest.page;
        paginationRequest.size = paginationArtistRequest.size;
        paginationRequest.field = paginationArtistRequest.field;
        paginationRequest.search = searchSong;
        paginationRequest.order = paginationArtistRequest.order;
        dispatch(paginationSongs(paginationRequest))
    }, [dispatch, searchSong])
    const [errors, setErrors] = useState(undefined);
    const artistReducer = useSelector((states) => {
        return states.artistReducer;
    });
    const songReducer = useSelector((items) => {
        return items.songReducer;
    })

    useEffect(() => {
        setArtists(artistReducer.artists)
    }, [artistReducer])
    useEffect(() => {
        setSongs(songReducer.songs);
    }, [songReducer])
    const handleChangeTextFieldArtist = e => {
        let name = e.target.name;
        let value = e.target.value;
        if (name == 'txtAlbumArtist') {
            setSearchArtist(value);
            setPaginationArtistRequest({...paginationArtistRequest,search:value});
        }
    }
    const handleChangeInput = (e) => {
        if (e.target.files != undefined || e.target.files != null) {
            setFile(e.target.files[0])
        } else {
            setAlbumName(e.target.value);
        }
    }

    useEffect(() => {
        let paginationRequest = new Object();
        paginationRequest.page = paginationArtistRequest.page;
        paginationRequest.size = paginationArtistRequest.size;
        paginationRequest.field = paginationArtistRequest.field;
        paginationRequest.search = searchGenres;
        paginationRequest.order = paginationArtistRequest.order;
        dispatch(paginationGenres(paginationRequest))
    }, [dispatch, searchGenres]);
    const genresReducer = useSelector((states) => {
        return states.genresReducer;
    });
    useEffect(() => {
        setGenreses(genresReducer.genres)
    }, [genresReducer])
    const onSubmit = () => {
        if (albumName.length <= 0 || artistAlbums.length <= 0 || albumSongs.length <= 0 || genresAlbum == null) {
            setIsValid(false);
        }
        let albumTimeLength = calculateTimeLengthAlbum(albumSongs)
        const data = { albumName: albumName, albumSongs: albumSongs, artistAlbums: artistAlbums, genres: genresAlbum, albumTimeLength: albumTimeLength, file: file }
        if (props.id == null && checkedData(data)) {
            dispatch(createNewAlbum(data))
        } else if (props.id != null && checkedData(data)) {
            if (!isNaN(props.id)) {
                data.id = parseInt(props.id);
            }
            data.image = file;
            if (albumReducer.album != undefined) {
                data.releaseDate = (albumReducer.album.releaseDate);
            }
            dispatch(createNewAlbum(data));
        }
        setReset(!reset)

    }
    const checkedData = (data) => {
        let isValid = true;
        if (data != undefined) {
          
            if (albumSongs.length <= 0) {
                setIsValid(false);
                setErrors({ ...errors, txtSongArtist: true })
                isValid = false;
            }
            if (genresAlbum == null) {
                setIsValid(false);
                setErrors({ ...errors, txtGenres: true })
                isValid = false;
            }
            if (artistAlbums.length <= 0) {
                setErrors({ ...errors, txtAlbumArtist: true });
                setIsValid(false);
                isValid = false;
            }
            if (albumName.length <= 0) {
                setErrors({ ...errors, txtAlbumName: true });
                setIsValid(false);
                isValid = false;
            }
            if(props.id == null && file == null){
                setErrorFileText('Chọn ảnh')
            }else if(props.id == null && file == null){
                setErrorFileText('')
            }
        }
        return isValid;
    }
    const calculateTimeLengthAlbum = (arr) => {
        let totalTime = 0;
        if (arr != null || arr != undefined) {
            arr.forEach((e) => {
                totalTime += parseFloat(e.timePlay)
            })
        }
        return totalTime;
    }
    const albumReducer = useSelector((states) => {
        return states.albumReducer;
    });
    useEffect(() => {
        if (props.id != undefined || props.id != null) {
            dispatch(getAlbumById(props.id));
        }
    }, [props.id])
    useEffect(() => {
        let album = albumReducer.album;
        if (album != null) {
            setFile(album.image)
            setAlbumName(album.albumName)
            setAlbumSongs(album.albumSongs)
            if (album.albumSongs != undefined || album.albumSongs != null) {
                setArtistsAlbums(parseData(album.artistAlbums))
            }
            setGenresAlbum(album.genres)
        }
    }, [albumReducer.album])
    const { enqueueSnackbar } = useSnackbar();

    const OnBlurErrors = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name == 'txtAlbumName') {
            if (value.trim().length <= 0) {
                setErrors({ ...errors, txtAlbumName: true });
                setIsValid(false);
            } else {
                setErrors({ ...errors, txtAlbumName: false })
                setIsValid(true);
            }
        } else if (name == 'txtAlbumArtist') {
            if (artistAlbums != undefined || artistAlbums != null) {
                if (artistAlbums.length <= 0) {
                    setErrors({ ...errors, txtAlbumArtist: true });
                    setIsValid(false);
                }else {
                    setErrors({ ...errors, txtAlbumArtist: false })
                    setIsValid(true);
                }
            } 
        } else if (name == 'txtSongArtist') {
            if (albumSongs.length <= 0) {
                setIsValid(false);
                setErrors({ ...errors, txtSongArtist: true })
            } else {
                setErrors({ ...errors, txtSongArtist: false })
                setIsValid(true);
            }
        } else if (name == 'txtGenres') {
            if (genresAlbum == null) {
                setIsValid(false);
                setErrors({ ...errors, txtGenres: true })
            } else {
                setErrors({ ...errors, txtGenres: false })
                setIsValid(true);
            }
        }

    }
    const parseData = (arr) => {
        let rs = [];
        if (arr != null || arr != undefined) {
            arr.forEach((e) => {
                if (e.artists != null) {
                    rs.push(e.artists);
                }
            })
        }
        return rs;
    }
    const showPopupBar = (flag) => {
        let variant = '';
        if (flag != undefined) {
            if (flag) {
                variant = 'success';
                enqueueSnackbar('Lưu thành công', { variant });
            } else {
                variant = '';
                enqueueSnackbar('Lưu thất bại. Có lỗi xảy ra vui lòng thử lại', { variant });
            }
        }
    }
    const parseImage = () => {
        if (file != undefined || file != null) {
            if (file.name != undefined) {
                return URL.createObjectURL(file);
            } else {
                return file;
            }
        }

    }
    useEffect(() => {
        showPopupBar(albumReducer.isSuccess);
    }, [albumReducer.isSuccess, reset])
    const handleChangeSearchValue = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        if(name == 'txtSongArtist'){
            setSearchSong(value);
        }
        if(name == 'txtGenres'){
            setSearchGenres(value);
        }
    }
    return (
        <div className={classes.root}>
            <Grid style={{ marginTop: '15px' }} container>
                <Grid style={{ margin: 'auto', marginBottom: '20px' }} item={24}>
                    <h1 style={{ fontSize: 'large' }}>{props.title}</h1>
                </Grid>
            </Grid>
            <Paper style={{ width: '90%', margin: 'auto' }} elevation={3} >
                <div style={file != null ? { display: '', width: '90%', margin: '20px auto' } : { display: 'none' }} className="col-lg-2 col-md-6">
                    <div className="ms_rcnt_box marger_bottom30">
                        <div className="ms_rcnt_box_img">
                            <img src={parseImage()} alt="" className="img-fluid" />
                            <div className="ms_main_overlay">
                                <div className="ms_box_overlay" />
                            </div>
                        </div>
                    </div>
                </div>
                <Grid container spacing={0}>
                    <div className="ms_pro_form">

                        <div className="form-group">
                            <TextField value={albumName} name="txtAlbumName" onBlur={OnBlurErrors} helperText="Không được để trống" error={errors != undefined ? errors.txtAlbumName : false} onChange={handleChangeInput} className="form-control" label="Tên Album" variant="outlined" />
                        </div>

                        <div className="form-group">
                            <Autocomplete
                                onChange={(event, value) => {
                                    setArtistsAlbums(value)
                                    setSearchArtist("")
                                }}
                                multiple
                                limitTags={1}
                                classes={{
                                    paper: classes.modal
                                }}
                                value={artistAlbums}
                                id="artists"
                                options={artists}
                                getOptionLabel={(option) => option.fullName}

                                // defaultValue={}
                                renderInput={(params) => (
                                    <TextField helperText="Không được để trống" error={errors != undefined ? errors.txtAlbumArtist : false} onBlur={OnBlurErrors} name="txtAlbumArtist" {...params} onChange={handleChangeTextFieldArtist} variant="outlined" label="Nghệ sĩ" placeholder="Nghệ sĩ" />
                                )}
                            />

                        </div>
                        <div className="form-group">
                            <Autocomplete
                                value={genresAlbum}
                                onChange={(event, value) => {setGenresAlbum(value)
                                                            setSearchGenres("")}}
                                classes={{
                                    paper: classes.modal
                                }}
                                id="genres"
                                options={genreses != undefined ? genreses : []}
                                getOptionLabel={(option) => option.genresName}
                                renderInput={(params) => (
                                    <TextField onChange={handleChangeSearchValue} name="txtGenres" helperText="Không được để trống" error={errors != undefined ? errors.txtGenres : false} {...params} onBlur={OnBlurErrors} variant="outlined" label="Thể loại" placeholder="Thể loại" />
                                )}
                            />
                        </div>
                        <div className="form-group">
                            <Autocomplete
                                limitTags={1}
                                onChange={(event, value) =>{ setAlbumSongs(value)
                                                            setSearchSong("")}}
                                multiple
                                classes={{
                                    paper: classes.modal
                                }}
                                id="songs"
                                options={songs != undefined ? songs : []}
                                getOptionLabel={(option) => option.title}
                                value={albumSongs}
                                renderInput={(params) => (
                                    <TextField error={errors != undefined ? errors.txtSongArtist : false} {...params} helperText="Không được để trống" name="txtSongArtist" onBlur={OnBlurErrors} variant="outlined" onChange={handleChangeSearchValue} label="Bài hát" placeholder="Bài hát" />
                                )}
                            />

                        </div>
                        <div className="form-group">

                            <input
                                color="primary"
                                accept="image/*"
                                type="file"
                                onChange={handleChangeInput}
                                id="icon-button-file"
                                style={{ display: 'none', }}
                                helperText="Vui lòng chọn ảnh"
                            />
                            <label style={{ width: '99%' }} htmlFor="icon-button-file">
                                <Button style={{ width: '100%' }}
                                    variant="contained"
                                    component="span"
                                    size="large"
                                    color="primary"
                                >
                                    <CloudUploadIcon />
                                </Button>
                            </label>
                            <label style={isObject(file) ? { display: '' } : { display: 'none' }, { color: 'green' }}>{isObject(file) ? `Choose file: ${file.name}` : ''}</label>
                            <label style={{color:'red'}}>{errorFileText}</label>
                        
                        </div>
                        <div style={{marginBottom:'20px'}} className="pro-form-btn text-center marger_top15">
                            <Button onClick={() => onSubmit()} style={{ fontSize: 'small' }} variant="contained" color="primary">
                                Lưu Album
                            </Button>
                            <Button style={{ fontSize: 'small', marginLeft: '20px' }} variant="contained" color="secondary">
                                Clear
                            </Button>
                        </div>

                    </div>
                </Grid>
            </Paper>

        </div>

    );
}
export default AlbumForm;