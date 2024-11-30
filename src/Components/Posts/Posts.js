import React, { useEffect, useContext, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { firestore } from '../../firebase/config'
import { getDocs, collection } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { PostContext } from '../../store/PostContext';
import { useHistory } from 'react-router-dom';

function Posts() {
  const { firebase } = useContext(FirebaseContext)
  const [products, setProducts] = useState([])
  const { setPostDetails } = useContext(PostContext)
  const history = useHistory()
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(firestore, 'products'); // Getting reference to 'products' collection
        const snapshot = await getDocs(productsRef); // Fetching data

        const productsData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const productData = doc.data();
            const productId = doc.id;

            const imageUrl = productData.url || 'default_image_url_here';
            // If timestamp exists, convert to Date; otherwise, handle as needed
            const timestamp = productData.timestamp ? productData.timestamp.toDate() : null;

            return {
              id: productId,
              imageUrl: productData.imageUrl,
              price: productData.price,
              category: productData.category,
              name: productData.name,
              timestamp: timestamp ? timestamp.toLocaleDateString() : 'No date available', // Format the timestamp if exists
            };

          }));
        console.log(productsData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, [firebase]);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product => {
            return <div className="card" onClick={() => {
              setPostDetails(product)
              history.push('/view')
            }}>
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.timestamp}</span>
              </div>
            </div>

          })
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
