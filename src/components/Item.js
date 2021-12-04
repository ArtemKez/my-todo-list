export default function Item(props) {
    const startItem = () => {
        props.startItem(props.item.id)
    }

    const doneItem = () => {
        props.doneItem(props.item.id)
    }

    return (
        <li className={`${props.getItemClassName(props.item)}`}
            key={props.item.id}>{props.item.text}
            <div className="btns">
                <button onClick={startItem}>Start</button>
                <button onClick={doneItem}>Done</button>
            </div>
        </li>
    )

}