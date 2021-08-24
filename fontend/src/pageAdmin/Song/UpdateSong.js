import React from 'react'
import { useParams } from 'react-router';
import SongForm from '../../componentAdmin/Song/SongForm';
const UpdateSong = (props) =>{
    const params = useParams();
return (
    <SongForm id={params.id} title ="Cập nhật bài hát"/>
);
}
export default UpdateSong;