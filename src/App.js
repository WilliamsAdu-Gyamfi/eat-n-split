import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const App = function () {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FriendForm />
      </div>
      <SplitForm />
    </div>
  );
};

const FriendsList = function () {
  return (
    <div>
      {initialFriends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </div>
  );
};

const Friend = function ({ friend }) {
  console.log(friend);
  return (
    <div>
      <li>
        <img src={friend.image} alt={friend.name}></img>
        <h3>{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="red">
            {" "}
            You owe {friend.name} {Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance > 0 && (
          <p className="green">
            {" "}
            {friend.name} owes you {Math.abs(friend.balance)}
          </p>
        )}
        {friend.balance === 0 && (
          <p>You and your friend {friend.name} are even</p>
        )}

        <button className="button">select</button>
      </li>
    </div>
  );
};

const FriendForm = function () {
  const [showAddFriend, setShowAddFriend] = useState(false);

  const handleTogggleAddFriend = function () {
    setShowAddFriend((show) => !show);
  };

  return (
    <>
      {showAddFriend && (
        <form className="form-add-friend">
          <label>Friend name</label>
          <input type="text" placeholder="friend name"></input>

          <label>image URL</label>
          <input type="text" placeholder="image url"></input>

          <button className="button">Add</button>
        </form>
      )}
      <button className="button" onClick={handleTogggleAddFriend}>
        {showAddFriend ? "close" : "Add Friend"}
      </button>
    </>
  );
};

const SplitForm = function () {
  return (
    <>
      <form className="form-split-bill">
        <h2>SPLIT BILL WITH FRIEND</h2>
        <label>Bill Value </label>
        <input type="text" placeholder="bill value"></input>

        <label>Your Expense </label>
        <input type="text" placeholder="your expense"></input>

        <label>Friend's Expense </label>
        <input type="text" disabled></input>

        <label>Who is paying the bill</label>
        <select>
          <option value="user">You</option>
          <option value="friend">Your friend</option>
        </select>
        <button className="button">split bill</button>
      </form>
    </>
  );
};

export default App;
