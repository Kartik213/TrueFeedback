import Message from '../components/Message';
import Suggestion from '../components/Suggestion';
import { useState } from 'react';

const Profile = () => {
  const [message, setMessage] = useState("");
  return (
    <div className="mx-14 my-7 lg:mx-80">
      <Message message={message} setMessage={setMessage} />
      <Suggestion setMessage={setMessage} />
    </div>
  );
}

export default Profile
