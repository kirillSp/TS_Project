import React, { FC, useEffect, useState, ChangeEvent } from "react"
import { TChatUsersData, TListChatUsers } from "./TChatPage"

export const ChatPage: FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: FC = () => {
    let wsChatConnection = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    let [wsChatData, setWsChatData] = useState<WebSocket>(wsChatConnection);
    
    useEffect(() => {
        wsChatConnection.addEventListener("close", () => {
            console.log("close")
        })
    }, [wsChatData])

    return <div>
        <ListChatUsers wsChatData={wsChatData} />
        <ChatForm wsChatData={wsChatData} /> 
    </div>
}


const ListChatUsers: FC<TListChatUsers> = ({wsChatData}) => {
    let [chatUsersData, setChatUsersData] = useState<[] | TChatUsersData[]>([]);
    
    useEffect(() => {
        wsChatData.addEventListener("message", e => {
            let newDataChatUsers = JSON.parse(e.data);
            
            setChatUsersData(prevDataChatUsers => {
                return [...prevDataChatUsers, ...newDataChatUsers]
            })
        })
    }, []);

    return <div style={{ height: "400px", overflow: "auto" }}>
        {
            chatUsersData.map((chatUserData, i) => {
                return <div key={i}>
                    <img src={chatUserData.photo} />
                    <h2>{chatUserData.userName}</h2>
                    <p>{chatUserData.message}</p>
                </div>
            })
        }
    </div>
}

const ChatForm: FC<TListChatUsers> = ({wsChatData}) => {
        let [message, setMessage] = useState<string>("");
        let [wsChatStatus, setWsChatStatus] = useState<"pending" | "open">("pending");
    
        useEffect(() => {
            wsChatData.addEventListener("open", () => {
                setWsChatStatus("open");
            })
        }, [wsChatData]);
    
        const changeChatForm = (e: ChangeEvent<HTMLTextAreaElement>) => {
            setMessage(e.target.value)
        }
    
        const sendChatForm = () => {
            if (!message) return;
    
            wsChatData?.send(message);
            setMessage("");
        }
    
        return <div>
            <textarea onChange={changeChatForm} value={message}></textarea>
            <button disabled={wsChatStatus !== "open"} onClick={sendChatForm}>click</button>
        </div>
    }

// const Chat: FC = () => {
//     let [wsChannel, setWsChannel] = useState<WebSocket | null>(null);
    
//     useEffect(() => {
//         function createChannel() {
//             setWsChannel(new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"));
//         }
        
//         createChannel();
//     }, []);
    
//     useEffect(() => {
//         wsChannel?.addEventListener("close", () => {
//             console.log("close")
//         });
//     }, [wsChannel]);

//     return <div>
//         <ChatMessages wsChannel={wsChannel} />
//         <AddFormChatMessage wsChannel={wsChannel} />
//     </div>
// }

// const ChatMessages: FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
//     let [dataChatUsers, setDataChatUsers] = useState<[] | TMessage[]>([]);
    
//     useEffect(() => {
//         wsChannel?.addEventListener("message", e => {
//             let newDataChatUsers = JSON.parse(e.data);
//             setDataChatUsers(prevDataChatUsers => {
//                 return [...prevDataChatUsers, ...newDataChatUsers]
//             })
//         })
//     }, [])

//     return <div style={{ height: "400px", overflow: "auto" }}>
//         {
//             dataChatUsers.map(dataChatUser => {
//                 return <div key={dataChatUser.userId}>
//                     <img src={dataChatUser.photo} />
//                     <h2>{dataChatUser.userName}</h2>
//                     <p>{dataChatUser.message}</p>
//                 </div>
//             })
//         }
//     </div>
// }

// const AddFormChatMessage: FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
//     let [message, setMessage] = useState<string>("");
//     let [connectionStatus, setConnectionStatus] = useState<"pending" | "open">("pending");

//     useEffect(() => {
//         setConnectionStatus("open");
//     }, []);

//     const handleChangeMessage = (e: ChangeEvent<HTMLTextAreaElement>) => {
//         setMessage(e.target.value)
//     }

//     const handleClickMessage = () => {
//         if (!message) return;

//         wsChannel?.send(message);
//         setMessage("");
//     }

//     return <div>
//         <textarea onChange={handleChangeMessage} value={message}></textarea>
//         {/* <button disabled={wsChannel !== null || connectionStatus !== "open"} onClick={handleClickMessage}>click</button> */}
//         <button onClick={handleClickMessage}>click</button>
//     </div>
// }