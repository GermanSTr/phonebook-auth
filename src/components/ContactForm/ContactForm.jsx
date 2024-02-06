import { useDispatch, useSelector } from 'react-redux';
import { apiAddContact } from '../../redux/contactsSlice';
import { selectContacts } from '../../redux/contacts.selector';

import css from './ContactForm.module.css';

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleFormSubmit = evt => {
    evt.preventDefault();
    const name = evt.currentTarget.elements.name.value;
    const numder = evt.currentTarget.elements.numder.value;
    const formData = { name, numder };
    handleAddName(formData);
    evt.currentTarget.reset();
  };

  const handleAddName = formData => {
    const hasDuplicates = contacts.some(
      profile => profile.name.toLowerCase() === formData.name.toLowerCase()
    );
    if (hasDuplicates) {
      alert(`${formData.name} is already in contacts`);
      return;
    }
    dispatch(apiAddContact(formData));
  };

  return (
    <form className={css.formContacts} onSubmit={handleFormSubmit}>
      <label className={css.formLabel}>
        <span className={css.formSpan}>Name</span>
        <input type="text" name="name" className={css.formInput} required />
      </label>
      <label className={css.formLabel}>
        <span className={css.formSpan}>Number</span>
        <input type="text" name="numder" className={css.formInput} required />
      </label>
      <button type="submit" className={css.formButton}>
        Add Contact
      </button>
    </form>
  );
};
