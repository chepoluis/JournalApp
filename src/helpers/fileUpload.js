export const fileUpload = async ( file ) => {
    if (!file) throw new Error(`The file doens't exist`);

    const cloudUrl = 'https://api.cloudinary.com/v1_1/react-course-vs/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData
        })

        // console.log(resp);

        if (!resp.ok) throw new Error('File could not be uploaded');

        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch(error) {
        console.error(error);
        throw new Error(error.message);
    }
}
