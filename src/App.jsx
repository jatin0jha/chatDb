import React, { useState, useEffect } from 'react';
import './App.css';
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { getFirestore, onSnapshot, collection, addDoc, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { auth, app } from '../firebase';

const db = getFirestore(app);

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const sendMessage = async () => {
    await addDoc(collection(db, 'messages'), {
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      text: newMessage,
      timestamp: serverTimestamp()
    });

    setNewMessage('');
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=''>
      {user ? (
        <div>


          <div className="flex flex-col gap-5 text-display">
            {messages.map(msg => (
              <div key={msg.id} className={`message`}>
                <div className={`text-box ${msg.data.uid === user.uid ? 'justify-end' : 'justify-start'}`}>
                  <img className='user-pfp' src={msg.data.photoURL} alt="User profile" />
                  <div className='left-text'>
                    <b>{msg.data.displayName}</b> <br />
                    {msg.data.text}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className='chat-footer'>
            <div className='message-bar'>
              <input className='message-input'
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown} // Add event listener for key press
              />
              <button className='bg-white rounded-[10px] hover:bg-blue-400 p-3' onClick={sendMessage}>Send</button>
            </div>
            <div>Logged in as {user.displayName}</div>
          </div>
        </div>
      ) : (
        <button onClick={handleGoogleLogin}>Login with Google</button>
      )}
      <a className='logout-btn' onClick={() => auth.signOut()}>Logout</a>
    </div>
  );
}

export default App;
