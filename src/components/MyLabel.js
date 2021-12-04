export default function MyLabel(props) {

    const inputClick = () => {
        props.selectFilter(props.value)
    }

    return (
        <label>
            <input checked={props.checkedFilter === props.value}
                   name={'selected_filter'}
                   type="radio"
                   value={props.value}
                   onChange={inputClick}/>
            {props.value}
        </label>
    )
}