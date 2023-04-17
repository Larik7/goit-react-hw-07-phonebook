import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContact } from 'redux/selectors';
import * as Yup from 'yup';
import { FormField, Form, ErrorMessage, SubmitBtn } from './ContactForm.styled';

const ContactShema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Name is too short!')
    .max(16, 'Name is too long!')
    .required('Name is required'),
  number: Yup.string()
    .min(3, 'Number is too short!')
    .max(20, 'Number is too long!')
    .required('Number is required'),
});

export const ContactForm = () => {
  const contacts = useSelector(selectContact);
  const dispatch = useDispatch();

  const onSubmit = (values, actions) => {
    const findName = values.name.toLowerCase();
    if (contacts.find(({ name }) => name.toLowerCase() === findName)) {
      alert(`${values.name} is already in contacts`);
      return;
    }

    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={ContactShema}
      onSubmit={onSubmit}
    >
      <Form>
        <FormField>
          Name
          <Field name="name" />
          <ErrorMessage name="name" component="span" />
        </FormField>
        <FormField>
          Number
          <Field name="number" type="tel" />
          <ErrorMessage name="number" component="span" />
        </FormField>
        <SubmitBtn type="submit" onSubmit={onSubmit}>
          <span>Add contact</span>
        </SubmitBtn>
      </Form>
    </Formik>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func,
};

// const handleSubmit = (event) => {
//     event.preventDefault();

//     const valueName = event.target.name.value;
//     const existstName = contacts.find(contact => contact.name === valueName);

//     if (existstName) {
//       alert(`This name is already in contacts!`);
//     }

//     dispatch(addContact(event.target.name.value, event.target.number.value));
//   }

// const addContact = newContact => {
//   const findName = newContact.name.toLowerCase();
//   if (contacts.find(({ name }) => name.toLowerCase() === findName)) {
//     alert(`${newContact.name} is already in contacts`);
//     return
//   }
// }

// onSubmit = {(values, actions) => {
//       handleSubmit({...values, id: nanoid()});
//       actions.resetForm();
//   }}
