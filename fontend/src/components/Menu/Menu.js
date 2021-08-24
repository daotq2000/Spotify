import React,{useEffect} from 'react';
import Logo from '../../resource/images/logo.png';
import OpenLogo from '../../resource/images/open_logo.png';
import {Link} from 'react-router-dom';
import $ from 'jquery'
const Menu = () =>{
    useEffect(() => {
       $('.menubar').on('click',function(e){
         let arr = $('.menubar');
         if(arr.length > 1){
           arr.each((e)=>{
            $(e).removeClass('active');
           })
         }
         $(e).addClass('active');
       })
    }, [])
    return (
        <div className="ms_sidemenu_wrapper">
        <div className="ms_nav_close">
          <i className="fa fa-angle-right" aria-hidden="true" />
        </div>
        <div className="ms_sidemenu_inner">
          <div className="ms_logo_inner">
            <div className="ms_logo">
              <Link to={`/`}><img src={Logo} alt="" className="img-fluid" /></Link>
            </div>
            <div className="ms_logo_open">
              <Link to={`/`}><img src={Logo} alt="" className="img-fluid" /></Link>
              <br/>
              <span style={{color:'white',fontWeight:'bold'}}>Music for you</span>
            </div>
          </div>
          <div className="ms_nav_wrapper mCustomScrollbar _mCS_1 mCS-autoHide" style={{overflow: 'visible'}}><div id="mCSB_1" className="mCustomScrollBox mCS-minimal mCSB_vertical mCSB_outside" style={{maxHeight: 'none'}} tabIndex={0}><div id="mCSB_1_container" className="mCSB_container" style={{position: 'relative', top: 0, left: 0}} dir="ltr">
                <ul>
                  <li><Link to={`/`} className="menubar" title="Discover">
                      <span className="nav_icon">
                        <span className="icon icon_discover" />
                      </span>
                      <span className="nav_text">
                        Trang chủ
                      </span>
                    </Link>
                  </li>
                  <li><Link to={`albums`} className="menubar" title="Albums">
                      <span className="nav_icon">
                        <span className="icon icon_albums" />
                      </span>
                      <span className="nav_text">
                        albums
                      </span>
                    </Link>
                  </li>
                  <li><Link to={`artist`} className="menubar" title="Artists">
                      <span className="nav_icon">
                        <span className="icon icon_artists" />
                      </span>
                      <span className="nav_text">
                        Nghệ sĩ
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/genres`} className="menubar" title="Genres">
                      <span className="nav_icon">
                        <span className="icon icon_genres" />
                      </span>
                      <span className="nav_text">
                        Thể loại
                      </span>
                    </Link>
                  </li>
                  <li><Link to={`chart`} className="menubar" title="Top Tracks">
                      <span className="nav_icon">
                        <span className="icon icon_tracks" />
                      </span>
                      <span className="nav_text">
                        Bảng xếp hạng
                      </span>
                    </Link>
                  </li>
                 
                </ul>
                {/* <ul className="nav_downloads">
                  <li><a href="download.html" title="Downloads">
                      <span className="nav_icon">
                        <span className="icon icon_download" />
                      </span>
                      <span className="nav_text">
                        downloads
                      </span>
                    </a>
                  </li>
                  <li><a href="purchase.html" title="Purchased">
                      <span className="nav_icon">
                        <span className="icon icon_purchased" />
                      </span>
                      <span className="nav_text">
                        purchased
                      </span>
                    </a>
                  </li>
                  <li><a href="favourite.html" title="Favourites">
                      <span className="nav_icon">
                        <span className="icon icon_favourite" />
                      </span>
                      <span className="nav_text">
                        favourites
                      </span>
                    </a>
                  </li>
                  <li><a href="history.html" title="History">
                      <span className="nav_icon">
                        <span className="icon icon_history" />
                      </span>
                      <span className="nav_text">
                        history
                      </span>
                    </a>
                  </li>
                </ul>
                <ul className="nav_playlist">
                  <li><a href="feature_playlist.html" title="Featured Playlist">
                      <span className="nav_icon">
                        <span className="icon icon_fe_playlist" />
                      </span>
                      <span className="nav_text">
                        featured playlist
                      </span>
                    </a>
                  </li>
                  <li><a href="add_playlist.html" title="Create Playlist">
                      <span className="nav_icon">
                        <span className="icon icon_c_playlist" />
                      </span>
                      <span className="nav_text">
                        create playlist
                      </span>
                    </a>
                  </li>
                </ul> */}
              </div></div><div id="mCSB_1_scrollbar_vertical" className="mCSB_scrollTools mCSB_1_scrollbar mCS-minimal mCSB_scrollTools_vertical" style={{display: 'block'}}><div className="mCSB_draggerContainer"><div id="mCSB_1_dragger_vertical" className="mCSB_dragger" style={{position: 'absolute', minHeight: '50px', display: 'block', height: '0px', maxHeight: '389px', top: '0px'}}><div className="mCSB_dragger_bar" style={{lineHeight: '50px'}} /></div><div className="mCSB_draggerRail" /></div></div></div>
        </div>
      </div>
    );
}
export default Menu;