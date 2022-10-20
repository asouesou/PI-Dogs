import React from "react";
import "./pagination.css";

const Pagination = ({ dogsPerPage, countDogs, paginate }) => {
	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(countDogs / dogsPerPage); i++) {
		pageNumbers.push(i);
	}
	console.log(dogsPerPage, dogsPerPage, countDogs);

	return (
		<div className="Pagination">
			{pageNumbers.map((e) => (
				<p key={e} className="pagNum">
					<button
						onClick={() => paginate(e)}
						className="pageLink"
					>
						{e}
					</button>
				</p>
			))}
		</div>
	);
};

export default Pagination;
