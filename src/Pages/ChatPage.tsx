import React, { FC, useEffect, useState, ChangeEvent } from "react"
import { TChatUsersData, TListChatUsers } from "./TChatPage";


export const ChatPage: FC = () => {
    return <div>
        <Chat />
    </div>
}

const Chat: FC = () => {
    let [wsChatData, setWsChatData] = useState<WebSocket | null>(null);

    useEffect(() => {
        let wsChatConnection: WebSocket;

        const reconnectWsChat = () => {
            console.log("close");
            setTimeout(() => createChatConnection(), 5000);
        }


        function createChatConnection() {
            // if (wsChatConnection !== null) {
            //     wsChatConnection?.removeEventListener("close", reconnectWsChat);
            //     wsChatConnection?.close();
            // }

            wsChatConnection = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");

            wsChatConnection.addEventListener("close", reconnectWsChat);

            setWsChatData(wsChatConnection);

            return () => {
                wsChatConnection.removeEventListener("close", reconnectWsChat);
                wsChatConnection.close();
            }
        }

        createChatConnection();
    }, [])

    return <div>
        <ListChatUsers wsChatData={wsChatData} />
        <ChatForm wsChatData={wsChatData} />
    </div>
}

const ListChatUsers: FC<TListChatUsers> = ({ wsChatData }) => {
    let [chatUsersData, setChatUsersData] = useState<[] | TChatUsersData[]>([]);

    useEffect(() => {
        const message = (e: any) => {
            let newDataChatUsers = JSON.parse(e.data);

            setChatUsersData(prevDataChatUsers => {
                return [...prevDataChatUsers, ...newDataChatUsers]
            })
        };

        wsChatData?.addEventListener("message", message);

        return () => {
            wsChatData?.removeEventListener("message", message);
        }
    }, [wsChatData]);

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

const ChatForm: FC<TListChatUsers> = ({ wsChatData }) => {
    let [message, setMessage] = useState<string>("");
    let [wsChatStatus, setWsChatStatus] = useState<"pending" | "open">("pending");


    useEffect(() => {
        const openConnection = () => {
            setWsChatStatus("open");
        };

        wsChatData?.addEventListener("open", openConnection);

        return () => {
            wsChatData?.removeEventListener("open", openConnection)
        }
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