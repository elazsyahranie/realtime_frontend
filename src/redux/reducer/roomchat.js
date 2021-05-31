const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  msg: "",
};

const roomchat = (state = initialState, action) => {
  switch (action.type) {
    case "ROOM_CHAT_PENDING": // pending = proses sedang dijalankan
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "ROOM_CHAT_FULFILLED": // fulfilled = proses yang akan dijalankan ketika berhasil
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.data,
      };
    case "ROOM_CHAT_REJECTED": // rejected = proses kkalau gagal
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: {},
        msg: action.payload.response.data.msg,
      };
    default:
      return state;
  }
};

export default roomchat;
