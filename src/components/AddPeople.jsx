import { useEffect, useState } from "react";

export default function AddPeople() {
  // restore the pepole state from local storage if it exists
  const [people, setPeople] = useState(
    JSON.parse(localStorage.getItem("people")) || []
  );

  // save the people state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const name = e.target.elements.name.value;
          if (!name) return;
          setPeople([...people, name]);
          e.target.reset();
        }}
      >
        <input
          className="border-2 border-gray-800"
          type="text"
          name="name"
          placeholder="Name"
        />
        <button className="" type="submit">
          Add
        </button>
      </form>

      <ol className="custom-ol">
        {people.map((person, index) => (
          <li key={index}>{person}</li>
        ))}
      </ol>
    </div>
  );
}
