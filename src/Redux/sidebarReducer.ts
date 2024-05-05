type initialStateType = {
    name: string
    src: string
}

let initialState: Array<initialStateType> = [
    { name: "Andrew", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTcCpFkOFiN-kJ1BgVgVKqhlCNfjNIeRtZKA&usqp=CAU" },
    { name: "Sasha", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTcCpFkOFiN-kJ1BgVgVKqhlCNfjNIeRtZKA&usqp=CAU" },
    { name: "Misha", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTcCpFkOFiN-kJ1BgVgVKqhlCNfjNIeRtZKA&usqp=CAU" }
];

let sidebarReducer = (state = initialState) => state;

export default sidebarReducer;