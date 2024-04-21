import { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header.jsx';

import {FirebaseContext, AuthContext} from '../../store/Context.jsx';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import {Firebase} from '../../Firebase/config.js';
import { useNavigate } from 'react-router-dom';

const Create = () => {

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState();
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');

  const {firebase} = useContext(FirebaseContext);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert('Please enter a name.');
      return;
    }

    if (!category.trim()) {
      alert('Please enter a category.');
      return;
    }

    if (!price) {
      alert('Please enter a price.');
      return;
    }

    if (!image) {
      alert('Please select an image.');
      return;
    }

    if (!user || !user.uid) {
      alert('User ID is null. Please log in.');
      return;
    }

    const storage = getStorage(firebase);
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    const db = getFirestore(Firebase);
    const date = new Date();

    uploadTask.on('state_changed', 
      (snapshot) => {
        console.log(snapshot);
      }, 
      (error) => {
        console.log(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          addDoc(collection(db, 'products'),{
            name:name,
            category:category,
            prize:price,
            url:downloadURL,
            userId:user.uid,
            createdAt:date.toDateString(),
          });
          setImageURL(downloadURL);
          navigate('/home')
        });
      }
    );
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Fragment>
      <Header />
      <div className='card'>
        <div className="centerDiv">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
              className="input" 
              type="number" 
              id="fname" 
              name="Price" 
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
            <br />
            <img alt="Posts" width="200px" height="200px" src={imageURL}></img>
            <br />
            <input 
              type="file" 
              accept=".png, .jpg, .jpeg" 
              onChange={handleImageChange} 
            />
            <br />
            <button type='submit' className="uploadBtn">Upload and Submit</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
