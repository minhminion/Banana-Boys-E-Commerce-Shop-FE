import React, { useEffect, useState, Fragment } from "react";
import Message from "./components/Message";
import Compose from "./components/Compose";
import moment from "moment";
import { readMessage, writeMessage } from "../../../helpers/chat";
import "../../css/chatBox.scss";
import { Avatar, Popover, Badge, Typography, Button, Space } from "antd";
import { MessageOutlined, CloseOutlined } from "@ant-design/icons";
import { useSound } from "../../../hooks/useSound";

const { Text } = Typography;

const ChatBox = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [playing, play, pause] = useSound(
    process.env.PUBLIC_URL + "messenger.mp3"
  );
  const [visible, setVisible] = useState(false);

  const helloMessages = {
    author: "1",
    content: `Xin chào ${user.name}, Shop có thể giúp gì cho bạn ?`,
    timestamp: Date.now(),
  };

  useEffect(() => {
    readMessage(user.id, (messages) => {
      setMessages(messages);
    });
  }, [user.id]);

  const onSubmit = (content) => {
    writeMessage(user.id, user.id, content);
  };

  let isMine = true;
  let prevBySameAuthor = false;

  useEffect(() => {
    if (!isMine && !prevBySameAuthor && !playing) {
      play();
    }
  }, [isMine, play, playing, pause, prevBySameAuthor]);

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [
      <Message
        startsSequence={true}
        endsSequence={true}
        key={helloMessages.timestamp}
        data={helloMessages}
      />,
    ];

    while (i < messageCount) {
      let previous = messages[i - 1];
      let current = messages[i];
      let next = messages[i + 1];
      isMine = current.author === user.id;
      let currentMoment = moment(current.timestamp);
      let nextBySameAuthor = false;
      let startsSequence = true;
      let endsSequence = true;
      let showTimestamp = true;

      if (previous) {
        let previousMoment = moment(previous.timestamp);
        let previousDuration = moment.duration(
          currentMoment.diff(previousMoment)
        );
        prevBySameAuthor = previous.author === current.author;

        if (prevBySameAuthor && previousDuration.as("hours") < 1) {
          startsSequence = false;
        }

        if (previousDuration.as("hours") < 1) {
          showTimestamp = false;
        }
      }

      if (next) {
        let nextMoment = moment(next.timestamp);
        let nextDuration = moment.duration(nextMoment.diff(currentMoment));
        nextBySameAuthor = next.author === current.author;

        if (nextBySameAuthor && nextDuration.as("hours") < 1) {
          endsSequence = false;
        }
      }

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
      i += 1;
    }
    return tempMessages;
  };

  return (
    <div className="fixed-widgets">
      <Popover
        title={
          <Fragment>
            <Text strong>Chăm sóc khách hàng</Text>
            <CloseOutlined style={{ float: "right", lineHeight: 1.5 }} onClick={() => setVisible(false)}/>
          </Fragment>
        }
        trigger="click"
        placement="topRight"
        onVisibleChange={(visible) => setVisible(visible)}
        visible={visible}
        overlayStyle={{
          position: "fixed",
          right: 22,
          bottom: 100,
        }}
        content={
          user.id ? (
            <div className="message-list">
              <div className="message-list-container">{renderMessages()}</div>
              <Compose onSubmit={onSubmit} />
            </div>
          ) : (
            "Vui lòng đăng nhập"
          )
        }
      >
        <Avatar className="fixed-widgets-avatar">
          <Badge dot={!isMine} offset={[0, 12]}>
            <MessageOutlined />
          </Badge>
        </Avatar>
      </Popover>
    </div>
  );
};

export default ChatBox;
