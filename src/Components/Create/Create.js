import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom'
import { FirebaseContext, AuthContext } from '../../store/Context'
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/config';



const Create = () => {
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const history = useHistory()
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category || !price || !url) {
      alert('Please fill out all fields!');
      return;
    }

    try {
      // Add item data to Firestore
      const itemsCollection = collection(firestore, 'products');
      const docRef = await addDoc(itemsCollection, {
        name,
        category,
        price,
        url, // Store the URL directly
        userId: user ? user.uid : null, // Store user ID if logged in
        timestamp: new Date(),
      });

      console.log('Item created with ID: ', docRef.id);
      alert('Item created successfully!');
         
      // Reset form after successful submission
      setName('');
      setCategory('');
      setPrice('');
      setUrl('');

      history.push('/')

    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Error creating item');
    }
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname"></label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e) => setName(e.target.value)}
              name="Name"
              placeholder="Name"
            />
            <br />
            <label htmlFor="fname"></label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              placeholder="Category"
            />
            <br />
            <label htmlFor="fname"></label>
            <br />
            <input
              className="input"
              type="number"
              id="fname"
              onChange={(e) => setPrice(e.target.value)}
              name="Price"
              placeholder="Price"
            />
            <br />
          </form>
          <label htmlFor="fname"></label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            onChange={(e) => setUrl(e.target.value)}
            name="imageURL"
            placeholder="Image URL"
          />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

        </div>
      </card>
    </Fragment>
  );
};

export default Create;
