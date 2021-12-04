import React, {Component} from "react";
import "./App.css"
import Item from "./components/Item";
import MyLabel from "./components/MyLabel";
import filters_lables from "./data/filters_lables";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            value: '',
            items: [],
            checkedFilter: 'all',
            labelArr: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.selectFilter = this.selectFilter.bind(this);
    }

    selectFilter(val) {
        this.setState({
            checkedFilter: val,
        })
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    componentDidMount() {
        this.getStateFromLocalStorage();
        this.setState({labelArr: filters_lables})
    }

    handleSubmit(event) {
        if (this.state.value === '') {
            event.preventDefault();
            return;
        }
        this.setState({
            items: [...this.state.items,
                {
                    id: this.state.items.length + 1,
                    text: this.state.value,
                    status: ''
                }
            ],
            value: ''
        })

        event.preventDefault();
    }

    getStateFromLocalStorage() {
        const state_string = localStorage.getItem('state');
        try {
            if (state_string) {
                const state = JSON.parse(state_string);
                this.setState(state)
            }
        } catch (e) {
            console.log(e);
        }
    }

    isExistsStartedTask() {
        return this.state.items.some((el) => el.status === 'start')
    }

    saveStateToLocalStorage() {
        localStorage.setItem('state', JSON.stringify(this.state))
    }

    getItemClassName(item) {
        return item.status
    }

    startItem = async (id) => {
        if (!this.isExistsStartedTask()) {
            const items = this.state.items.map((obj) => {
                if (obj.id === id && obj.status === '') {
                    obj.status = 'start'
                }
                return obj
            })
            await this.setState({
                items: items
            })
        }
    }

    doneItem = async (id) => {
        if (this.state.items.some((el) => el.id === id && el.status === 'start')) {
            const items = this.state.items.map((obj) => {
                if (obj.id === id) {
                    obj.status = 'done'
                }
                return obj
            })
            await this.setState({
                items: items
            })
        }
    }

    deleteOll = () => {
        delete localStorage.state
        this.setState({
            items: []
        })
    }

    filteredItems() {
        if (this.state.checkedFilter === 'all') {
            return this.state.items;
        } else if (this.state.checkedFilter === 'new') {
            return this.state.items.filter((el) => el.status === '');
        } else if (this.state.checkedFilter === 'started') {
            return this.state.items.filter((el) => el.status === 'start');
        } else if (this.state.checkedFilter === 'done') {
            return this.state.items.filter((el) => el.status === 'done');
        }
    }

    async setState(state, callback) {
        await super.setState(state, callback);
        this.saveStateToLocalStorage();
    }

    render() {
        return (
            <>
                <div className="select_filter">
                    {this.state.labelArr.map((el) => {
                        return (
                            <MyLabel key={el.value}
                                     selectFilter={this.selectFilter}
                                     value={el.value}
                                     checkedFilter={this.state.checkedFilter}/>
                        )
                    })}
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    <button type="submit">Add new item</button>
                </form>
                <ol>
                    {this.filteredItems().map((item) => {
                        return (<Item getItemClassName={this.getItemClassName} key={item.id} item={item}
                                      startItem={this.startItem} doneItem={this.doneItem}/>)
                    })}
                </ol>
                <button onClick={this.deleteOll} className={'delete'}>удалить всё нахрен!!!</button>
                <div className={'lastChanceToReturnAsItWas disNone'}>
                    <div className={'blackBlock'}>
                        вы уверены что хотите удалить всё нахрен ? это действие нельзя будет отменить
                        <div className={'buttons'}>
                            <button>нет</button>
                            <button>да</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default App;