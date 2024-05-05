import findUsersReducer, { UsersType, actions } from "./findUsersReducer";
import { initialStateType } from "./findUsersReducer";

let initialState: initialStateType;

beforeEach(() => {
    initialState = {
        users: [
            { followed: true, id: 1, name: "name1", photos: { large: "", small: "" }, status: "empty1" },
            { followed: true, id: 2, name: "name2", photos: { large: "", small: "" }, status: "empty2" },
            { followed: false, id: 3, name: "name3", photos: { large: "", small: "" }, status: "empty3" },
            { followed: false, id: 4, name: "name4", photos: { large: "", small: "" }, status: "empty4" },
        ],
        pageSize: 3,
        totalUsers: 40,
        currentPage: 1,
        isLoading: false,
        followingInProgress: [],
    };
})

test("follow success", () => {
    let newStateFindUsersReducer = findUsersReducer(initialState, actions.followAC(1));

    expect(newStateFindUsersReducer.users[0].followed).toBeFalsy();
    expect(newStateFindUsersReducer.users[1].followed).toBeTruthy();
});

test("unfollow successs", () => {
    let updatedState = findUsersReducer(initialState, actions.unfollowAC(3));

    expect(updatedState.users[2].followed).toBeTruthy();
    expect(updatedState.users[3].followed).toBeFalsy();
})