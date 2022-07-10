import React from "react";
import evaluate from "./evaluate";
import "./App.css";
import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";

const ops = ["+", "/", "*"];
const nums = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const initState = {
	expression: "0",
	currNum: "0",
	decimal: false,
};

class Calculator extends React.Component {
	constructor(props) {
		super(props);
		this.state = initState;
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		const input = e.target.value;
		const exp = this.state.expression;
		const currNum = this.state.currNum;
		const last = exp[exp.length - 1];

		if (input == "CLR") {
			this.setState(initState);
			return;
		}

		if (currNum === "0") {
			if (ops.includes(input)) {
				if ([...ops, "-"].includes(last)) {
					this.setState((state) => ({
						expression: state.expression.slice(0, -1) + input,
						currNum: "0",
						decimal: false,
					}));
				}
				return;
			} else if (input == "0") {
				return;
			} else if (input == ".")
				this.setState((state) => ({
					expression:
						state.expression == "0"
							? "0."
							: state.expression + "0.",
					currNum: "0.",
					decimal: true,
				}));
			else
				this.setState((state) => ({
					expression:
						state.expression == "0"
							? input
							: state.expression + input,
					currNum: input,
					decimal: false,
				}));
		} else {
			if ([...ops, "-"].includes(input)) {
				let prelast =
					this.state.expression[this.state.expression.length - 2];
				if (
					[...ops, "-"].includes(last) &&
					[...ops, "-"].includes(prelast)
				)
					this.setState((state) => ({
						expression: state.expression.slice(0, -2) + input,
						currNum: "0",
						decimal: false,
					}));
				else if ([...ops, "-"].includes(last))
					this.setState((state) => ({
						expression: state.expression.slice(0, -1) + input,
						currNum: "0",
						decimal: false,
					}));
				else
					this.setState((state) => ({
						expression: state.expression + input,
						currNum: "0",
						decimal: false,
					}));
			} else if (input === "-")
				this.setState((state) => ({
					expression: state.expression + input,
					currNum: "0",
					decimal: false,
				}));
			else if (input == "." && this.state.decimal) return;
			else if (input == "." && !this.state.decimal)
				this.setState((state) => ({
					expression: state.expression + input,
					currNum: state.currNum + input,
					decimal: true,
				}));
			else
				this.setState((state) => ({
					expression: state.expression + input,
					currNum: state.currNum + input,
					decimal: state.decimal,
				}));
		}

		if (input == "=") {
			let result = eval(this.state.expression) + "";

			this.setState({
				expression: result,
				currNum: result,
				decimal: result.indexOf(".") == -1 ? false : true,
			});
			return;
		}
	}

	render() {
		return (
			<div className="calculator">
				{/* Display */}
				<div id={"display"}>
					<p>{this.state.expression}</p>
				</div>
				<div className="number-pad">
					<button
						className="button wide"
						onClick={this.handleClick}
						value={"CLR"}
						id="clear"
					>
						CLR
					</button>
					<button
						className="button op"
						onClick={this.handleClick}
						value={"*"}
						id="multiply"
					>
						×
					</button>
					<button
						className="button  op"
						onClick={this.handleClick}
						value={"/"}
						id="divide"
					>
						÷
					</button>
					<button
						className="button"
						onClick={this.handleClick}
						value={"7"}
						id="seven"
					>
						7
					</button>
					<button
						className="button"
						onClick={this.handleClick}
						value={"8"}
						id="eight"
					>
						8
					</button>
					<button
						className="button"
						onClick={this.handleClick}
						value={"9"}
						id="nine"
					>
						9
					</button>
					<button
						className="button op"
						onClick={this.handleClick}
						value={"+"}
						id="add"
					>
						+
					</button>
					<button
						className="button"
						onClick={this.handleClick}
						value={"4"}
						id="four"
					>
						4
					</button>
					<button
						className="button"
						onClick={this.handleClick}
						value={"5"}
						id="five"
					>
						5
					</button>
					<button
						className="button"
						onClick={this.handleClick}
						value={"6"}
						id="six"
					>
						6
					</button>
					<button
						className="button op"
						onClick={this.handleClick}
						value={"-"}
						id="subtract"
					>
						-
					</button>
					<button
						className="button"
						onClick={this.handleClick}
						value={"1"}
						id="one"
					>
						1
					</button>
					<button
						className="button"
						onClick={this.handleClick}
						value={"2"}
						id="two"
					>
						2
					</button>
					<button
						className="button"
						onClick={this.handleClick}
						value={"3"}
						id="three"
					>
						3
					</button>
					<button
						className="button tall op"
						onClick={this.handleClick}
						value={"="}
						id="equals"
					>
						=
					</button>
					<button
						className="button wide"
						onClick={this.handleClick}
						value={"0"}
						id="zero"
					>
						0
					</button>
					<button
						className="button"
						onClick={this.handleClick}
						value={"."}
						id="decimal"
					>
						.
					</button>
				</div>
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Calculator />
			</div>
		);
	}
}

export default App;
