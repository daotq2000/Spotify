import { log } from 'async';
import React from 'react';
import { useParams } from 'react-router';
import AlbumForm from '../../componentAdmin/Albums/AlbumForm';
const UpdateAlbum = ( props) =>{
    const params = useParams();
    return (
        <AlbumForm id={params.id} title="Cập nhật album"/>
    );
}
export default UpdateAlbum;