import { List, ListItem, Btn } from './Contacts.styled';
import { selectedContacts, selectIsLoading } from 'redux/selectors';
import { deleteContact } from 'redux/operations';
import { useDispatch, useSelector } from 'react-redux';

export const Contacts = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const filteredContacts = useSelector(selectedContacts);

  return (
    <>
      <List>
        {isLoading === false &&
          filteredContacts.map(({ id, name, phone }) => {
            return (
              <ListItem key={id}>
                <span>
                  {name}, {phone}
                </span>

                <Btn type="button" onClick={() => dispatch(deleteContact(id))}>
                  Delete
                </Btn>
              </ListItem>
            );
          })}
      </List>
    </>
  );
};
