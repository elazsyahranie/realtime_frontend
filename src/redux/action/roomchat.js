import axiosApiInstances from "../../utils/axios";

export const roomchat = (id) => {
  return {
    type: "ROOM_CHAT",
    payload: axiosApiInstances.get(`/room_chat/${id}`),
  };
};
