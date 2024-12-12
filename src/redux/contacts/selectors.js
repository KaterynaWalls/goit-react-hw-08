import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items || []; // Використовуємо порожній масив за замовчуванням
export const selectError = (state) => state.contacts.error;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectFilter = (state) => state.filters.name || ''; // Порожній рядок за замовчуванням

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    // Переконайтеся, що `contacts` є масивом, а `filter` є рядком
    return contacts.filter((contact) => {
      const name = contact.name?.toString().toLowerCase() || ''; // Захищаємося від `undefined`
      const phone = contact.phone?.toString() || ''; // Захищаємося від `undefined`
      const filterLower = filter.toLowerCase();

      return name.includes(filterLower) || phone.includes(filter);
    });
  },
);
