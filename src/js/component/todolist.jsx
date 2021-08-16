import React, { useState, useEffect } from "react";

const ToDo = () => {
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

				setToDo(songsJson);
			})

			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}, []);

	// Creacion de la caja en HTML, tiene iconos importados de Boostrap

	const boxToDo = (element, index) => {
		return (
			<li id={index} key={index.toString()} className="box ">
				{element.label}
				<button
					className="delete"
					onClick={() => {
						deleteToDo(index);
					}}>
					<i className="fa fa-trash" aria-hidden="true"></i>
				</button>
			</li>
		);
	};

	//Borrado de string, del servidor y de nuestra web

	const deleteToDo = anotherIndex => {
		if (toDo.length > 1) {
			setToDo(toDo.filter((_, index) => index != anotherIndex));
		} else {
			setToDoMap([]);
			setToDo([]);
		}
	};

	// Guardado de informacion, cuando el usuario pulsa enter, siempre y cuando no sobrepase 7 elementos y no sea vacio.

	const saveUserInput = caughtValue => {
		if (toDo.length < 7) {
			if (caughtValue.key == "Enter") {
				if (caughtValue.target.value != "") {
					setToDo([
						...toDo,
						{ label: caughtValue.target.value, done: false }
					]);
				}
				caughtValue.target.value = "";
			}
		}
	};

	// Revision de elementos ingresados y pintado en la web
	useEffect(() => {
		if (toDo.length < 20) {
			setToDoMap(
				toDo.map((inside, ind) => {
					return boxToDo(inside, ind);
				})
			);
		}
	}, [toDo]);

	//Metodo put
	useEffect(() => {
		fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(toDo)
		})
			.then(response => response.json())
			.then(data => {
				console.log("Success:", data);
			})
			.catch(error => {
				console.error("Error:", error);
			});
	}, [toDo]);

	return (
		<div className="global-box">
			<div className="header-box">
				<h1>Task Manager</h1>
				<input
					type="text"
					placeholder="Inserta aqui un quehacer"
					onKeyPress={event => {
						saveUserInput(event);
					}}
				/>
			</div>
			<ul className="result-box">{toDoMap}</ul>
		</div>
	);
};

export default ToDo;
