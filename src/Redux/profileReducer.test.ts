import { actions } from "./profileReducer";
import profileReducer from "./profileReducer";

let state = {
  postsData: [
    { id: 1, message: "Post 1", likesCount: 10, path: "http://www.clker.com/cliparts/R/S/Z/4/t/f/crossed-hammers-bw-100x100-md.png" },
    { id: 1, message: "Post 2", likesCount: 5, path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxjpT0a-IGi_4HMzlGEbc0Vd9WQCj6i2EMqg&usqp=CAU" },
    { id: 1, message: "Post 3", likesCount: 100, path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSr2BXBAn41QkNQkwtxwr4vMLR7NytIIxHwCejVT5OhIFmxqyJA2o4Qxa43CJqL6Uiuv0&usqp=CAU" },
    { id: 1, message: "Post 4", likesCount: 30, path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0Zu7qrFjoQ_WmGjqTNz-CVZrljJnxbmrFGS7Vx-62zerLxMrKI6lMG0mWMgcu9nb5I_8&usqp=CAU" },
  ],

  profile: null,
  status: "",
};

test("length of posts should be update", () => {
  let action = actions.addPostAC("some a text");
  let newState = profileReducer(state, action);

  expect(newState.postsData.length).toBe(5);
});

// test("text of post should be correct", () => {
//   let action = addPostAC("some a text");
//   let newState = profileReducer(state, action);

//   expect(newState.postsData[4].message).toBe("some a text");
// });