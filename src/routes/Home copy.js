import React, { useEffect, useState } from "react";
import { dbService } from "../fbase";

const Home = ({ userObj }) => {
  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);

  const getMsgs = async () => {
    const dbMsgs = await dbService.collection("message").get();
    dbMsgs.forEach((document) => {
      const msgsObject = { ...document.data(), id: document.id };
      setMsgs((prev) => [msgsObject, ...prev]);
    });
  };

  useEffect(() => {
    getMsgs();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.collection("message").add({
      uid: "uid2",
      nickName: "nickName1",
      text: msg,
      photo: "photo1",
      createdAt: Date.now(),
    });
    setMsg("");
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setMsg(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="덕담을 나눠주세요"
          maxLength={1000}
          onChange={onChange}
          value={msg}
        />
        <input type="submit" value="전송" />
      </form>
      {msgs.map((msg) => {
        return <div key={msg.id}>{msg.text}</div>;
      })}
    </div>
  );
};
export default Home;
