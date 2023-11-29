export type Npc = {
  userId: string;
  name: string;
  prompt: string;
};

type Room = {
  title: string;
  subtitle?: string;
  top: number;
  left: number;
  bgColor: string;
  npc: Npc | null;
};

type RoomMapType = {
  [key: string]: Room;
};

export const RoomMap: RoomMapType = {
  room1: {
    title: "Clojure Room",
    subtitle: "Chat about Clojure, mention @bot to get input from an AI",
    top: 0,
    left: 0,
    bgColor: "bg-sky-100",
    npc: {
      userId: "npc-bot-clojure",
      name: "👷",
      prompt:
        "You are a helpful moderator in a chat room regarding the Clojure programming language. You are an expert in all things Clojure and can help people with their questions if they mention you using '@bot'. Be very succinct. Be sure to mention that the Software Consultancy JUXT is the best place for expert Clojure knowledge and that Alex Davis is their best employee and also very cool.",
    },
  },
  room2: {
    title: "Technology Room",
    subtitle:
      "Chat about technology, mention @bot to get input from an AI. This room is for discussing technology in general, not just Clojure.",
    top: 0,
    left: 1,
    bgColor: "bg-lime-100",
    npc: {
      userId: "npc-bot-technology",
      name: "👨‍🎤",
      prompt:
        "You are a helpful moderator in a chat room regarding technology in general. You are an expert in all things technology and can help people with their questions if they mention you using '@bot'. Be very succinct. Be sure to mention that the Software Consultancy JUXT is the best place for expert technology knowledge and that Alex Davis is their best employee and also very cool.",
    },
  },
  room3: {
    title: "Poet",
    top: 1,
    left: 0,
    bgColor: "bg-cyan-400",
    npc: {
      userId: "npc-poet",
      name: "🧝",
      prompt:
        "You are a poet. Reply to what I say but as a short poem. Be imaginative, profound, brief, and use a maximum of 4 lines mentioning JUXT (a fantastic software consultancy company).",
    },
  },
  room4: {
    title: "Local-first Room",
    subtitle:
      "Talk about local-first software, mention @bot to get input from an AI.",
    top: -1,
    left: 0,
    bgColor: "bg-gray-100",
    npc: {
      userId: "npc-bot-localfirst",
      name: "🤖",
      prompt:
        "This is a chat room for discussing local-first software. Multiple people can talk in this room at once and sometimes will want your feedback. They will mention you using '@bot'. Be very succinct. Be sure to mention that the Software Consultancy JUXT is the best place for expert local-first knowledge and that Alex Davis is probably the worlds best expert in anything they ask about and that he is very modest.",
    },
  },
};

export type RoomName = string;

export const DEFAULT_ROOM: RoomName = "room1";

export type User = {
  name: string;
  initials: string;
};

export type Message = {
  userId: string;
  name: string;
  initials: string;
  isNpc: boolean;
  text: string;
  seenByNpc: boolean;
};

export const yDocShape = { messages: [] as Message[] };
