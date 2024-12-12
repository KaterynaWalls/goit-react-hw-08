// import { createSlice, isAnyOf } from "@reduxjs/toolkit";
// import { logOut } from "../auth/operations";
// import {
//   fetchContacts,
//   addContact,
//   deleteContact,
//   editContact,
// } from "./operations";

// const handlePending = (state) => {
//   console.log("Pending state triggered");
//   state.isLoading = true;

// };

// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

// const initialState = {
//   items: [],
//   isLoading: false,
//   error: null,
// };

// const contactsSlice = createSlice({
//   name: "contacts",
//   initialState,
//   extraReducers: (builder) => {
//     builder
//       .addCase(logOut.fulfilled, (state) => {
//         state.items = [];
//         state.error = null;
//         state.isLoading = false;
//       })
//       .addCase(fetchContacts.fulfilled, (state, action) => {
//         console.log("Fetch Contacts Fulfilled:", action.payload);
//         state.items = action.payload;
//         state.isLoading = false;
//         state.error = null;
//       })

//       .addCase(addContact.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.error = null;
//         state.items.push(action.payload);
//       })

//       .addCase(deleteContact.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.error = null;
//         state.items = state.items.filter(
//           (item) => item.id !== action.payload.id,
//         );
//       })

//       .addCase(editContact.fulfilled, (state, action) => {
//         const index = state.items.findIndex(
//           (item) => item.id === action.payload.id,
//         );
//         if (index !== -1) {
//           state.items[index] = action.payload;
//         }
//         state.error = null;
//         state.isLoading = false;
//       })

//       .addMatcher(
//         isAnyOf(
//           fetchContacts.pending,
//           addContact.pending,
//           deleteContact.pending,
//           editContact.pending,
//         ),
//         handlePending,
//       )
//       .addMatcher(
//         isAnyOf(
//           fetchContacts.rejected,
//           addContact.rejected,
//           deleteContact.rejected,
//           editContact.rejected,
//         ),
//         handleRejected,
//       );
//   },
// });

// export const contactsReducer = contactsSlice.reducer;
import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { fetchContacts, addContact, deleteContact } from "./operations";
import { logOut } from "../auth/operations";

const initialState = {
  items: [],
  filter: [],
  isLoading: false,
  error: false,
  isContactsFetched: false,

};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })
      .addCase(logOut.fulfilled, () => {
        return initialState;
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((item) => item.id !== payload.id);
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addMatcher(
        isAnyOf(
          fetchContacts.fulfilled,
          addContact.fulfilled,
          deleteContact.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload || "Something went wrong";
        }
      );
  },
});

export const contactsReducer = contactsSlice.reducer;