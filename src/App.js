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
  const [friends, setFriends] = useState(initialFriends);
  console.log(friends);

  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleAddFriend = function (friend) {
    setFriends((friends) => [...friends, friend]);
  };

  const handleSelection = function (friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend,
    );
  };

  const handleSplitBill = function (value) {
    console.log(value);
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend,
      ),
    );
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        <FriendForm
          onAddFriend={handleAddFriend}
          onSelection={handleSelection}
        />
      </div>
      {selectedFriend && (
        <SplitForm
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
};

const FriendsList = function ({ friends, onSelection, selectedFriend }) {
  return (
    <div>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </div>
  );
};

const Friend = function ({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  console.log(friend);
  return (
    <div>
      <li className={isSelected ? "selected" : ""}>
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

        <button className="button" onClick={() => onSelection(friend)}>
          {isSelected ? "Close" : "Select"}
        </button>
      </li>
    </div>
  );
};

const FriendForm = function ({ onAddFriend }) {
  const [showAddFriend, setShowAddFriend] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleAddSubmit = function (e) {
    e.preventDefault();

    if (!name || !image) return; // so it won't submit empty form

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}? = ${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  const handleTogggleAddFriend = function () {
    setShowAddFriend((show) => !show);
  };

  return (
    <>
      {showAddFriend && (
        <form className="form-add-friend" onSubmit={handleAddSubmit}>
          <label>Friend name</label>
          <input
            type="text"
            placeholder="friend name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>

          <label>image URL</label>
          <input
            type="text"
            placeholder="image url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          ></input>

          <button className="button">Add</button>
        </form>
      )}
      <button className="button" onClick={handleTogggleAddFriend}>
        {showAddFriend ? "close" : "Add Friend"}
      </button>
    </>
  );
};

const SplitForm = function ({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [userBill, setUserBill] = useState("");
  const billFriend = bill ? bill - userBill : "";
  const [whoPays, setWhoPays] = useState("user");
  const handleSubmit = function (e) {
    e.preventDefault();

    if (!bill || !userBill) return;
    onSplitBill(whoPays === "user" ? billFriend : -userBill);
  };
  return (
    <>
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>SPLIT BILL WITH {selectedFriend.name}</h2>
        <label>Bill Value </label>
        <input
          type="text"
          placeholder="bill value"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        ></input>

        <label>Your Expense </label>
        <input
          type="text"
          placeholder="your expense"
          value={userBill}
          onChange={(e) =>
            setUserBill(
              Number(e.target.value) > bill ? userBill : Number(e.target.value),
            )
          }
        ></input>

        <label>{selectedFriend.name}'s Expense </label>
        <input type="text" disabled value={billFriend}></input>

        <label>Who is paying the bill</label>
        <select value={whoPays} onChange={(e) => setWhoPays(e.target.value)}>
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
        <button className="button">split bill</button>
      </form>
    </>
  );
};

export default App;
