import React, { useState, useEffect } from "react";

const ToDo = () => {
	const [saveJson, setSaveJson] = useState({});
	const [toDo, setToDo] = useState([]);
	const [toDoMap, setToDoMap] = useState([]);

	const url = "https://assets.breatheco.de/apis/fake/todos/user/JorgeGD";

	//Metodo de obtencion, hay que buscarg json. stringify

	useEffect(() => {
		fetch(url, { method: "GET" })
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				// Read the response as json.
				return response.json();
			})
			.then(songsJson => {
				// Do stuff with the JSON

				setSaveJson(songsJson);
			})

			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	useEffect(() => {
		console.log(saveJson[0]);
		if (toDo.length < 10) {
			setToDoMap(
				toDo.map((inside, ind) => {
					return (
						<li id={ind} key={ind.toString()} className="box">
							{inside}
							<button
								onClick={() => {
									toDoDel(ind);
									console.log("intento cerrarrrrr");
								}}>
								X
							</button>
						</li>
					);
				})
			);
		}
	}, [toDo]);

	const toDoDel = e => {
		if (toDo.length > 1) {
			setToDo(toDo.filter((x, z) => z != e));
		} else {
			setToDoMap([]);
			setToDo([]);
		}
	};

	const clearValue = e => {
		if (e.key == "Enter") {
			if (e.target.value != "") {
				setToDo([...toDo, e.target.value]);
			}
			e.target.value = "";
		}
	};
	return (
		<div className="GlobalBox">
			<h1>Trash Manager</h1>
			<div className="InputBox">
				<input
					type="text"
					placeholder="Añade nuevo quehacer"
					onKeyPress={event => {
						clearValue(event);
					}}
				/>
			</div>
			<ul className="ResultBox">{toDoMap}</ul>
		</div>
	);
};

export default ToDo;
