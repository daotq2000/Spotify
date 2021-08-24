import React, { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchIcon from '../../resource/images/svg/search.svg'
import {search} from '../../redux/searchReducer'
import history from '../../router/history'
import { Link } from 'react-router-dom';
const Header = () => {
  const dispatch = useDispatch();
  const [research,setResearch] = useState('');
  const handleChangeSearch = (e) =>{
    setResearch(e.target.value)
    
  }
  const onSearch = () =>{
      dispatch(search(research))
      history.push(`/search`)
  }
  return (
    <div className="ms_header">
      <div className="ms_top_left">
        <div className="ms_top_search">
          <input type="text" className="form-control" onChange={handleChangeSearch}  placeholder="Tìm kiếm bài hát" />
          <span  onClick={onSearch} className="search_icon">
            <img src={SearchIcon} alt="" />
          </span>
        </div>
        <div style={{ fontSize: '13rem' }} className="ms_top_trend">
          <span><a href="_blank" className="ms_color">Trending Songs :</a></span> <span className="top_marquee"><a href="_blank">Chúng ta của hiện tại, bức tranh từ nước mắt</a></span>
        </div>
      </div>
      <div className="ms_top_right">
       
        <div className="ms_top_btn">
          <Link to={`/register`} style={{color:'white',fontSize:'small',fontWeight:'bold'}} className="ms_btn reg_btn" data-toggle="modal" ><span>Đăng ký</span></Link>
          <Link to={`/login`} style={{color:'white',fontSize:'small',fontWeight:'bold'}} className="ms_btn login_btn" data-toggle="modal"><span>Đăng nhập</span></Link>
        </div>
      </div>
    </div>

  );
}
export default Header;;