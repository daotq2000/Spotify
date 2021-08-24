import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from '@material-ui/core';
import Image1 from '../../resource/images//album/album1.jpg';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useDispatch, useSelector } from 'react-redux'
import { paginationArtist,saveArtist,getArtistById } from '../../redux/artistReducer'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { isObject, isString } from '../../utils/UtilsFunction'
import { useSnackbar } from 'notistack';
const country = ['Việt Nam','Hàn Quốc','UK','Ấn Độ','Nhật bản']
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

const ArtistForm = (props) => {
    const id = props.id;
    const gender = [[{ label: 'Nam', value: true }, { label: 'Nữ', value: false }]];
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [reset,setReset] = useState(false);
    const [error,setError] = useState({
        txtFullName: false,
        txtGender: false,
        txtBirthday: false,
        txtCountryActive: false,
        image: false,
        txtDescription:false
    });
    const [form, setForm] = useState({
        txtFullName: '',
        txtGender: null,
        txtBirthday: null,
        txtCountryActive: '',
        image: null,
        txtDescription:''
    })
    const handleChangeInput = (e) => {
        let name = e.target.name;

        let value = e.target.value;

        if (name == 'txtFullName') {
            setForm({ ...form, txtFullName: value })
        }
        if (name == 'txtGender') {
            setForm({ ...form, txtGender: value })
        }
        if (name == 'txtBirthday') {
            setForm({ ...form, txtBirthday: value })
        }
        if (name == 'txtCountryActive') {
            setForm({ ...form, txtCountryActive: value })
        }
        if(name=='image'){
            setForm({ ...form, image:e.target.files[0]})
        }
        if(name == 'txtDescription'){
            setForm({...form,txtDescription:value})
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
    const artistReducer = useSelector((states) => {
        return states.artistReducer;
    });
    const onSubmitForm = data =>{
        if(checkData()){
            if(id != null){
                data.id = parseInt(id);
            }
            dispatch(saveArtist(data))
            setReset(!reset);
        }else{
        }
    }
    const checkData = () =>{
        let isValid = true;
        let txtFullName = false,txtBirthday = false,txtCountryActive= false,image = false,txtGender= false;
        if(form.txtFullName.trim().length == 0){
            txtFullName= true;
            isValid = false;
        }
        if(form.txtBirthday == null){
            txtBirthday = true;
            isValid = false;
        }
        if(form.txtCountryActive.trim().length == 0){
            txtCountryActive= true;
            isValid = false;
        }
        if(form.image == null){
            image = true;
            isValid = false;
        }
        if(form.txtGender == null){
            txtGender= true;
            isValid = false;
        }
        setError({...error,txtBirthday:txtBirthday,txtCountryActive:txtCountryActive,txtFullName:txtFullName,txtGender:txtGender,image:image})
        return isValid;
    }
    const showPopupBar = (flag) => {
        let variant = '';
        if (flag != undefined) {
            if (flag) {
                variant = 'success';
                enqueueSnackbar('Lưu nghệ sĩ thành công', { variant });
            } else {
                variant = '';
                enqueueSnackbar('Lưu thất bại. Có lỗi xảy ra vui lòng thử lại', { variant });
            }
        }
    }
    useEffect(() => {
        showPopupBar(artistReducer.isSuccess)
    }, [artistReducer.isSuccess,reset])
    useEffect(() => {
        if(id != null){
            dispatch(getArtistById(id))
        }
    }, [id])
    useEffect(()=>{
        let current = artistReducer.currentArtist;
        if(current != undefined){
            
            setForm({...form,image:current.image,txtBirthday:current.birthDay,txtCountryActive:current.countryActive,
                    txtFullName:current.fullName,txtDescription:current.description,txtGender:current.gender})
                   
        }
    },[artistReducer.currentArtist])
   
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
             
                <Grid container spacing={0}>
                    <div className="ms_pro_form">
                        <div className="form-group">
                            <TextField value={form.txtFullName} error={error != null?error.txtFullName:false} name="txtFullName" onChange={handleChangeInput} helperText="Không được để trống" className="form-control" label="Tên Nghệ sĩ" variant="outlined" />

                        </div>
                        <div className="form-group">
                            <Autocomplete
                                value={form.txtGender}
                                onChange={(e, value) => setForm({ ...form, txtGender: value })}
                                limitTags={1}
                                classes={{
                                    paper: classes.modal
                                }}
                                options={[true,false]}
                                getOptionLabel={(option) => (option?'Nữ':'Nam')}
                                renderInput={(params) => (
                                    <TextField error={error != null?error.txtGender:false} onChange={handleChangeInput} helperText="Không được bỏ trống" name="txtGender" {...params} variant="outlined" label="Giới tính" placeholder="Giới tính" />
                                )}
                            />

                        </div>
                        <div className="form-group">
                            <label htmlFor="birthDay">Sinh nhật</label>
                            <input value={form.txtBirthday} id="birthDay" placeholder="Hãy chọn ngày sinh"  onChange={handleChangeInput} name="txtBirthday" style={{ width: '100%', height: '52px', borderRadius: '5px', border: '1px solid #c4c4c4', outline: '#007bff' }} type="date" />
                            <span style={error.txtBirthday?{display:''}:{display:'none'}} className="error-form">Không được để trống</span>  
                        
                        </div>
                        <div className="form-group">
                            <label htmlFor="countryActive">Quốc gia hoạt động</label>
                            <select value={form.txtCountryActive}  onChange={handleChangeInput} name="txtCountryActive" id="countryActive" style={{ width: '100%', height: '52px', borderRadius: '5px', border: '1px solid #c4c4c4', outline: '#007bff' }}>
                                 {country.map((e,i)=>{
                                     return (
                                         <option key={e}>{e}</option>
                                     );
                                 })}
                            </select>
                            <span style={error.txtCountryActive?{display:''}:{display:'none'}} className="error-form">Không được để trống</span>  

                        </div>
                        <div style={{ width: '88%' }} className="form-group">
                            <label>Mô tả</label>
                            <textarea value={form.txtDescription} onChange={handleChangeInput} name="txtDescription" rows="4" style={{ width: "100%", outlineColor: '#3f51b5',fontSize:'small' }} className="form" />
                        </div>
                        <div className="form-group">
                            <Paper>
                                <Grid container>
                                    <Grid style={{ margin: 'auto', marginTop: '5px' }} item={2}>
                                        <input
                                            color="primary"
                                            accept="image/*"
                                            type="file"
                                            id="image"
                                            name="image"
                                            style={{ display: 'none', }}
                                            onChange={handleChangeInput}
                                        />
                                        <label htmlFor="image">
                                            <PhotoLibraryIcon style={{ width: "35px", height: "35px" }} fontSize="default" color="primary" />
                                        </label>
                                    </Grid>
                                </Grid>

                            </Paper>
                            <span style={error.image?{display:''}:{display:'none'}} className="error-form">Hãy chọn ảnh</span>  
                            {/* <span style={error.mp3File ? { display: '', textAlign: 'center' } : { display: 'none' }} className="error-form">Hãy chọn File nhạc</span> */}

                        </div>
                        <div style={{ marginBottom: '20px' }} className="pro-form-btn text-center marger_top15">
                            <Button onClick={()=>onSubmitForm(form)} type="submit" style={{ fontSize: 'small' }} variant="contained" color="primary">
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
export default ArtistForm;