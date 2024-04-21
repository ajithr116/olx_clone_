import {useEffect, useContext, useState} from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {Firebase} from '../../Firebase/config.js';

import Heart from '../../assets/Heart';
import './Posts.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/postContext.jsx';
import { useNavigate } from 'react-router-dom';

function Posts() {

  const {firebase} =  useContext(FirebaseContext)
  const [products, setProducts] = useState([]);
  const db = getFirestore(Firebase);
  const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(productList);
    };
  
      // Fetch data from Fake Store API
  const fetchFakeStoreData = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    setRecommendations(data); // Make sure to define this state variable
  };

  fetchFakeStoreData();
    fetchProducts();
  }, []);
  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">

        <div className="cards">
          {products.map((product) => ( // Map over the products array
            <div className="card" onClick={()=>{
                setPostDetails(product);
                console.log("products. posts.jsx " + JSON.stringify(product));
                navigate('/viewpost');
              }} key={product.id}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" /> {/* Use product.imageURL for the image src */}
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.prize}</p> {/* Use product.price for the price */}
                <span className="kilometer">{product.category}</span> {/* Use product.category for the category */}
                <p className="name">{product.name}</p> {/* Use product.name for the name */}
              </div>
              <div className="date">
                <span>{product.createdAt}</span> 
              </div>
            </div>
          ))}
        </div>
          
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {recommendations.map((product) => (
            <div className="card" key={product.id}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="content">
                <p className="rate">₹ {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.title}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span> 
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Posts;
