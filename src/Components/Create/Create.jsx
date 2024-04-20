import { Fragment, useState } from 'react';
import './Create.css';
import Header from '../Header/Header.jsx';

const Create = () => {

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState();
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState('');

  function handleSubmit(e){
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

    console.log(name, category, price, image);
  }

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <Fragment>
      <Header />
      <card>
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
      </card>
    </Fragment>
  );
};

export default Create;
