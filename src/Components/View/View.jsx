import { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { getFirestore, collection, query ,getDocs, where } from 'firebase/firestore';
import './View.css';
import { PostContext } from '../../store/postContext';
import { Firebase } from '../../Firebase/config';

function View() {


  const { postDetails } = useContext(PostContext);
  const [userDetails, setUserDetails] = useState({});
  const db = getFirestore(Firebase);
  const [products, setProducts] = useState([]);

  console.log("post details . view.jsx " + JSON.stringify(postDetails.userId));

  useEffect(()=>{
    const fetchUserDetails = async ()=>{

      try{
        const collRef = collection(db, 'users');
        const q = query(collRef, where('id','==',postDetails.userId));
        const snapShot = await getDocs(q);
        let result;
        snapShot.forEach((doc)=>{
          result = doc.data();
        })
        console.log("qqqqq" + JSON.stringify(result));
        setUserDetails(result);

         // Fetch products for this user
        const productsCollRef = collection(db, 'products');
        const productsQuery = query(productsCollRef, where('userId', '==', postDetails.userId));
        const productsSnapShot = await getDocs(productsQuery);
        let productsResult = [];
        productsSnapShot.forEach((doc) => {
          productsResult.push(doc.data());
        });
        setProducts(productsResult); // Make sure to define this state variable

      }
      catch(err){
        console.log("errrrrrrrrr"+err);
      }
    }
    fetchUserDetails();
  },[])


  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt="post details"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; 250000 </p>
          <span>{postDetails.name}</span><br/>
          <span>{postDetails.createdAt}</span>
        </div>
        <div className="userDetails">
        { userDetails &&
          <div className="contactDetails">
            <p><b>Name : </b>{userDetails.username}</p>
            <p><b>Email : </b> {userDetails.email}</p>
            <p><b>Phone : </b> {userDetails.phone}</p>
          </div>
        }

        </div>
      </div>
      <div className="recommendedProducts">
      <h2>Recommended Products</h2>
      <div className="productList">
        {products.map((product) => (
          <div key={product.name} className="productCard">
            <img src={product.url} alt={product.name} />
            <div>
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p>₹ {product.price}</p>
              <p>{new Date(product.createdAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
      {/* <Footer /> */}
    </div>
  );
}
export default View;
