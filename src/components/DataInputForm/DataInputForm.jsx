import React from 'react';
import uuid from 'react-uuid';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Formik, Form } from 'formik';
import { string, object } from 'yup';
import {
  FieldStyled,
  Label,
  ErrorMessageStyled,
  ButtonStyled,
} from './DataInputForm.styled';
import { useSelector } from 'react-redux/es/exports';
import { addContact } from 'redux/operations';
import { useDispatch } from 'react-redux';
import { selectContactsList } from 'redux/selectors';

const userSchema = object({
  name: string()
    .required('Please enter your name')
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    ),
  number: string()
    .required('Please enter your phone number')
    .matches(
      /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    ),
});

export const DataInputForm = () => {
  const dispatch = useDispatch();
  const contactsList = useSelector(selectContactsList);

  const handleSubmit = ({ name, number }, actions) => {
    const contact = { id: uuid().toString(), name, phone: number };
    const contactExists = contactsList.find(contact => {
      return contact.name === name || contact.phone === number;
    });
    if (contactExists) {
      NotificationManager.warning(
        'Сontact with name ' + name + ' already saved'
      );
      return;
    }

    dispatch(addContact(contact));
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={userSchema}
        onSubmit={(values, actions) => handleSubmit(values, actions)}
      >
        <Form>
          <Label>
            Name
            <FieldStyled type="text" name="name" />
            <ErrorMessageStyled name="name" component="div" />
          </Label>

          <Label>
            Number
            <FieldStyled type="tel" name="number" />
            <ErrorMessageStyled name="number" component="div" />
          </Label>

          <ButtonStyled type="submit">Add contact</ButtonStyled>
        </Form>
      </Formik>
    </>
  );
};
