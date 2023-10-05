import { type ChangeEvent, useState } from "react";

const UPLOAD_PATH = '/api/images/upload';

export const FileUploader = () => {
    const [file, setFile] = useState<File>();

    const uploadFile = async () => {
        const formData = new FormData();
        if (file == null) {
            console.log('uploadFile: no file');
            return;
        }
        formData.append('files', file, file.name);
        // TODO: post data to endpoint
        const resp = await fetch(UPLOAD_PATH, {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        });
        // TODO: redirect?
        console.log(resp.status, resp.statusText);
    }

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files == null) {
            console.log('handleOnChange: null');
            return;
        }
        setFile(e.target.files[0]);
    }

    const handleOnDrop = (e:DragEvent) => {
        const files = e.dataTransfer?.files ?? null;
        if (!files || files.length === 0) return;

        if (files.length === 1) {
            setFile(files[0]);
        } else {
            console.log('onDrop: too many files');
        }
    }

    return (
        <div className="px-4 py-4 bg-black bg-opacity-20 rounded-lg" onDrop={(e) => handleOnDrop(e)}>
            <form method="POST" encType="multipart/form-data" action={UPLOAD_PATH}>
                <input id="files" name="files" type="file" onChange={(e) => handleOnChange(e)} />
                <h3 className="text-teal-200">
                    Upload File Here
                </h3>
                {file && <div>Filename {file.name}</div>}
                <button type="submit" disabled={file ? false : true} className="disabled:opacity-70 rounded-xl text-yellow-200 bg-indigo-500 gap-12 px-4">Click me!</button>
            </form>
        </div>
    )
}