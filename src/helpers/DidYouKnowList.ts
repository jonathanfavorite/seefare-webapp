interface DYK {
    title: string;
    keyword: string;
    text: string;
}
const list : DYK[] = [
    {
        title: "Do you know what a Knot is?",
        keyword: "Knot",
        text: "One knot is a speed of one nautical mile per hour or 1.852km/hr."
    },
    {
        title: "Do you know what a Beam is?",
        keyword: "Beam",
        text: "A beam is the widest part of the boat."
    },
    {
        title: "What does Starboard Side mean?",
        keyword: "Starboard Side",
        text: "The right hand side of the vessel when you are looking forward from the stern and the side on which a green navigation side light is displayed."
    },
    {
        title: "What does Port Side mean?",
        keyword: "Port Side",
        text: "The left hand side of the vessel when you are looking forward from the stern and the side on which a green navigation side light is displayed."
    },
    {
        title: "What does Windward mean?",
        keyword: "Windward",
        text: "The direction from which the wind blows."
    }
];

function GetRandomDidKnow() {
    return list[Math.floor(Math.random() * list.length)];
}

export {GetRandomDidKnow, type DYK}