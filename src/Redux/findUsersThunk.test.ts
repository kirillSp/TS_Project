import { actions, follow, unfollow } from "./findUsersReducer";
import { usersAPI } from "../API/userApi";
import { ResponseDataType, ResultCodeEnum } from "../API/API";

jest.mock("../API/userApi");
let usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

let response: ResponseDataType = {
    data: {},
    messages: [],
    resultCode: ResultCodeEnum.success
};

let dispatchMock = jest.fn();
let stateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    stateMock.mockClear();
})

test("success follow thunk", async () => {
    usersAPIMock.follow.mockReturnValue(Promise.resolve(response));
    
    let thunk = follow(1);

    await thunk(dispatchMock, stateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleInProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followAC(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleInProgress(false, 1));
});

test("success unfollow thunk", async () => {
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(response));
    
    let thunk = unfollow(1);

    await thunk(dispatchMock, stateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleInProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowAC(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleInProgress(false, 1));
});