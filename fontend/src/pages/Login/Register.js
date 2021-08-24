import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import RegisterImage from '../../resource/images/register_img.png'
import history from '../../router/history';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import {saveUser} from '../../redux/userReducer'
const Register = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [form, setForm] = useState({
        lastName: '',
        username: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState({ 
        txtUsername: false, txtPassword: false,txtName:false,txtConfirmPassword:false
    });
    const [isMatch, setIsMatch] = useState(true);
    const onSubmit = () => {
        let validate = validateData(form)
        let config = null;
        let anchorOrigin = { horizontal: 'center', vertical: 'bottom' }
        if (validate) {
           
            let data = handleData(form);
            dispatch(saveUser({user:data}))

        }
    }
    const handleData = (data) =>{
        let result = {username:data.username,password:data.password};
        let arr = data.lastName.split(" ");
        if(arr.length > 0){
            result.firstName = arr[0];
            let lastName = ''
            for (let i = 1; i < arr.length; i++) {
                lastName+= arr[i]+' ';
            }
            result.lastName = lastName.trim();
        }
        return result;
    }
    const handleChangeValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name == 'username') {
            setForm({ ...form, username: value })
        }
        if (name == 'password') {
            setForm({ ...form, password: value })
        }
        if (name == 'lastName') {
            setForm({ ...form, lastName: value })
        }
        if (name == 'confirmPassword') {
            const rootPassword = document.getElementsByName('password')[0];
            if(rootPassword.value != value){
                setIsMatch(false);
            }else{
                setIsMatch(true);
            }
            setForm({ ...form, confirmPassword: value })
        }
    }
    const validateData = (data) => {
        let isValid = true;
        let txtUsername, txtPassword, txtName, txtConfirmPassword;
        if (data.lastName.trim().length == 0) {
            txtName = true;
            isValid = false;
        } else {
            txtName = false;
        }
        if (data.username.trim().length == 0) {
            txtUsername = true;
            isValid = false;
        } else {
            txtUsername = false;
        }
        if (data.password.trim().length == 0) {
            isValid = false;
            txtPassword = true;
        } else {
            txtPassword = false;
        }
        if (data.confirmPassword.trim().length == 0) {
            isValid = false;
            txtConfirmPassword = true;
        } else {
            txtConfirmPassword = false;
        }
        setError({ ...error, txtUsername: txtUsername, txtPassword: txtPassword,txtName:txtName,txtConfirmPassword:txtConfirmPassword })
        return isValid;
    }
    const userReducer = useSelector((state)=>{
        return state.userReducer;
    })
    useEffect(()=>{
        let flag = userReducer.isSuccess;
        showPopUp(flag);
    },[userReducer.isSuccess])
    const showPopUp = (flag) =>{
        if(flag != undefined || flag != null){
            let anchorOrigin = { horizontal: 'center', vertical: 'bottom' }
            let config = { variant: 'success', anchorOrigin: anchorOrigin }
            if(flag){
                enqueueSnackbar('Đăng ký thành công. hãy thực hiện đăng nhập', config);
                history.push(`/login`);
            }else{
                enqueueSnackbar(userReducer.message, config);
            }
        }
    }

    return (
        <div className="ms_profile_wrapper">
            <div style={{ width: '100%' }} className="ms_profile_box">

                <div style={{ padding: '10px' }} className="ms_register_img">
                    <img src={RegisterImage} alt="" className="img-fluid" />
                </div>
                <div style={{ padding: '10px' }} className="ms_register_form">
                    <h2>Đăng ký / Đăng Nhập</h2>
                    <div className="form-group">
                        <input onChange={handleChangeValue} name="lastName" type="text" placeholder="Họ và Tên" className="form-control" />
                        <span className="form_icon">
                            <i className="fa_icon form-user" aria-hidden="true" />
                        </span>
                        <span style={error.txtName ? { display: '', color: '#64c8e7' } : { display: 'none' }} className="error-form">
                            Họ và Tên không được để trống
                        </span>
                    </div>
                    <div className="form-group">
                        <input onChange={handleChangeValue} name="username" type="text" placeholder="Tên tài khoản" className="form-control" />
                        <span className="form_icon">
                        <i className="fa_icon form-user" aria-hidden="true" />
                        </span>
                        <span style={error.txtUsername ? { display: '', color: '#64c8e7' } : { display: 'none' }} className="error-form">
                            Tên tài khoản không được để trống
                        </span>
                    </div>
                    <div className="form-group">
                        <input onChange={handleChangeValue} name="password" type="password" placeholder="Mật khẩu" className="form-control" />
                        <span className="form_icon">
                            <i className="fa_icon form-lock" aria-hidden="true" />
                        </span>
                        <span style={error.txtPassword ? { display: '', color: '#64c8e7' } : { display: 'none' }} className="error-form">
                            Mật khẩu không được để trống
                        </span>
                    </div>
                    <div className="form-group">
                        <input onChange={handleChangeValue} name="confirmPassword" type="password" placeholder="Xác nhận mật khẩu" className="form-control" />
                        <span className="form_icon">
                            <i className=" fa_icon form-lock" aria-hidden="true" />
                        </span>
                        <span style={!isMatch ? { display: '', color: '#64c8e7' } : { display: 'none' }} className="error-form">
                            Mật khẩu không khớp
                        </span>
                        <br/>
                        <span style={error.txtConfirmPassword ? { display: '', color: '#64c8e7' } : { display: 'none' }} className="error-form">
                            Xác nhận mật khẩu không được để trống
                        </span>
                    </div>
                    <a href="#" onClick={onSubmit} className="ms_btn">Đăng ký ngay</a>
                    <p>Đã có tài khoản? <Link to={`/login`} data-toggle="modal" className="ms_modal hideCurrentModel">Đăng nhập</Link></p>
                </div>
            </div>
        </div>
    );
}
export default Register;