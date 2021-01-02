import React, { useState } from "react";

function Name() {
  const [name, change] = useState({ name: "adi", age: 19 });

  return (
    <div>
      <h1>
        I'm {name.name} and i'm {name.age} years old.
      </h1>
      <input
        text="Name"
        onChange={(e) => change({ ...name, name: e.target.value })}
      ></input>
      <input
        text="Age"
        onChange={(e) => change({ ...name, age: e.target.value })}
      ></input>
    </div>
  );
}

export default Name;
