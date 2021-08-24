import React, { useState, useEffect } from 'react';
import RegisterImage from '../../resource/images/register_img.png'
import axios from 'axios'
import { API_ENDPOINT } from '../../utils/Constaints'
import history from '../../router/history'
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';
const Login = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState({ txtUsername: false, txtPassword: false });
    const onSubmit = () => {
        let validate = validateData(form)
        let config = null;
        let anchorOrigin = { horizontal: 'center' , vertical: 'bottom'}
        if (validate) {
            axios.post(API_ENDPOINT + 'auth', form).then((res) => {
                const token = res.headers.authorization;
                localStorage.setItem('Authorization', token);
                config = {variant: 'success',anchorOrigin:anchorOrigin}
                enqueueSnackbar('Đăng nhập thành công', config);
                history.push(`/admin/album`);
            }).catch((error) => {
                config = {variant: 'error',anchorOrigin:anchorOrigin}
                let errors = error.response;
                if (errors.status == 401) {
                    enqueueSnackbar('Tên tài khoản hoặc mật khẩu không chính xác', config);
                }
            })
        }
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
    }
    const validateData = (data) => {
        let isValid = true;
        let txtUsername, txtPassword;
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
        setError({ ...error, txtUsername: txtUsername, txtPassword: txtPassword })
        return isValid;
    }
    return (
        <>
            <div className="ms_profile_wrapper">
                <div style={{ width: '100%' }} className="ms_profile_box">

                    <div style={{ padding: '10px' }} className="ms_register_img">
                        <img src={RegisterImage} alt="" className="img-fluid" />
                    </div>
                    <div style={{ padding: '10px' }} className="ms_register_form">
                        <h2>Đăng Nhập / Đăng Ký</h2>
                        <div className="form-group">
                            <input name="username" error={error.txtUsername} helperText="Không được để trống" onChange={handleChangeValue} type="text" placeholder="Tài Khoản" className="form-control" />
                            <span className="form_icon">
                                <i className="fa_icon form-envelope" aria-hidden="true" />
                            </span>
                            <br />
                            <span style={error.txtUsername ? { display: '', color: '#64c8e7' } : { display: 'none' }} className="error-form">
                                Tên tài khoản không được để trống
                            </span>
                        </div>
                        <div className="form-group">
                            <input error={error.txtPassword} helperText="Không được để trống" onChange={handleChangeValue} name="password" type="password" placeholder="Mật Khẩu" className="form-control" />
                            <span className="form_icon">
                                <i className="fa_icon form-lock" aria-hidden="true" />
                            </span>
                            <br />
                            <span style={error.txtPassword ? { display: '', color: '#64c8e7' } : { display: 'none' }} className="error-form">
                                Mật khẩu không được để trống
                            </span>
                        </div>
                        <div className="remember_checkbox">
                            <label>Ghi nhớ đăng nhập
                                <input type="checkbox" />
                                <span className="checkmark" />
                            </label>
                        </div>
                        <a onClick={onSubmit} className="ms_btn" target="_blank">Đăng nhập ngay</a>
                        <div className="popup_forgot">
                            <a href="#">Quên mật khẩu ?</a>
                        </div>
                        <p>Chưa có tài khoản? <Link to={`/register`} data-toggle="modal" className="ms_modal1 hideCurrentModel">Đăng ký</Link></p>
                    </div>

                </div>
            </div>
        </>
    );
}
export default Login;
