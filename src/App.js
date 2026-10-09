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
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowFriend = function () {
    setShowAddFriend((show) => !show);
  };

  const handleAddFriend = function (friend) {
    setFriends((friends) => [...friends, friend]);
  };

  const handleSelection = function (friend) {
    //setSelectedFriend(friend);
    setSelectedFriend((curSelected) =>
      curSelected?.id === friend.id ? null : friend,
    );
    setShowAddFriend(false);
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
        <FriendList
          friends={friends}
          onSelect={handleSelection}
          selectedFriend={selectedFriend}
        />

        {showAddFriend && <FriendAddForm onAddFriend={handleAddFriend} />}

        <button className="button" onClick={handleShowFriend}>
          {showAddFriend ? "close" : "Add friend"}
        </button>
      </div>

      {selectedFriend && (
        <SplitBillForm
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
};

const FriendList = function ({ friends, onSelect, selectedFriend }) {
  // const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friends
          friend={friend}
          key={friend.id}
          onSelect={onSelect}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
};

const Friends = function ({ friend, onSelect, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  console.log(isSelected);
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}></img>
      <h3> {friend.name} </h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <button className="button" onClick={() => onSelect(friend)}>
        {isSelected ? "close" : "select"}
      </button>
    </li>
  );
};

const FriendAddForm = function ({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = function (e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    console.log(newFriend);
    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  };
  return (
    <>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>Friend name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        ></input>
        <button className="button">Add</button>
      </form>
    </>
  );
};

const SplitBillForm = function ({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("");

  const paidByFriend = bill ? bill - paidByUser : "";
  console.log(selectedFriend.name);

  const handleSubmit = function (e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  };

  return (
    <>
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Split Bill with {selectedFriend.name}</h2>
        <label>Bill value</label>
        <input
          type="text"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />
        <label>Your expense</label>
        <input
          type="text"
          value={paidByUser}
          onChange={(e) =>
            setPaidByUser(
              Number(e.target.value) > bill
                ? paidByUser
                : Number(e.target.value),
            )
          }
        />
        <label>{selectedFriend.name}'s expense</label>
        <input type="text" disabled value={paidByFriend} />
        <label>Who is paying</label>
        <select
          value={whoIsPaying}
          onChange={(e) => {
            console.log(e.target.value);
            setWhoIsPaying(e.target.value);
          }}
        >
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
        <button className="button">Split Bill</button>
      </form>
    </>
  );
};

export default App;
