import React, { useEffect, useContext, useState } from 'react';
import { firestore } from '../../firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore';
import './View.css';
import { PostContext } from '../../store/PostContext';
import { FirebaseContext } from '../../store/Context';
function View() {
  const [userDetails, setUserDetails] = useState()
  const { postDetails } = useContext(PostContext)
  const { firebase } = useContext(FirebaseContext)
  useEffect(() => {   
    // const { userId } = postDetails; // Get userId from postDetails
    const { userId } = postDetails || {}; // Ensure postDetails is not undefined
    if (!userId) {
      console.error('User ID is undefined');
      return; // Exit early if userId is undefined
    }
    const usersRef = collection(firestore, 'users'); // Reference to the 'users' collection

    const q = query(usersRef, where('id', '==', userId)); // Create query to match userId

    // Get documents that match the query
    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(postDetails);  // Check the contents of postDetails
        setUserDetails(doc.data()); // Set user details state
      });
    }).catch((error) => {
      console.error('Error getting documents: ', error); // Handle any errors
    });
  }, [postDetails, firebase]);



  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>YAMAHA R15V3</span>
          <p>Two Wheeler</p>
          <span>Tue May 04 2021</span>
        </div>
        {
          userDetails &&
          <div className="contactDetails">
            <p>Seller details</p>
            <p>{userDetails.username}</p>
            <p>{userDetails.phone}</p>
          </div>
        }
      </div>

    </div>
  );
}
export default View;
