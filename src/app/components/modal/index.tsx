import { useState } from 'react';

interface InviteModalProps {
  type: 'coach' | 'agent';
  onClose: () => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ type, onClose }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Send the email to backend
      const res = await fetch('/api/send-invite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, type }),
      });
      
      if (res.ok) {
        alert('Invite sent!');
        onClose();
      } else {
        alert('Failed to send invite');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Invite a {type}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </label>
          <button type="submit">Send Invite</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default InviteModal;
