import React from "react";

function Card(props) {
    const { name, price, description, id } = props.product;
    const {cardDel} = props
    return (
        <div className="w-1/4 mx-auto">
            <div className=" p-5 rounded-lg bg-white text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>
                <h3 className="text-lg text-gray-600 mb-4">${price}</h3>
                <p className="text-sm text-green-700">{description}</p>
                <button onClick={() => (cardDel(id))} className="mt-5 btn btn-outline btn-error">DELETE</button>
            </div>
        </div>
    );
}

export default Card;
