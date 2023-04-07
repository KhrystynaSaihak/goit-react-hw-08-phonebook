import { createSelector } from '@reduxjs/toolkit';

export const selectContactsList = state => state.contacts.items;
export const selectError = state => state.contacts.error;
export const selectIsLoading = state => state.contacts.isLoading;

export const selectFilter = state => state.filter;

export const selectedContacts = createSelector(
  [selectContactsList, selectFilter],
  (contactsList, filter) => {
    const filteredContacts = contactsList.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
    return filteredContacts;
  }
);
