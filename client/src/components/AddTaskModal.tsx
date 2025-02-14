//AddTaskModal.tsx

import React, { useState } from 'react';

interface AddTaskModalProps {
  showModal: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ showModal, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description);
    setTitle('');
    setDescription('');
    onClose();
  };

  if (!showModal) return null;

  return (
    <div className="modal d-block" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Task</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
              </div>
              <button type="submit" className="btn btn-success">Add Task</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
