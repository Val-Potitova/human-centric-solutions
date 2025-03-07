import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../store/postsSlice';
import { useNavigate } from 'react-router';
import styles from '../styles/CreatePost.module.css';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setError('Invalid file format! Only images are allowed.');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    switch (true) {
      case !title:
        setError('Title is required!');
        return;
      case !body:
        setError('Body is required!');
        return;
      case !image:
        setError('Image is required!');
        return;
      default:
        setError('');
    }
    const newPost = {
      id: Date.now(),
      title,
      body,
      date: new Date().toISOString(),
      image,
    };
    dispatch(addPost(newPost));
    navigate(`/post/${newPost.id}`, { state: { post: newPost } });
  };

  const handleCancel = () => {
    setTitle('');
    setBody('');
    setImage('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <h3 className={styles.title}>Creating a post</h3>
      <form onSubmit={handleSubmit} className="create_form">
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={styles.add_post}
          placeholder="Post body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <div className={styles.add_image}>
          <button 
            type="button" 
            className={`${styles.upload_button} main_button`}
            onClick={() => fileInputRef.current?.click()}
          >
            Choose Image
          </button>
          {image && <img src={image} alt="Preview" className={styles.image_preview} />}
        </div>
        {error && <p className="error">{error}</p>}
        <button className="red_button main_button" type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button className="main_button" type="submit">Create</button>
      </form>
    </>
  );
}

export default CreatePost;