import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  currentContact: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getContact = createAsyncThunk(
  "contacts",
  async (contact_id, thunkApi) => {
    try {
      // get contact
      const res = await fetch(`/api/contacts/${contact_id}`);
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getContacts = createAsyncThunk("contacat", async (_, thunkApi) => {
  try {
    const res = await fetch("/api/contacts");
    if (!res.ok) {
      return thunkApi.rejectWithValue({
        status: "error",
        message: "something went wrong",
      });
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue({
      status: "error",
      message: error.message,
    });
  }
});

export const createContact = createAsyncThunk(
  "contact/create",
  async (contactData, thunkApi) => {
    try {
      const res = await fetch("/api/contacts", {
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(contactData),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// delete contaact
export const deleteContact = createAsyncThunk(
  "contact/delete",
  async (contact_id, thunkApi) => {
    try {
      const res = await fetch(`/api/contacts/${contact_id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  "contact/edit",
  async (contactData, thunkApi) => {
    try {
      const { id, ...rest } = contactData;
      const res = await fetch(`/api/contacts/${id}`, {
        headers: {
          "content-type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(rest),
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkApi.rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
        state.isSuccess = true;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isLoading = false;
      })
      .addCase(getContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentContact = action.payload;
        state.isSuccess = true;
      })
      .addCase(getContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          (contact) => contact._id.toString() !== action.payload.id
        );
        state.currentContact = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editContact.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(editContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = contactSlice.actions;

export default contactSlice.reducer;
