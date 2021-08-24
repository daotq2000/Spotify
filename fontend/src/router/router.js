import AlbumsList from '../pages/Albums/Albums'
import ArtistList from '../pages/Artists/Artists'
import HomePage from '../components/Home/Home'
import AlbumDetail from '../pages/Albums/AlbumDetail'
import Mp3Chart from '../pages/Mp3Chart/Mp3Chart'
import Dashboad from '../componentAdmin/Dashboard/Dashboard'
import CreateAlbum from '../pageAdmin/Album/CreateAlbum'
import UpdateAlbum from '../pageAdmin/Album/UpdateAlbum'
import ListAlbum from '../pageAdmin/Album/AlbumList'
import SongList from '../pageAdmin/Song/ListSong'
import CreateSong from '../pageAdmin/Song/CreateSong'
import UpdateSong from '../pageAdmin/Song/UpdateSong'
import ArtistsPage from '../pageAdmin/Artist/ArtistList'
import CreateArtist from '../pageAdmin/Artist/CreateArtist'
import UpdateArtist from '../pageAdmin/Artist/UpadteArtist'
import ArtistDetail from '../pages/Artists/ArtistDetail'
import SearchPage from '../components/Search/Search'
import GenresDetail from '../pages/Genres/GenresDetail'
import Login from '../pages/Login/Login'
import Register from '../pages/Login/Register'
import Genres from '../components/Genres/Genres'
export const routerClients =[
{
    path:'/albums',
    component:AlbumsList,
    exact:true,
    redirectTo:'',
    name:'Album List'
},
{
    path:'/artist',
    component:ArtistList,
    exact:true,
    redirectTo:'',
    name:'Artist List'
},
{
    path:'/',
    component:HomePage,
    exact:true,
    redirectTo:'',
    name:'Trang chủ'
},
{
    path:'/album/:id',
    component:AlbumDetail,
    exact:true,
    redirectTo:'',
    name:'Album Detail'
},
{
    path:'/chart',
    component:Mp3Chart,
    exact:true,
    redirectTo:'',
    name:'Bảng xếp hạng'
},
{
    path:'/artist/:id',
    component:ArtistDetail,
    exact:true,
    redirectTo:'',
    name:'Bảng xếp hạng'
},
{
    path:'/search',
    component:SearchPage,
    exact:true,
    redirectTo:'',
    name:'Bảng xếp hạng'
},
{
    path:'/genres/:id',
    component:GenresDetail,
    exact:true,
    redirectTo:'',
    name:'Thể loại'
},
{
    path:'/login',
    component:Login,
    exact:true,
    redirectTo:'',
    name:'Thể loại'
},
{
    path:'/register',
    component:Register,
    exact:true,
    redirectTo:'',
    name:'Thể loại'
},
{
    path:'/genres',
    component:Genres,
    exact:true,
    redirectTo:'',
    name:'Thể loại'
},
];
export const routerAdmins = [
    {
        path:'Dashboad',
        component:Dashboad,
        exact:true,
        redirectTo:''
    },
    {
        path:'/admin/album',
        component:ListAlbum,
        exact:true,
        redirectTo:''
    },
    {
        path:'/admin/create-album',
        component:CreateAlbum,
        exact:true,
        redirectTo:''
    },
    {
        path:'/admin/update-album/:id',
        component: UpdateAlbum,
        exact:true,
        redirectTo:''
    },
    {
        path:'/admin/songs',
        component: SongList,
        exact:true,
        redirectTo:''
    },
    {
        path:'/admin/update-song/:id',
        component: UpdateSong,
        exact:true,
        redirectTo:''
    },
    {
        path:'/admin/create-song',
        component: CreateSong,
        exact:true,
        redirectTo:''
    },
    {
        path:'/admin/artist',
        component: ArtistsPage,
        exact:true,
        redirectTo:''
    },
    {
        path:'/admin/update-artist/:id',
        component: UpdateArtist,
        exact:true,
        redirectTo:''
    },
    {
        path:'/admin/create-artist',
        component: CreateArtist,
        exact:true,
        redirectTo:''
    },
];