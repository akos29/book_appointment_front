import React from 'react';
import PropTypes from 'prop-types';

function DeleteYachtConfirmation({ isOpen, onCancel, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='bg-white p-4 rounded shadow-md w-64'>
        <p className='mb-4'>Are you sure you want to delete this yacht?</p>
        <div className='flex justify-end'>
          <button
            type='button'
            className='bg-red-500 text-white px-4 py-2 rounded mr-2'
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            type='button'
            className='bg-gray-300 text-gray-700 px-4 py-2 rounded'
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

DeleteYachtConfirmation.defaultProps = {
  isOpen: true,
};

DeleteYachtConfirmation.propTypes = {
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteYachtConfirmation;
