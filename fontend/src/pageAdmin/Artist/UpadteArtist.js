import React from 'react'
import { useParams } from 'react-router';
import ArtistForm from '../../componentAdmin/Artist/ArtistForm'
const CreateArtist = () =>{
    const params = useParams();
    return (
        <ArtistForm title="Cập nhật Nghệ Sĩ" id={params.id} />
    );
}
export default CreateArtist;