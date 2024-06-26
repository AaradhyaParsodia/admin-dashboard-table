export default function Caret({ direction }) {
    return <svg className={"w-3 h-3 ms-1.5 " + direction} viewBox="0 0 256 256" id="Flat" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.2">
            <polygon points="48 160 128 80 208 160 48 160" />
        </g>
        <path d="M208,168H48a7.99981,7.99981,0,0,1-5.65674-13.65674l80-80a8,8,0,0,1,11.31348,0l80,80A7.99981,7.99981,0,0,1,208,168ZM67.314,152H188.686L128,91.314Z" />
    </svg>
}