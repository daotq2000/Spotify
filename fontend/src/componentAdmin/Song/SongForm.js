import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import Image1 from '../../resource/images//album/album1.jpg';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useDispatch, useSelector } from 'react-redux'
import { paginationArtist } from '../../redux/artistReducer'
import { saveSong, getSongById } from '../../redux/songReducer'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { useSnackbar } from 'notistack';
import { paginationGenres } from '../../redux/genresReducer'
import { isObject, isString } from '../../utils/UtilsFunction'
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

const SongForm = (props) => {
    const id = props.id;
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [timePlay, setTimePlay] = useState('');
    const [audio, setAudio] = useState(null)
    const [genresAlbum, setGenresAlbum] = useState(null);
    const [reset,setReset] = useState(false);
    const [searchArtist,setSearchArtist] = useState('');
    const [searchGenres, setSearchGenres] = useState('')
    const [form, setForm] = useState({
        txtTitle: '',
        txtArtist: [],
        txtLyrics: '',
        image: null,
        mp3File: null
    })
    const [paginationArtistRequest, setPaginationArtistRequest] = useState({
        page: 1,
        size: 6,
        field: "",
        order: "",
        search:searchArtist
    })
    const [error, setError] = useState({
        txtTitle: false,
        txtArtist: false,
        txtLyrics: false,
        image: false,
        mp3File: false
    })
    useEffect(() => {
        dispatch(paginationArtist(paginationArtistRequest))
    }, [dispatch,searchArtist]);
    useEffect(() => {
        let paginationRequest = new Object();
        paginationRequest.page = paginationArtistRequest.page;
        paginationRequest.size = paginationArtistRequest.size;
        paginationRequest.field = paginationArtistRequest.field;
        paginationRequest.search = searchGenres;
        paginationRequest.order = paginationArtistRequest.order;
        dispatch(paginationGenres(paginationRequest))

    }, [dispatch, searchGenres]);
    const artistReducer = useSelector((states) => {
        return states.artistReducer;
    });
    const songReducer = useSelector((states) => {
        return states.songReducer;
    });
    useEffect(() => {
        setArtists(artistReducer.artists)
    }, [artistReducer])

    const genresReducer = useSelector((states) => {
        return states.genresReducer;
    });
    useEffect(() => {
        setGenres(genresReducer.genres)
    }, [genresReducer])
    const handleChangeInput = e => {
        let name = e.target.name;
        let value = e.target.value;
        let file;
        if (name == 'txtTitle') {
            setForm({ ...form, txtTitle: value })
        }
        if (name == 'txtLyrics') {
            setForm({ ...form, txtLyrics: value })
        }

        if (name == "mp3File") {

            file = e.target.files;
            if (file != undefined && name == 'mp3File') {
                calculateAudioDuration(e.target.files[0])
                setForm({ ...form, mp3File: e.target.files[0] })
            }
        }
        if (name == "image") {
            file = e.target.files;
            if (file != undefined && name == 'image') {
                setForm({ ...form, image: e.target.files[0] })
            }
        }

    }
    const parseImage = () => {
        if (form != null) {
            if (form.image != null && isObject(form.image)) {
                return URL.createObjectURL(form.image);
            } else if (isString(form.image)) {
                return form.image;
            }
        }
        return '';
    }
    const checkData = () => {
        let isValid = true;
        let txtTitle, txtArtist, image, mp3File;
        if (form.txtTitle.trim().length == 0) {
            txtTitle = true;
            isValid = false;
        } else {
            txtTitle = false;
        }
        if (form.mp3File == null) {
            mp3File = true;
            isValid = false;
        } else {
            mp3File = false;
        }
        if (form.image == null) {
            image = true;
            isValid = false;
        } else {
            image = false;
        }

        if (form.txtArtist.length == 0) {
            txtArtist = true;
            isValid = false;
        } else {
            txtArtist = false;
        }
        setError({ ...error, mp3File: mp3File, image: image, txtArtist: txtArtist, txtTitle: txtTitle })
        return isValid;
    }
    const onSubmit = data => {
        if (checkData()) {
            data.timePlay = audio.duration
            data.genres = genresAlbum;
            if(!isNaN(id)){
                data.id = id;
            }
            dispatch(saveSong(data))
            setReset(!reset)
        } else {
        }
    };

    const calculateAudioDuration = (audio) => {
        if (audio != undefined) {
            let blod = URL.createObjectURL(audio)
            let audioFile = new Audio(blod);
            setAudio(audioFile)
        }
    }
    const showPopupBar = (flag) => {
        let variant = '';
        if (flag != undefined) {
            if (flag) {
                variant = 'success';
                enqueueSnackbar('Lưu bài hát thành công', { variant });
            } else {
                variant = '';
                enqueueSnackbar('Lưu thất bại. Có lỗi xảy ra vui lòng thử lại', { variant });
            }
        }
    }
    useEffect(() => {
        showPopupBar(songReducer.isSuccess)
    }, [songReducer.isSuccess,reset])
    const renderAudio = (audio) => {
        if (isString(audio) && audio != undefined) {
            return (
                <audio controls>
                    <source src={audio} type="audio/ogg" />
                    Your browser does not support the audio element.
                </audio>
            );
        }else if(isObject(audio)){
            return (
                <audio controls>
                    <source src={audio != null ? (audio.src) : ''} type="audio/ogg" />
                    Your browser does not support the audio element.
                </audio>
            );
        }
        return (<></>);
    }
    useEffect(() => {
        if (id != null) {
            dispatch(getSongById(id));
        }
    }, [id])
    useEffect(() => {
        let songCurrent = songReducer.currentSong;
        if (songCurrent != undefined) {
            setForm({
                ...form, txtArtist: transferDataArtist(songCurrent.artistSongs),
                txtTitle: songCurrent.title, timePlay: songCurrent.timePlay,
                image: songCurrent.image, mp3File: songCurrent.mediaUrl,
                txtLyrics:songCurrent.lyrics
            })
            setAudio(songCurrent.mediaUrl)
            setGenresAlbum(songCurrent.genres)
        }
    }, [songReducer.currentSong])
    const transferDataArtist = (artistSongs) => {
        let result = [];
        if (artistSongs != undefined || artistSongs != null) {
            artistSongs.forEach((value) => {
                if (value.artists != undefined) {
                    let obj = value.artists;
                    result.push(obj);
                }
            })
        }
        return result;
    }
    const handleChangeSearchValue = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        if(name == 'txtAlbumArtist'){
            setSearchArtist(value);
            setPaginationArtistRequest({...paginationArtistRequest,search:value})
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
                <div style={form.image == null ? { display: 'none' } : { display: '', width: '90%', margin: '20px auto' }} className="col-lg-2 col-md-6">
                    <Paper>
                        <div className="ms_rcnt_box marger_bottom30">
                            <div className="ms_rcnt_box_img">
                                <img src={parseImage()} alt="" className="img-fluid" />
                                <div className="ms_main_overlay">
                                    <div className="ms_box_overlay" />
                                </div>
                            </div>
                        </div>
                    </Paper>


                </div>
                <div style={form.mp3File == null ? { display: 'none' } : { display: '', alignItems: 'center', display: 'flex', justifyContent: 'center', marginTop: '15px' }} className="col-lg-12 col-md-6">
                    <div className="content">
                        <label style={isObject(form.mp3File) ? { fontSize: 'small', display: 'inline' } : { display: 'none' }}>Mp3 File: {isObject(form.mp3File) ? form.mp3File.name : form.mp3File}</label>
                        <br />
                        {renderAudio(audio)}
                    </div>
                </div>
                <Grid container spacing={0}>
                    <div className="ms_pro_form">
                        <div style={{ width: '88%', marginTop: '10px' }} className="form-group">
                            <TextField value={form.txtTitle} onChange={handleChangeInput} name="txtTitle" error={error.txtTitle} helperText="Không được để trống" className="form-control" label="Tên bài hát" variant="outlined" />

                        </div>
                        <div style={{ width: '88%' }} className="form-group">
                            <label>Lyrics</label>
                            <textarea value={form.txtLyrics} onChange={handleChangeInput} name="txtLyrics" rows="4" style={{ width: "100%", outlineColor: '#3f51b5',fontSize:'small' }} className="form" />
                            <span className="error-form">{error.txtLyrics}</span>
                        </div>
                        <div className="form-group">
                            <Autocomplete
                                value={form.txtArtist}
                                onChange={(e, value) => setForm({ ...form, txtArtist: value })}
                                multiple
                                limitTags={1}
                                classes={{
                                    paper: classes.modal
                                }}
                                id="txtArtist"
                                options={artists}
                                getOptionLabel={(option) => option.fullName}
                                // defaultValue={}
                                renderInput={(params) => (
                                    <TextField error={error.txtArtist} onChange={handleChangeSearchValue} helperText="Không được bỏ trống" name="txtAlbumArtist" {...params} variant="outlined" label="Nghệ sĩ" placeholder="Nghệ sĩ" />
                                )}
                            />

                        </div>
                        <div className="form-group">
                            <Autocomplete
                                value={genresAlbum}
                                onChange={(event, value) => setGenresAlbum(value)}
                                classes={{
                                    paper: classes.modal
                                }}
                                id="genres"
                                options={genres}
                                getOptionLabel={(option) => option.genresName}
                                renderInput={(params) => (
                                    <TextField onChange={handleChangeSearchValue} name="txtGenres" helperText="Không được để trống"  {...params} variant="outlined" label="Thể loại" placeholder="Thể loại" />
                                )}
                            />
                        </div>
                        <div className="form-group">
                            <Paper>
                                <Grid container>
                                    <Grid style={{ margin: 'auto', marginTop: '5px' }} item={12}>
                                        <input
                                            color="primary"
                                            accept="Audio/mpeg"
                                            type="file"
                                            name="mp3File"
                                            id="mp3"
                                            onChange={handleChangeInput}
                                            style={{ display: 'none', }}
                                        />
                                        <label htmlFor="mp3">
                                            <AttachFileIcon style={{ width: "35px", height: "35px" }} fontSize="default" color="primary" />
                                        </label>
                                        <input
                                            color="primary"
                                            accept="image/*"
                                            type="file"
                                            id="image"
                                            name="image"
                                            onChange={handleChangeInput}
                                            style={{ display: 'none', }}
                                        />
                                        <label htmlFor="image">
                                            <PhotoLibraryIcon style={{ width: "35px", height: "35px" }} fontSize="default" color="primary" />
                                        </label>
                                    </Grid>
                                </Grid>

                            </Paper>
                            <span style={error.image ? { display: '', textAlign: 'center' } : { display: 'none' }} className="error-form">Hãy chọn ảnh</span> <br />
                            <span style={error.mp3File ? { display: '', textAlign: 'center' } : { display: 'none' }} className="error-form">Hãy chọn File nhạc</span>

                        </div>
                        <div style={{ marginBottom: '20px' }} className="pro-form-btn text-center marger_top15">
                            <Button onClick={() => onSubmit(form)} type="submit" style={{ fontSize: 'small' }} variant="contained" color="primary">
                                Lưu bài hát
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
export default SongForm;