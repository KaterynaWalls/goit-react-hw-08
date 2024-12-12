;

export const selectUser = (state) => state.auth.user;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectIsError = (state) => state.auth.error;
export const selectIsLoading = (state) => state.auth.isLoading;
// export const selectUserName = createSelector([selectUser], (user) => user.name);
