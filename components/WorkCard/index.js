import React, { useRef } from "react";

const WorkCard = ({ img, name, description, onClick }) => {
    const cardRef = useRef(null);

    const handleClick = () => {
        if (cardRef.current && onClick) {
            const rect = cardRef.current.getBoundingClientRect();
            onClick(rect);
        }
    };

    return (
        <div
            ref={cardRef}
            className="overflow-hidden cursor-pointer rounded-lg p-2 laptop:p-4 first:ml-0 group"
            onClick={handleClick}
            role="button"
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick();
                }
            }}
            tabIndex={0}
            aria-label={`View details for ${name}`}
        >
            <div
                className="overflow-hidden rounded-lg transition-all ease-out duration-300 group-hover:scale-95 h-48 mob:h-auto relative"
                style={{ height: "600px" }}
            >
                <img
                    alt={name}
                    className="h-full w-full object-cover"
                    src={img}
                ></img>
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            </div>
            <h1 className="mt-5 text-3xl font-medium">
                {name ? name : "Project Name"}
            </h1>
            <h2 className="text-xl opacity-50">
                {description ? description : "Description"}
            </h2>
        </div>
    );
};

export default WorkCard;
